import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import SEO from "./components/SEO";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
// import Blog from "./components/Blog";
import Customer from "./components/Customer";
import "./styles/animations.css";

const App = () => {
    return (
        <HelmetProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <SEO
                        title="Partners Hub - Business Solutions"
                        description="We provide innovative solutions for your business needs including Business Permit, Legal Service, Tax and Accounting, Business Advisory and Strategy, HR Management, Merger and Acquisition, and Feasibility Study."
                        keywords="web development, mobile apps, UI/UX design, digital marketing"
                        image="/og-image.jpg"
                    />
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </HelmetProvider>
    );
};

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Services />
            <Stats />
            <Portfolio />
            <Customer />
            <Testimonials />
            {/* <Blog /> */}
            <Team />

            <Contact />
        </>
    );
};

export default App;
