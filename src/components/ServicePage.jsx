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

const services = [
    {
        title: "Business Permit & Legal Services ",
        description: [
            {
                section: "A. Business Registration & Licensing",
                items: [
                    "Company incorporation (PT, CV, PMA)",
                    "NIB (Business Identification Number)",
                    "SIUP (Business License)",
                    "TDP/TDUP/KBLI Adjustment",
                    "OSS (Online Single Submission) assistance",
                    "Licensing for specific industries (F&B, health, export-import, etc.)",
                ],
            },
            {
                section: "B. Legal Documentation & Corporate Governance",
                items: [
                    "Drafting & reviewing company deeds (AKTA)",
                    "Notarial services & legal opinions",
                    "Shareholder agreements & board resolutions",
                    "Internal company regulations",
                    "Legal compliance audit",
                ],
            },
            {
                section: "C. Regulatory Compliance",
                items: [
                    "BPOM registration (Food, Supplements, Cosmetics)",
                    "Halal certification assistance (BPJPH)",
                    "Izin edar (distribution permit)",
                    "Importer of Record (IOR) service",
                    "Trademark registration (HAKI)",
                ],
            },
        ],
        icon: Rabbit,
        color: "blue",
        slug: "business-permit-legal-services",
    },
    {
        title: "Tax & Accounting",
        description: [
            {
                section: "A. Tax Services",
                items: [
                    "Tax planning and advisory",
                    "Monthly & annual tax reporting",
                    "VAT (PPN) and Income Tax (PPh) handling",
                    "Tax ID (NPWP) and PKP registration",
                    "Tax audit and dispute assistance",
                    "Tax due diligence and compliance check",
                    "Tax consultation for foreign entities",
                ],
            },
            {
                section: "B. Accounting Services",
                items: [
                    "Monthly bookkeeping",
                    "Financial statement preparation (PSAK Standard)",
                    "Payroll accounting",
                    "Profit & loss, balance sheet, and cash flow reports",
                    "Business cost analysis",
                ],
            },
            {
                section: "C. Other Related Services",
                items: [
                    "Assistance for E-Faktur and E-Bupot",
                    "Transfer pricing documentation (TP Doc)",
                    "Audit coordination with public accountants",
                    "Financial restructuring support",
                ],
            },
        ],
        icon: Expand,
        color: "purple",
        slug: "tax-accounting",
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

const ServicePage = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-50 to-purple-50 py-20 mb-12">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Services
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        We provide innovative solutions for your business needs
                        including Business Permit, Legal Service, Tax and
                        Accounting, Business Advisory and Strategy, HR Services,
                        Merger and Acquisition, and Feasibility Study.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <Link
                                to={`/service/${service.slug}`}
                                key={service.slug}
                                className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 border border-gray-100 hover:border-blue-200 relative overflow-hidden h-full flex flex-col"
                                style={{ textDecoration: "none" }}
                            >
                                {/* <div
                                    className={`w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-r ${getGradient(
                                        service.color
                                    )} mb-6 shadow-md`}
                                >
                                    <Icon className="w-8 h-8 text-white" />
                                </div> */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                                    {service.title}
                                </h3>
                                <div className="text-gray-600 leading-relaxed mb-4">
                                    {Array.isArray(service.description) ? (
                                        <ul className="list-disc pl-5 space-y-2">
                                            {service.description.map(
                                                (section, i) => (
                                                    <li
                                                        key={i}
                                                        className="mb-1"
                                                    >
                                                        <span className="font-semibold text-gray-800">
                                                            {section.section}
                                                        </span>
                                                        <ul className="list-[circle] pl-5 mt-1">
                                                            {section.items.map(
                                                                (item, j) => (
                                                                    <li key={j}>
                                                                        {item}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        <ul className="list-disc pl-5">
                                            {service.description
                                                .split(",")
                                                .map((item, i) => (
                                                    <li key={i}>
                                                        {item.trim()}
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </div>
                                {/* <a
                                    href="https://wa.me/628111840070"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-indigo-700 font-semibold group-hover:underline transition-all"
                                >
                                    Consult Now &rarr;
                                </a> */}
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to grow your business?
                    </h2>
                    <p className="text-lg text-blue-100 mb-8">
                        Contact us today for a free consultation and discover
                        how we can help your business thrive in Indonesia.
                    </p>
                    <a
                        href="https://wa.me/628111840070"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-colors text-lg"
                    >
                        Contact Us on WhatsApp
                    </a>
                </div>
            </section>
        </>
    );
};

export default ServicePage;
