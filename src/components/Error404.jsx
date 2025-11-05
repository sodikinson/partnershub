import React, { useEffect } from "react";
import { Home, ArrowLeft, Search, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEO from "./SEO";
import { trackPageView as trackGAPageView } from "../utils/googleAnalytics";

const Error404 = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Track 404 page view
        trackGAPageView("404 - Page Not Found | Partners Hub Indonesia", location.pathname);

        // Track 404 error event
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            try {
                window.gtag('event', 'page_view', {
                    page_title: '404 - Page Not Found',
                    page_location: window.location.href,
                    page_path: location.pathname
                });
            } catch (error) {
                console.error('Error tracking 404:', error);
            }
        }
    }, [location.pathname]);

    const popularLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Our Services", path: "/ourservices" },
        { name: "Contact", path: "/contact" },
        { name: "Team", path: "/team" },
        { name: "Portfolio", path: "/portfolio" },
    ];

    return (
        <>
            <SEO
                title="404 - Page Not Found | Partners Hub Indonesia"
                description="The page you're looking for doesn't exist. Return to our homepage or explore our services to find what you need."
                keywords="404, page not found, error page, partners hub indonesia"
                image="/images/thumbnailphi.png"
                noindex={true}
            />
            <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 flex items-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* 404 Number with Animation */}
                    <div className="mb-8">
                        <h1 className="text-9xl md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
                            404
                        </h1>
                    </div>

                    {/* Error Message */}
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Oops! Page Not Found
                        </h2>
                        <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                        <p className="text-lg text-gray-500 max-w-xl mx-auto">
                            Don't worry, let's get you back on track. You can return to our homepage or explore our services below.
                        </p>
                    </div>

                    {/* Path Info */}
                    <div className="bg-gray-100 rounded-lg p-4 mb-12 text-left max-w-md mx-auto">
                        <p className="text-sm text-gray-600 mb-1">Requested URL:</p>
                        <code className="text-sm font-mono text-gray-800 break-all">
                            {location.pathname}
                        </code>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center justify-center px-8 py-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Go Back
                        </button>
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
                            <Mail className="w-5 h-5 mr-2" />
                            Contact Us
                        </a>
                    </div>

                    {/* Popular Links */}
                    <div className="bg-blue-50 rounded-2xl p-8 mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Popular Pages
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {popularLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="block p-4 bg-white rounded-lg hover:bg-blue-100 transition-colors text-gray-700 hover:text-blue-700 font-medium shadow-sm hover:shadow-md"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Search Suggestion */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                        <div className="flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-blue-600 mr-3" />
                            <h3 className="text-xl font-bold text-gray-900">
                                Looking for Something Specific?
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Try exploring our services or contact us directly for assistance.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/ourservices"
                                className="text-blue-600 hover:text-blue-700 font-semibold underline"
                            >
                                Browse Services
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link
                                to="/about"
                                className="text-blue-600 hover:text-blue-700 font-semibold underline"
                            >
                                Learn About Us
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link
                                to="/contact"
                                className="text-blue-600 hover:text-blue-700 font-semibold underline"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Error404;

