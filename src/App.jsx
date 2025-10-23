import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import SEO from "./components/SEO";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
// import Blog from "./components/Blog";
import Customer from "./components/Customer";
import OurServices from "./components/OurService";
import WhatsAppButton from "./components/WhatsAppButton";
import ServicePage from "./components/ServicePage";
import "./styles/animations.css";
import LegalService from "./components/LegalService";
import Event from "./components/Event";
import Survey from "./components/Survey";
import { trackPageView, trackSurveyStart } from "./utils/metaPixel";

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
        }, 100);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-gray-50">
            <SEO
                title="Partners Hub - Business Solutions"
                description="We provide innovative solutions for your business needs including Business Permit, Legal Service, Tax and Accounting, Business Advisory and Strategy, HR Management, Merger and Acquisition, and Feasibility Study."
                keywords="Business Permit, Legal Service, Tax and Accounting, Business Advisory and Strategy, HR Management, Merger and Acquisition, and Feasibility Study"
                image="/images/thumbnailphi.png"
            />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
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

const Home = () => {
    const [showBanner, setShowBanner] = useState(true);
    return (
        <>
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
