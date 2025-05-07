import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import useMediaQuery from "../hooks/useMediaQuery";

const Hero = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 to-blue-900">
            {/* Background with overlay */}
            <div className="absolute inset-0">
                <picture>
                    <source
                        media="(max-width: 768px)"
                        srcSet="/hero-mobile.jpg"
                    />
                    <source
                        media="(max-width: 1024px)"
                        srcSet="/hero-tablet.jpg"
                    />
                    <img
                        src="/hero-desktop.jpg"
                        alt="Hero background"
                        className="w-full h-full object-cover opacity-40"
                        loading="eager"
                    />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-blue-900/90 backdrop-blur-sm"></div>
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            PARTNERS HUB INDONESIA{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Business Consultant & Advisory Service
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                            Empowering businesses to reach their full potential
                            with personalized, professional support.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-200 transform hover:scale-105">
                                Get Started
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 backdrop-blur-sm transition-all">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Stats/Features */}
                    <div className="hidden lg:grid grid-cols-2 gap-6">
                        {[
                            {
                                title: "Clients",
                                value: "200+",
                                desc: "Diverse Industries",
                            },
                            {
                                title: "Projects",
                                value: "200+",
                                desc: "Completed",
                            },
                            {
                                title: "Experience",
                                value: "5+",
                                desc: "Years",
                            },
                            { title: "Goals", value: "50+", desc: "Achieved" },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                            >
                                <h3 className="text-gray-400 text-sm font-medium">
                                    {stat.title}
                                </h3>
                                <p className="text-white text-3xl font-bold my-1">
                                    {stat.value}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {stat.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown className="w-6 h-6 text-white/50" />
            </div>
        </div>
    );
};

export default Hero;
