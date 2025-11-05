import React, { useEffect } from "react";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEO from "./SEO";
import { trackGoogleAdsConversion } from "../utils/googleAnalytics";
import { trackPageView as trackGAPageView } from "../utils/googleAnalytics";

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Track page view
        trackGAPageView("Survey Success - Partners Hub Indonesia", "/success");

        // Track Google Ads conversion
        // Replace 'AW-CONVERSION_ID/AW-CONVERSION_LABEL' with your actual Google Ads conversion ID and label
        // Example: 'AW-123456789/AbCdEfGhIjKlMnOpQrStUvWxYz'
        // You can get this from Google Ads > Tools & Settings > Conversions
        const conversionLabel = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL || 'AW-CONVERSION_ID/AW-CONVERSION_LABEL';
        
        if (conversionLabel && conversionLabel !== 'AW-CONVERSION_ID/AW-CONVERSION_LABEL') {
            // Track conversion with optional value
            // You can pass a value if you have conversion value tracking enabled
            trackGoogleAdsConversion(conversionLabel);
        }

        // Redirect to home if accessed directly without form submission
        // You can remove this if you want to allow direct access
        const referrer = document.referrer;
        if (!referrer.includes('/survey') && !referrer.includes('/event')) {
            // Uncomment below if you want to redirect unauthorized access
            // setTimeout(() => navigate('/'), 3000);
        }
    }, []);

    // Get form data from location state if available
    const formData = location.state?.formData || {};

    return (
        <>
            <SEO
                title="Thank You - Survey Submitted Successfully | Partners Hub Indonesia"
                description="Thank you for submitting the survey! We've received your information and will get back to you soon. Stay tuned for updates about our services and events."
                keywords="survey submitted, thank you, partners hub indonesia, survey success"
                image="/images/thumbnailphi.png"
            />
            <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 flex items-center">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Success Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                            <div className="relative bg-green-500 rounded-full p-6">
                                <CheckCircle className="w-16 h-16 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Thank You!
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">
                        Your survey has been submitted successfully
                    </p>
                    <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
                        We've received your information and our team will get in touch with you soon. 
                        We appreciate your time and interest in Partners Hub Indonesia.
                    </p>

                    {/* Additional Information */}
                    <div className="bg-blue-50 rounded-2xl p-8 mb-12 text-left">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            What's Next?
                        </h2>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Our team will review your submission and contact you within 24-48 hours</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>We'll send you updates about our services, events, and business solutions</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>You can reach us directly via WhatsApp at +62 878-7379-5212</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Back to Home
                        </Link>
                        <a
                            href="https://wa.me/+6287873795212"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Contact Us on WhatsApp
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                    </div>

                    {/* Additional Resources */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500 mb-4">
                            You might also be interested in:
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/ourservices"
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                                Our Services
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link
                                to="/about"
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                                About Us
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link
                                to="/contact"
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Success;

