import React, { useState } from "react";
import { Send, Mail, Phone, Building2, User } from "lucide-react";

const Survey = () => {
    const [formData, setFormData] = useState({
        // 1. Name
        name: "",
        // 2. Business Name
        businessName: "",
        // 3. Business Field / Industry
        industry: "",
        // 4. Legal entity (Yes/No)
        legalEntity: "",
        // 5. Main focus next 6 months
        focus: "",
        focusOther: "",
        // 6. Interest in learning prep
        interest: "",
        // 7. Conditional: seminar interest (only if interest is yes/perhaps)
        seminarInterest: "",
        // 8. WhatsApp contact
        whatsapp: "",
        // 9. Email Address
        email: "",
        // 10. Permission to contact
        contactPermission: "",
        // Optional notes
        notes: "",
        // Company/Organization (from earlier scaffold)
        company: "",
        phone: "",
    });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            const endpoint = import.meta.env.DEV
                ? "/survey-proxy"
                : import.meta.env.VITE_SURVEY_SCRIPT_URL;
            if (!endpoint) {
                throw new Error("Missing survey endpoint (VITE_SURVEY_SCRIPT_URL in production)");
            }

            // Build payload and send as FormData to avoid JSON preflight/CORS issues
            const payload = {
                timestamp: new Date().toISOString(),
                // core fields
                name: formData.name,
                businessName: formData.businessName,
                industry: formData.industry,
                legalEntity: formData.legalEntity,
                focus: formData.focus,
                focusOther: formData.focus === "Others" ? formData.focusOther : "",
                interest: formData.interest,
                seminarInterest: ["yes", "perhaps"].includes(formData.interest)
                    ? formData.seminarInterest
                    : "",
                whatsapp: formData.whatsapp,
                email: formData.email,
                contactPermission: formData.contactPermission,
                // optional
                notes: formData.notes,
                company: formData.company,
                phone: formData.phone,
            };

            // Send as application/x-www-form-urlencoded to improve compatibility with Apps Script
            const params = new URLSearchParams();
            Object.entries(payload).forEach(([key, value]) => {
                params.append(key, value ?? "");
            });

            const res = await fetch(endpoint, {
                method: "POST",
                body: params,
                redirect: "follow",
            });

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`Submission failed: HTTP ${res.status}${text ? ` - ${text.substring(0, 200)}` : ""}`);
            }

            // Try to read JSON response only when server indicates JSON
            let payloadResp = null;
            const ct = res.headers.get("content-type") || "";
            if (ct.includes("application/json")) {
                payloadResp = await res.json().catch(() => null);
            }
            if (payloadResp && payloadResp.ok === false) {
                throw new Error(payloadResp.error || "Server reported failure");
            }

            setStatus({ loading: false, success: true, error: null });
            setFormData({
                name: "",
                businessName: "",
                industry: "",
                legalEntity: "",
                focus: "",
                focusOther: "",
                interest: "",
                seminarInterest: "",
                whatsapp: "",
                email: "",
                contactPermission: "",
                notes: "",
                company: "",
                phone: "",
            });
        } catch (err) {
            setStatus({ loading: false, success: false, error: err.message || "Unknown error" });
        }
    };

    return (
        <section id="#survey" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Business Expansion & Investment Survey
                    </h1>
                    <div className="text-gray-700 space-y-4 max-w-2xl mx-auto">
                        <p>
                            We want to better understand your business needs in terms of expansion or investment seeking.
                        </p>
                        <p>
                            Through the collaboration between Partners Hub Indonesia (PHI) and TOMAZZ, we are opening opportunities for businesses that want to grow, find the right investors, or are ready to expand their operations.
                        </p>
                        <p>
                            Fill out this short survey (less than 2 minutes), and our team will help guide you towards the best steps for you. Ill add the survey questions later.
                        </p>
                    </div>
                </div>

                {status.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                        Thank you! Your response has been recorded.
                    </div>
                )}
                {status.error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                        Submission failed: {status.error}
                    </div>
                )}

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Survey Form</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 1. Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <User className="w-4 h-4 mr-2 text-blue-600" /> Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                placeholder="Your full name"
                                required
                            />
                        </div>

                        {/* 2-3. Business Name & Industry */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                                <input
                                    type="text"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="e.g., PT Maju Jaya"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Business Field / Industry</label>
                                <input
                                    type="text"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="e.g., F&B, Retail, Manufacturing"
                                />
                            </div>
                        </div>

                        {/* 4. Legal Entity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Is your business currently a legal entity?</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        name="legalEntity"
                                        value="yes"
                                        checked={formData.legalEntity === "yes"}
                                        onChange={handleChange}
                                        className="mr-3"
                                    />
                                    Yes (PT/CV)
                                </label>
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        name="legalEntity"
                                        value="no"
                                        checked={formData.legalEntity === "no"}
                                        onChange={handleChange}
                                        className="mr-3"
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        {/* 5. Focus next 6 months */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">What’s your main focus in the next 6 months?</label>
                            <div className="space-y-3">
                                {[
                                    "Finding investor for expansion",
                                    "Increasing business valuation",
                                    "Establishing financial and tax compliance systems",
                                    "Expansion to a new branch",
                                    "Others",
                                ].map((option) => (
                                    <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer">
                                        <input
                                            type="radio"
                                            name="focus"
                                            value={option}
                                            checked={formData.focus === option}
                                            onChange={handleChange}
                                            className="mr-3"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                            {formData.focus === "Others" && (
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        name="focusOther"
                                        value={formData.focusOther}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                        placeholder="Please specify"
                                    />
                                </div>
                            )}
                        </div>

                        {/* 6. Interest in learning */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Are you interested in learning how to prepare your business for investment or expansion?</label>
                            <div className="space-y-3">
                                {[
                                    { label: "Yes, very interested", value: "yes" },
                                    { label: "Perhaps, I want to know more first.", value: "perhaps" },
                                    { label: "Not yet", value: "not-yet" },
                                ].map((opt) => (
                                    <label key={opt.value} className="flex items-center p-3 border rounded-lg cursor-pointer">
                                        <input
                                            type="radio"
                                            name="interest"
                                            value={opt.value}
                                            checked={formData.interest === opt.value}
                                            onChange={handleChange}
                                            className="mr-3"
                                        />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 7. Conditional seminar info and interest */}
                        {["yes", "perhaps"].includes(formData.interest) && (
                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                                <div className="space-y-3 text-sm text-gray-700 mb-4">
                                    <p>
                                        We will hold an exclusive PHI x TOMAZZ seminar discussing how to make your business investment & expansion ready.
                                    </p>
                                    <p>Through this seminar, you can get:</p>
                                    <ul className="list-disc ml-5 space-y-2">
                                        <li>
                                            Register your business on the TOMAZZ platform, a Marketplace that connects you directly with potential investors or buyers of your business (worth IDR 14 million, but by joining this seminar, you only pay IDR 1.5 million).
                                        </li>
                                        <li>Gain exclusive insider insights on what makes a business eligible and attractive for investment or expansion.</li>
                                        <li>Join PHI’s Accounting and Tax Workshop to strengthen your compliance and business structure.</li>
                                        <li>Enjoy free lunch and coffee break during the event.</li>
                                    </ul>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Are you interested in joining?</label>
                                    <div className="space-y-3">
                                        {[
                                            { label: "Yes, I want to join.", value: "join" },
                                            { label: "I want to get more information first.", value: "more-info" },
                                            { label: "Not interested yet", value: "not-interested" },
                                        ].map((opt) => (
                                            <label key={opt.value} className="flex items-center p-3 border rounded-lg cursor-pointer bg-white">
                                                <input
                                                    type="radio"
                                                    name="seminarInterest"
                                                    value={opt.value}
                                                    checked={formData.seminarInterest === opt.value}
                                                    onChange={handleChange}
                                                    className="mr-3"
                                                />
                                                {opt.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 8-9. WhatsApp & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your active WhatsApp contact</label>
                                <input
                                    type="tel"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="+62 812-3456-7890"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* 10. Permission to contact */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Would you like our team to contact you for further information or to register for the event?</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        name="contactPermission"
                                        value="yes"
                                        checked={formData.contactPermission === "yes"}
                                        onChange={handleChange}
                                        className="mr-3"
                                    />
                                    Yes, you may.
                                </label>
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        name="contactPermission"
                                        value="no"
                                        checked={formData.contactPermission === "no"}
                                        onChange={handleChange}
                                        className="mr-3"
                                    />
                                    Not at this time
                                </label>
                            </div>
                        </div>

                        {/* Optional: Company & Phone from earlier scaffold */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Building2 className="w-4 h-4 mr-2 text-blue-600" /> Company / Organization (optional)
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="Your Company Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-blue-600" /> Phone Number (optional)
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="+62 812-3456-7890"
                                />
                            </div>
                        </div>

                        {/* Optional notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                            <textarea
                                name="notes"
                                rows="4"
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                placeholder="Any context you’d like to add"
                            ></textarea>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={status.loading}
                                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors flex items-center justify-center"
                            >
                                {status.loading ? "Submitting..." : "Submit Survey"}
                                <Send className="w-5 h-5 ml-2" />
                            </button>
                            <p className="text-xs text-gray-500 mt-3 text-center">
                                Your responses will be securely sent to our Google Sheet.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Survey;