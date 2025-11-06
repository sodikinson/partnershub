import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import { trackSurveyStart } from "../utils/metaPixel";
import { trackSurveyInteraction } from "../utils/googleAnalytics";
import SurveyModal from "./SurveyModal";

const HeroBanner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalClosed, setIsModalClosed] = useState(() => {
        // Initialize from localStorage
        if (typeof window !== 'undefined') {
            return localStorage.getItem('surveyModalClosed') === 'true';
        }
        return false;
    });

    // Sync with localStorage on every render to ensure button stays visible
    useEffect(() => {
        const checkModalClosed = () => {
            const modalClosed = localStorage.getItem('surveyModalClosed');
            if (modalClosed === 'true' && !isModalClosed) {
                setIsModalClosed(true);
            }
        };
        checkModalClosed();
    }, [isModalClosed, isModalOpen]);

    const handleBannerClick = () => {
        trackSurveyStart();
        trackSurveyInteraction('start', { source: 'hero_banner' });
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        // Set modal as closed and persist to localStorage
        setIsModalClosed(true);
        localStorage.setItem('surveyModalClosed', 'true');
    };

    // Ensure floating button stays visible even if modal state changes
    useEffect(() => {
        if (isModalClosed && !isModalOpen) {
            // Force update to ensure button is visible
            const timer = setTimeout(() => {
                if (!localStorage.getItem('surveyModalClosed')) {
                    localStorage.setItem('surveyModalClosed', 'true');
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isModalClosed, isModalOpen]);

    const handleFloatingButtonClick = () => {
        trackSurveyStart();
        trackSurveyInteraction('start', { source: 'floating_button' });
        // Navigate to /survey page - Link component will handle this
    };

    return (
        <>
            <section className="relative w-full mt-20 sm:mt-24 md:mt-28">
                {/* Full-width clickable banner - always visible */}
                <button
                    onClick={handleBannerClick}
                    className="block w-full cursor-pointer group relative"
                    aria-label="Register for Event - Click to participate"
                >
                    {/* Background Image Container - Responsive and fully visible */}
                    <div className="relative w-full overflow-hidden bg-gray-100 sm:bg-transparent">
                        <img
                            src="/images/hero.jpeg"
                            alt="Event Registration - Partners Hub Indonesia"
                            className="w-full transition-transform duration-700 ease-out
                                h-[200px]
                                object-contain
                                object-center
                                xs:h-[220px]
                                sm:h-[280px]
                                sm:object-cover
                                md:h-[350px]
                                lg:h-[500px]
                                xl:h-[600px]
                                2xl:h-[700px]
                                group-hover:scale-105"
                            loading="eager"
                            style={{
                                width: '100%',
                                display: 'block',
                            }}
                        />
                        
                        {/* Dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 z-10"></div>
                    </div>
                </button>
            </section>

            {/* Floating "Take Survey" Button - shown when modal is closed */}
            {isModalClosed && !isModalOpen && (
                <Link
                    to="/survey"
                    onClick={handleFloatingButtonClick}
                    className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[60] flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 group animate-fade-in"
                    aria-label="Take Survey"
                    style={{ zIndex: 60 }}
                >
                    <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform flex-shrink-0" />
                    <span className="font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap">Take Survey</span>
                </Link>
            )}

            {/* Survey Modal */}
            <SurveyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onModalClose={handleModalClose}
            />
        </>
    );
};

export default HeroBanner;

