import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkBackground, setIsDarkBackground] = useState(true);
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/ourservices" },
        { name: "Contact", path: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Check background on route change and scroll position
    useEffect(() => {
        const checkBackground = () => {
            // Assume dark background on home page or when not scrolled
            const isDark = location.pathname === "/" && !isScrolled;
            setIsDarkBackground(isDark);
        };

        checkBackground();
    }, [location, isScrolled]);

    const getTextColor = () => {
        if (isScrolled) {
            return "text-gray-800 hover:text-blue-600";
        }
        return isDarkBackground
            ? "text-white hover:text-blue-400"
            : "text-gray-800 hover:text-blue-600";
    };

    const getNavBackground = () => {
        if (isScrolled) {
            return "bg-white/80 backdrop-blur-lg shadow-lg";
        }
        return isDarkBackground
            ? "bg-transparent"
            : "bg-white/80 backdrop-blur-lg";
    };

    const getLogoColor = () => {
        if (isScrolled) {
            return "text-gray-900";
        }
        return isDarkBackground ? "text-white" : "text-gray-900";
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${getNavBackground()}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Text Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span
                                className={`text-2xl font-bold ${getLogoColor()} transition-colors duration-300`}
                            >
                                <img
                                    src="/images/logophi.png"
                                    alt="Logo"
                                    className="h-20 w-50 mr-2"
                                />
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                <Link
                                    to={link.path}
                                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${getTextColor()} ${
                                        location.pathname === link.path
                                            ? "bg-blue-50/20"
                                            : "hover:bg-white/10"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            </div>
                        ))}

                        <a
                            href="#about"
                            className="ml-6 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            Get Started
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${getTextColor()}`}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="#about"
                            className="w-full mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
