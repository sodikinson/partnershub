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
import { Link } from "react-router-dom";

const OurServices = () => {
    const services = [
        {
            title: "Business Permit & Legal Services ",
            description:
                "Business registration & licensing, Compliance with local regulations, Legal documentation & corporate governance",
            icon: Rabbit,
            color: "blue",
            slug: "business-permit-legal-services",
        },
        {
            title: "Tax & Accounting",
            description:
                "Tax Planning, tax compliance, reporting, Tax Lawyer, Financial Statement, Auditing",
            icon: Expand,
            color: "purple",
            slug: "tax-accounting",
        },
        {
            title: "Business advisory & Strategy",
            description:
                "Business Process Optimization, Market enrty Strategy, Corporate Restructuring",
            icon: DollarSign,
            color: "pink",
            slug: "business-advisory-strategy",
        },
        {
            title: "HR Services",
            description:
                "Policies, Compliance, Recruitment, Talent Acquisition, Payroll, and Employee benefits",
            icon: Users,
            color: "orange",
            slug: "hr-services",
        },
        {
            title: "Mergers & Acquisitions",
            description:
                "Due diligence, valuation,Negotiation, Deal Structuring, Post-merger integration",
            icon: BellDot,
            color: "cyan",
            slug: "mergers-acquisitions",
        },
        {
            title: "Feasibility Study",
            description:
                "Market analysis, Research, Final projections, Risk assessment",
            icon: FileText,
            color: "green",
            slug: "feasibility-study",
        },
        {
            title: "Adaptability",
            description:
                "Seamless integration of third-party services and APIs",
            icon: ChartSpline,
            color: "yellow",
            slug: "adaptability",
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
        <section id="ourservice" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Services
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Partnering With Us
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 cursor-grab gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <Link
                                key={index}
                                to={`/service/${service.slug}`}
                                className="group hover:bg-indigo-100 relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden block"
                                style={{ textDecoration: "none" }}
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 pattern-grid-lg" />
                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurServices;
