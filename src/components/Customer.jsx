import React from "react";
import { Check, ArrowUpRight } from "lucide-react";

const Customer = () => {
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
                        Customer{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Profile
                        </span>
                    </h2>
                    {/* <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Empowering businesses to reach their full potential with
                        personalized, professional support. Our mission is to
                        build long-lasting partnerships driven by shared success
                        and excellence.
                    </p> */}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Left Column - Image */}
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-100 rounded-lg -z-10"></div>
                        <img
                            src="/images/Customer.jpg"
                            alt="About us"
                            className="rounded-lg shadow-2xl w-full object-cover h-[500px]"
                        />
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

                    {/* Right Column - Content */}
                    <div className="space-y-8">
                        {/* <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Introductory Note
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Partnershub Indonesia is a trusted business
                                consulting firm specializing in business
                                permits, legal services, tax and accounting,
                                advisory, HR management, mergers & acquisitions,
                                and feasibility studies. We provide
                                comprehensive solutions to help businesses
                                navigate regulatory requirements, optimize
                                operations, and achieve sustainable growth.
                            </p>
                        </div> */}

                        {/* Mission & Vision Cards */}
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                                    Mission
                                    <ArrowUpRight className="w-5 h-5 ml-2 text-blue-600" />
                                </h4>
                                <p className="text-gray-600">
                                    Empowering people and crafting exceptional
                                    strategies for outstanding service.
                                </p>
                            </div>
                            <div className="p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                                    Vision
                                    <ArrowUpRight className="w-5 h-5 ml-2 text-purple-600" />
                                </h4>
                                <p className="text-gray-600">
                                    To be the premier partner in fostering
                                    unparalleled business growth for our
                                    clients.
                                </p>
                            </div>
                        </div> */}

                        {/* Company Values */}
                        <div className="space-y-4">
                            {values.map((value, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <Check className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h5 className="text-lg font-semibold text-gray-900">
                                            {value.title}
                                        </h5>
                                        {/* <p className="text-gray-600">
                                            {value.description}
                                        </p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Customer;
