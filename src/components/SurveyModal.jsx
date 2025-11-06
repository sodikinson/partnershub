import React, { useState } from "react";
import { X, Send, Mail, Phone, Building2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackSurveyComplete } from "../utils/metaPixel";
import { trackSurveyInteraction } from "../utils/googleAnalytics";

const SurveyModal = ({ isOpen, onClose, onModalClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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

            const payload = {
                timestamp: new Date().toISOString(),
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
                notes: formData.notes,
                company: formData.company,
                phone: formData.phone,
            };

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
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }

            trackSurveyComplete();
            trackSurveyInteraction('complete', { source: 'survey_modal' });

            setStatus({ loading: false, success: true, error: null });
            
            // Redirect to success page
            navigate('/success', {
                state: {
                    formData: {
                        industry: formData.industry,
                        legalEntity: formData.legalEntity,
                        focus: formData.focus,
                        interest: formData.interest
                    }
                }
            });
        } catch (err) {
            setStatus({ loading: false, success: false, error: err.message || "Unknown error" });
        }
    };

    const handleClose = () => {
        onClose();
        onModalClose(); // Notify parent that modal was closed
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
                // Close modal when clicking on backdrop
                if (e.target === e.currentTarget) {
                    handleClose();
                }
            }}
        >
            <div 
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Modal Content */}
                <div className="p-6 sm:p-8">
                    {/* Banner */}
                    <div className="mb-6">
                        <img
                            src={import.meta.env.VITE_SURVEY_BANNER_URL || "/images/seminar-banner.jpg"}
                            alt="PHI x TOMAZZ Seminar Banner"
                            loading="lazy"
                            className="w-full h-auto rounded-xl shadow-lg object-cover"
                        />
                    </div>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                            Business Expansion & Investment Survey
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base">
                            Fill out this short survey (less than 2 minutes), and our team will help guide you.
                        </p>
                    </div>

                    {/* Error Message */}
                    {status.error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            Submission failed: {status.error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <User className="w-4 h-4 mr-2 text-blue-600" /> Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                                placeholder="Your full name"
                                required
                            />
                        </div>

                        {/* Business Name & Industry */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Building2 className="w-4 h-4 mr-2 text-blue-600" /> Business Name
                                </label>
                                <input
                                    type="text"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                                    placeholder="Your business name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Industry
                                </label>
                                <input
                                    type="text"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                                    placeholder="Your industry"
                                />
                            </div>
                        </div>

                        {/* Legal Entity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Is your business currently a legal entity? *
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <label className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
                                    <input
                                        type="radio"
                                        name="legalEntity"
                                        value="yes"
                                        checked={formData.legalEntity === "yes"}
                                        onChange={handleChange}
                                        className="mr-2"
                                        required
                                    />
                                    Yes (PT/CV)
                                </label>
                                <label className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
                                    <input
                                        type="radio"
                                        name="legalEntity"
                                        value="no"
                                        checked={formData.legalEntity === "no"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        {/* Main Focus */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                What's your main focus in the next 6 months? *
                            </label>
                            <div className="space-y-2">
                                {[
                                    "Finding investor for expansion",
                                    "Increasing business valuation",
                                    "Establishing financial and tax compliance systems",
                                    "Expansion to a new branch",
                                    "Others",
                                ].map((option) => (
                                    <label key={option} className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
                                        <input
                                            type="radio"
                                            name="focus"
                                            value={option}
                                            checked={formData.focus === option}
                                            onChange={handleChange}
                                            className="mr-2"
                                            required
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                            {formData.focus === "Others" && (
                                <input
                                    type="text"
                                    name="focusOther"
                                    value={formData.focusOther}
                                    onChange={handleChange}
                                    className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                                    placeholder="Please specify"
                                />
                            )}
                        </div>

                        {/* Interest */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Are you interested in learning how to prepare your business for investment or expansion? *
                            </label>
                            <div className="space-y-2">
                                {[
                                    { label: "Yes, very interested", value: "yes" },
                                    { label: "Perhaps, I want to know more first.", value: "perhaps" },
                                    { label: "Not yet", value: "not-yet" },
                                ].map((opt) => (
                                    <label key={opt.value} className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
                                        <input
                                            type="radio"
                                            name="interest"
                                            value={opt.value}
                                            checked={formData.interest === opt.value}
                                            onChange={handleChange}
                                            className="mr-2"
                                            required
                                        />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Seminar Interest (conditional) */}
                        {["yes", "perhaps"].includes(formData.interest) && (
                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                                <div className="space-y-2 text-xs text-gray-700 mb-3">
                                    <p>We will hold an exclusive PHI x TOMAZZ seminar discussing how to make your business investment & expansion ready.</p>
                                    <p>Through this seminar, you can get:</p>
                                    <ul className="list-disc ml-4 space-y-1">
                                        <li>Register your business on the TOMAZZ platform (worth IDR 14 million, but by joining this seminar, you only pay IDR 1.5 million).</li>
                                        <li>Gain exclusive insider insights on what makes a business eligible and attractive for investment or expansion.</li>
                                        <li>Join PHI's Accounting and Tax Workshop to strengthen your compliance and business structure.</li>
                                        <li>Enjoy free lunch and coffee break during the event.</li>
                                    </ul>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Are you interested in joining?
                                    </label>
                                    <div className="space-y-2">
                                        {[
                                            { label: "Yes, I want to join.", value: "join" },
                                            { label: "I want to get more information first.", value: "more-info" },
                                            { label: "Not interested yet", value: "not-interested" },
                                        ].map((opt) => (
                                            <label key={opt.value} className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-white bg-white text-sm">
                                                <input
                                                    type="radio"
                                                    name="seminarInterest"
                                                    value={opt.value}
                                                    checked={formData.seminarInterest === opt.value}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                {opt.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-blue-600" /> WhatsApp *
                                </label>
                                <input
                                    type="tel"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                                    placeholder="+62xxxxxxxxxxx"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-blue-600" /> Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Contact Permission */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Would you like our team to contact you for further information or to register for the event? *
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <label className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
                                    <input
                                        type="radio"
                                        name="contactPermission"
                                        value="yes"
                                        checked={formData.contactPermission === "yes"}
                                        onChange={handleChange}
                                        className="mr-2"
                                        required
                                    />
                                    Yes, you may.
                                </label>
                                <label className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
                                    <input
                                        type="radio"
                                        name="contactPermission"
                                        value="no"
                                        checked={formData.contactPermission === "no"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Not at this time
                                </label>
                            </div>
                        </div>

                        {/* Optional: Company & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Building2 className="w-4 h-4 mr-2 text-blue-600" /> Company / Organization (optional)
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
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
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                                    placeholder="+62 812-3456-7890"
                                />
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Notes (Optional)
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm resize-none"
                                placeholder="Any additional information..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={status.loading}
                                className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                {status.loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Submit Survey
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SurveyModal;

