import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { X } from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import About from "./components/About";
import OurServices from "./components/OurService";
import Portfolio from "./components/Portfolio";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Event from "./components/Event";
import Survey from "./components/Survey";
import ServicePage from "./components/ServicePage";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import SEO from "./components/SEO";
import Hero from "./components/Hero";
import Services from "./components/Services";
import LegalService from "./components/LegalService";
import Stats from "./components/Stats";
import Customer from "./components/Customer";

// Utils
import { trackPageView, trackSurveyStart } from "./utils/metaPixel";
import { trackPageView as trackGAPageView, trackSurveyInteraction } from "./utils/googleAnalytics";
import { generateHomepageSchema } from "./utils/structuredData";

const App = () => {
    return (
        <HelmetProvider>
            <Router>
                <AppContent />
            </Router>
        </HelmetProvider>
    );
};

// Component to handle route tracking
const AppContent = () => {
    const location = useLocation();

    // Track page views on route changes
    useEffect(() => {
        // Small delay to ensure the page has loaded
        const timer = setTimeout(() => {
            trackPageView();
            // Also track with Google Analytics
            trackGAPageView(document.title, location.pathname);
        }, 100);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/ourservices" element={<OurServices />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/event" element={<Event />} />
                <Route path="/survey" element={<Survey />} />
                <Route
                    path="/service/:slug"
                    element={<ServicePage />}
                />
            </Routes>
            <WhatsAppButton />
            <Footer />
        </div>
    );
};

const HomePage = () => {
    const [showBanner, setShowBanner] = useState(true);
    return (
        <>
            <SEO
                title="Partners Hub Indonesia - Professional Business Solutions"
                description="Your trusted partner for business permits, legal services, tax & accounting, business advisory, HR management, M&A, and feasibility studies in Indonesia. Expert solutions for market entry and business growth."
                keywords="business permits Indonesia, legal services Jakarta, tax accounting Indonesia, business advisory, HR management, M&A Indonesia, feasibility studies, company incorporation Indonesia, business licensing, regulatory compliance"
                image="/images/thumbnailphi.png"
                structuredData={generateHomepageSchema()}
            />
            {showBanner && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 p-4 flex items-end justify-start"
                    onClick={() => setShowBanner(false)}
                >
                    <div
                        className="relative bg-white rounded-2xl shadow-2xl w-[92vw] sm:w-auto max-w-sm overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowBanner(false)}
                            className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-800 border border-gray-200 shadow hover:bg-gray-50"
                            aria-label="Close banner"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <img
                            src="/images/popup-banner.jpg"
                            alt="PHI x TOMAZZ Seminar"
                            className="w-full h-auto object-cover"
                            loading="lazy"
                        />
                        <div className="p-3 sm:p-4 flex justify-center">
                            <Link
                                to="/survey"
                                onClick={() => {
                                    setShowBanner(false);
                                    trackSurveyStart();
                                    trackSurveyInteraction('start', { source: 'popup_banner' });
                                }}
                                className="px-6 py-3 sm:px-8 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Take Survey
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <Hero />
            <About />
            <OurServices />
            <LegalService />
            <Services />

            <Stats />
            <Portfolio />
            <Customer />
            {/* <Testimonials /> */}
            {/* <Blog /> */}
            <Team />

            <Contact />
        </>
    );
};

export default App;
