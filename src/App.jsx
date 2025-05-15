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
import OurServices from "./components/OurService";
import WhatsAppButton from "./components/WhatsAppButton";
import ServicePage from "./components/ServicePage";
import "./styles/animations.css";

const App = () => {
    return (
        <HelmetProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <SEO
                        title="Partners Hub - Business Solutions"
                        description="We provide innovative solutions for your business needs including Business Permit, Legal Service, Tax and Accounting, Business Advisory and Strategy, HR Management, Merger and Acquisition, and Feasibility Study."
                        keywords="Business Permit, Legal Service, Tax and Accounting, Business Advisory and Strategy, HR Management, Merger and Acquisition, and Feasibility Study"
                        image="/images/thumbnailphi.png"
                    />
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/ourservices" element={<OurServices />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/service/:slug"
                            element={<ServicePage />}
                        />
                    </Routes>
                    <WhatsAppButton />
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
            <OurServices />
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
