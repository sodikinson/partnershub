import React from "react";
import {
    Rabbit,
    Expand,
    DollarSign,
    Users,
    BellDot,
    FileText,
    ChartSpline,
} from "lucide-react";

const Services = () => {
    const services = [
        {
            title: "Fast & Precise",
            description:
                "Custom websites and web applications built with cutting-edge technologies",
            icon: Rabbit,
            color: "blue",
        },
        {
            title: "Scalable Solutions",
            description:
                "Native and cross-platform mobile solutions for iOS and Android",
            icon: Expand,
            color: "purple",
        },
        {
            title: "Cost-Effective",
            description:
                "User-centered design solutions that drive engagement and conversion",
            icon: DollarSign,
            color: "pink",
        },
        {
            title: "Complimentary Consultation",
            description:
                "Comprehensive digital marketing strategies to boost your online presence",
            icon: Users,
            color: "orange",
        },
        {
            title: "Free Reports",
            description: "Scalable cloud infrastructure and migration services",
            icon: BellDot,
            color: "cyan",
        },
        {
            title: "Daily Updates",
            description:
                "Advanced security measures to protect your digital assets",
            icon: FileText,
            color: "green",
        },
        {
            title: "Adaptability",
            description:
                "Seamless integration of third-party services and APIs",
            icon: ChartSpline,
            color: "yellow",
        },
    ];

    const getGradient = (color) => {
        const gradients = {
            blue: "from-blue-500 to-blue-600",
            purple: "from-purple-500 to-purple-600",
            pink: "from-pink-500 to-pink-600",
            orange: "from-orange-500 to-orange-600",
            cyan: "from-cyan-500 to-cyan-600",
            green: "from-green-500 to-green-600",
            yellow: "from-yellow-500 to-yellow-600",
            indigo: "from-indigo-500 to-indigo-600",
        };
        return gradients[color];
    };

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Key{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Benefits
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Partnering With Us
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 pattern-grid-lg" />

                                {/* Icon */}
                                <div className={`mb-6 relative`}>
                                    <div
                                        className={`w-14 h-14 rounded-lg bg-gradient-to-r ${getGradient(
                                            service.color
                                        )} flex items-center justify-center`}
                                    >
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {service.title}
                                </h3>
                                {/* <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p> */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
