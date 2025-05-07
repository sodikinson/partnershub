import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ArrowUpRight,
} from "lucide-react";

const Footer = () => {
    const quickLinks = [
        { name: "Home", href: "#" },
        { name: "About", href: "#" },
        { name: "Services", href: "#" },
        { name: "Portfolio", href: "#" },
        { name: "Contact", href: "#" },
    ];

    const services = [
        { name: "Business Permit & Legal Service", href: "#" },
        { name: "Tax & Accounting", href: "#" },
        { name: "Business Advisory & Strategy", href: "#" },
        { name: "HR Management", href: "#" },
        { name: "Merger & Acquisition", href: "#" },
        { name: "Feasibility Study", href: "#" },
    ];

    const contactInfo = [
        {
            icon: <Phone className="w-5 h-5" />,
            text: "+62 812-1335-4221",
            href: "tel:+6281213354221",
        },
        {
            icon: <Mail className="w-5 h-5" />,
            text: "kolegabisnisidn@gmail.com",
            href: "mailto:kolegabisnisidn@gmail.com",
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            text: "Treasury Tower Lantai 16 Unit I, District 8 SCBD Lot 28",
            href: "#",
        },
    ];

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook" },
        { icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter" },
        {
            icon: <Instagram className="w-5 h-5" />,
            href: "#",
            name: "Instagram",
        },
        { icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn" },
    ];

    return (
        <footer className="bg-gray-900">
            {/* Newsletter Section */}
            {/* <div className="border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-white text-xl font-semibold mb-2">
                                Subscribe to our newsletter
                            </h3>
                            <p className="text-gray-400">
                                Stay up to date with our latest news and updates
                            </p>
                        </div>
                        <div className="w-full md:w-auto">
                            <form className="flex gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow md:flex-grow-0 w-full md:w-80 px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                                >
                                    Subscribe
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <img
                            className="h-8 w-auto"
                            src="/src/assets/logo-white.png"
                            alt="PHI Logo"
                        />
                        <p className="text-gray-400 leading-relaxed">
                            Our company is committed to becoming a one-stop
                            service provider, offering our clients everything
                            they need in one convenient location. Our goal is to
                            evolve into a "super company" by expanding our
                            offerings to include a wide range of products and
                            services, from essential daily needs to specialized
                            services.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">
                            Services
                        </h3>
                        <ul className="space-y-4">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a
                                        href={service.href}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center group"
                                    >
                                        {service.name}
                                        <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            {contactInfo.map((contact, index) => (
                                <li key={index}>
                                    <a
                                        href={contact.href}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group"
                                    >
                                        <span className="p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                                            {contact.icon}
                                        </span>
                                        <span>{contact.text}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Your Company. All
                            rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
