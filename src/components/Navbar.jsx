import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/ourservices" },
        { name: "Contact", path: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50">
            {/* iOS Glassmorphism Container */}
            <div
                className={`
                    relative
                    backdrop-blur-2xl
                    bg-white/85
                    border
                    border-gray-200/50
                    rounded-2xl
                    shadow-xl
                    shadow-black/10
                    transition-all
                    duration-500
                    ease-out
                    ${isScrolled ? 'shadow-2xl shadow-black/15 bg-white/90' : ''}
                `}
                style={{
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                }}
            >
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 to-white/30 pointer-events-none" />
                
                <div className="relative px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0 flex items-center">
                                <img
                                    src="/images/logophi.png"
                                    alt="Partners Hub Indonesia Logo"
                                    className="h-12 md:h-16 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`
                                        relative
                                        px-4
                                        py-2.5
                                        rounded-xl
                                        text-sm
                                        font-semibold
                                        transition-all
                                        duration-300
                                        ${
                                            location.pathname === link.path
                                                ? 'text-blue-700 bg-blue-100/80 font-bold shadow-sm'
                                                : 'text-gray-900 hover:text-blue-700 hover:bg-gray-100/70 active:bg-gray-200/70'
                                        }
                                    `}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full shadow-sm" />
                                    )}
                                </Link>
                            ))}

                            <a
                                href="#about"
                                className="ml-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
                            >
                                Get Started
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-900 hover:bg-gray-100/70 transition-all duration-300 active:scale-95 font-semibold"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? (
                                    <X size={24} className="text-gray-900" />
                                ) : (
                                    <Menu size={24} className="text-gray-900" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu - iOS style dropdown */}
                {isOpen && (
                    <div
                        className="md:hidden border-t border-gray-200/50"
                        style={{
                            backdropFilter: 'blur(40px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                        }}
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`
                                        block
                                        px-4
                                        py-3
                                        rounded-xl
                                        text-base
                                        font-semibold
                                        transition-all
                                        duration-300
                                        ${
                                            location.pathname === link.path
                                                ? 'text-blue-700 bg-blue-100/80 font-bold shadow-sm'
                                                : 'text-gray-900 hover:text-blue-700 hover:bg-gray-100/70 active:bg-gray-200/70'
                                        }
                                    `}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <a
                                href="#about"
                                className="block mt-2 px-4 py-3 rounded-xl bg-blue-600 text-white text-base font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/40 active:scale-95 text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
