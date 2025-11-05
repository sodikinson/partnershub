import React from "react";
import { Send, Mail, Phone, Building2 } from "lucide-react";
import SEO from "./SEO";
import { generateEventSchema } from "../utils/structuredData";

const Event = () => {
    return (
        <>
            <SEO
                title="Events - Partners Hub Indonesia"
                description="PHI x TOMAZZ EVENT: 'Becoming Investment-Ready Business'. Register your interest for our event and we'll follow up with details. Join us for business seminars and networking opportunities in Indonesia."
                keywords="PHI event, TOMAZZ event, business seminar indonesia, investment-ready business, business networking jakarta, partners hub events"
                image="/images/thumbnailphi.png"
                structuredData={generateEventSchema()}
            />
            <section id="#event" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                        PHI x TOMAZZ EVENT : “Becoming Investment-Ready Business,”
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Register your interest for our event and we’ll follow up with details.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Event Registration</h2>
                    <form
                        method="POST"
                        action="https://formspree.io/f/xyzpgvlw"
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-blue-600" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-blue-600" /> Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    placeholder="+62 812-3456-7890"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Building2 className="w-4 h-4 mr-2 text-blue-600" /> Company / Organization
                            </label>
                            <input
                                type="text"
                                name="company"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                placeholder="Your Company Name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Questions or Notes</label>
                            <textarea
                                name="message"
                                rows="6"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                placeholder="Optional: Add any questions or context"
                            ></textarea>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
                                Submit Registration
                                <Send className="w-5 h-5 ml-2" />
                            </button>
                            <p className="text-xs text-gray-500 mt-3 text-center">
                                By submitting, you consent to be contacted about event details.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    );
};

export default Event;