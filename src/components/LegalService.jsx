import React from "react";
import { Check, ArrowUpRight } from "lucide-react";

const LegalService = () => {
    const achievements = [
        { number: "5+", label: "Years Experience" },
        { number: "Solid", label: "Team Members" },
        { number: "98%", label: "Client Satisfaction" },
        { number: "90+", label: "Projects Completed" },
    ];

    const values = [
        {
            title: "Looking to be registered as a legal entity (LLC or Corporation)",
            description: "Proven insight Backed by Experience",
        },
        {
            title: "Actively involved in business operations",
            description: "Strategic guidance with Integrity",
        },
        {
            title: "Ranges from small to large-scale businesses",
            description: "Clear Solutions, Always within Reach",
        },
        {
            title: "Can be in any industry",
            description: "We Understand your Business Challanges",
        },
        {
            title: "May have multiple locations",
            description: "Strategic guidance with Integrity",
        },
        {
            title: "Financially stable with a track record of revenue growth",
            description: "Clear Solutions, Always within Reach",
        },
        {
            title: "Requires legal services for various needs and seeks high-quality, valuable legal assistance from a reliable partner",
            description: "We Understand your Business Challanges",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Legal{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Service
                        </span>
                    </h2>
                    {/* <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Empowering businesses to reach their full potential with
                        personalized, professional support. Our mission is to
                        build long-lasting partnerships driven by shared success
                        and excellence.
                    </p> */}
                </div>

                {/* Main Content - Centered Image */}
                <div className="flex justify-center items-center mb-20">
                    <div className="relative w-full max-w-4xl">
                        {/* Decorative background element */}
                        <div className="absolute -top-4 -left-4 w-48 h-48 md:w-72 md:h-72 bg-blue-100 rounded-lg -z-10 opacity-50"></div>
                        
                        {/* Responsive Image Container */}
                        <div className="flex justify-center">
                            <img
                                src="/images/Legal.jpg"
                                alt="Legal Services"
                                className="rounded-lg shadow-2xl w-full max-w-full object-cover h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] mx-auto"
                            />
                        </div>
                        {/* Achievement Stats */}
                        {/* <div className="grid grid-cols-2 gap-4 absolute -right-8 -bottom-8 bg-white p-6 rounded-lg shadow-xl max-w-sm">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {achievement.number}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {achievement.label}
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LegalService;
