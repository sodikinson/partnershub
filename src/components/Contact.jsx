import React from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { trackContactFormSubmit } from "../utils/metaPixel";
import { trackFormSubmission } from "../utils/googleAnalytics";
import GoogleMap from "./GoogleMap";

const Contact = () => {
    return (
        <section
            id="#contact"
            className="py-24 bg-gradient-to-b from-gray-50 to-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Let's Start a{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Conversation
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Have a question or want to work together? We'd love to
                        hear from you. Here's how you can reach us.
                    </p>
                </div>

                {/* Contact Form dan Location Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form dengan spacing yang disesuaikan */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col h-auto md:min-h-[600px] lg:min-h-[700px]">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            Send us a message
                        </h3>
                        <form
                            method="POST"
                            action="https://formspree.io/f/xyzpgvlw" // Replace with your Formspree form ID
                            onSubmit={() => {
                                trackContactFormSubmit();
                                trackFormSubmission('contact_form');
                            }}
                            className="flex flex-col flex-grow justify-between"
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="10"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                                        placeholder="Tell us about your project..."
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                                >
                                    Send Message
                                    <Send className="w-5 h-5 ml-2" />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Location Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col h-auto md:min-h-[600px] lg:min-h-[700px]">
                        <div className="flex-grow">
                            <div className="w-full bg-gray-100 rounded-lg mb-6 aspect-[4/3] sm:aspect-video">
                                {/* Google Maps Embed */}
                                <GoogleMap 
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15865.059707156338!2d106.8208973!3d-6.2297466!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14c27f17ea9%3A0x1234567890abcdef!2sTreasury%20Tower!5e0!3m2!1sen!2sid!4v1635000000000!5m2!1sen!2sid"
                                    title="PT. KOLEGA BISNIS INDONESIA - Treasury Tower Location"
                                    className="shadow-sm"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Our Location
                            </h3>
                            <p className="text-gray-600">
                                PT.KOLEGA BISNIS INDONESIA <br />
                                Treasury Tower LT 16 Unit I, District 8 SCBD Lot
                                28, <br />
                                Jl. Jend. Sudirman Kav 52-53, Senayan, Kebayoran
                                Baru, <br />
                                Jakarta Selatan. DKI Jakarta 12190 <br />
                                Telp : 021-50300844 - WA : +62 878-7379-5212
                            </p>
                        </div>

                        {/* Business Hours Section */}
                        <div className="border-t pt-6 mt-8">
                            <div className="flex items-center mb-6">
                                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                                <h4 className="text-xl font-bold text-gray-900">
                                    Business Hours
                                </h4>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Monday - Friday
                                    </span>
                                    <span className="font-medium">
                                        9:00 AM - 6:00 PM
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Saturday
                                    </span>
                                    <span className="text-blue-600 font-medium">
                                        Closed
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Sunday
                                    </span>
                                    <span className="text-blue-600 font-medium">
                                        Closed
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
