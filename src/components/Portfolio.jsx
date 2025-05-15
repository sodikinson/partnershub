import React, { useState } from "react";
import {
    ArrowUpRight,
    ExternalLink,
    Clock,
    Building2,
    ArrowRight,
} from "lucide-react";

const Portfolio = () => {
    // const [activeCategory, setActiveCategory] = useState("All");

    // const categories = [
    //     "All",
    //     "Web Development",
    //     "Mobile Development",
    //     "UI/UX Design",
    // ];

    // const projects = [
    //     {
    //         title: "E-commerce Platform",
    //         category: "Web Development",
    //         image: "/src/assets/Logo.jpg",
    //         description: "A full-featured e-commerce solution with modern UI",
    //         client: "Tech Retail Inc.",
    //         duration: "3 months",
    //         tags: ["React", "Node.js", "MongoDB"],
    //     },
    //     {
    //         title: "Mobile Banking App",
    //         category: "Mobile Development",
    //         image: "/src/assets/Logo.jpg",
    //         description: "Secure and intuitive mobile banking experience",
    //         client: "Global Bank",
    //         duration: "4 months",
    //         tags: ["React Native", "Firebase", "Redux"],
    //     },
    //     {
    //         title: "Brand Redesign",
    //         category: "UI/UX Design",
    //         image: "/src/assets/Logo.jpg",
    //         description: "Complete brand identity refresh and guidelines",
    //         client: "Creative Agency",
    //         duration: "2 months",
    //         tags: ["Figma", "Adobe XD", "Sketch"],
    //     },
    //     {
    //         title: "Healthcare Dashboard",
    //         category: "Web Development",
    //         image: "/src/assets/Logo.jpg",
    //         description: "Analytics dashboard for healthcare providers",
    //         client: "MedTech Solutions",
    //         duration: "3 months",
    //         tags: ["Vue.js", "D3.js", "PostgreSQL"],
    //     },
    //     {
    //         title: "Fitness Tracking App",
    //         category: "Mobile Development",
    //         image: "/src/assets/Logo.jpg",
    //         description: "Comprehensive fitness and health monitoring",
    //         client: "FitLife",
    //         duration: "5 months",
    //         tags: ["Flutter", "Firebase", "ML Kit"],
    //     },
    //     {
    //         title: "Restaurant Booking System",
    //         category: "UI/UX Design",
    //         image: "/src/assets/Logo.jpg",
    //         description: "Streamlined booking and reservation platform",
    //         client: "Dining Network",
    //         duration: "2 months",
    //         tags: ["Figma", "Protopie", "Framer"],
    //     },
    // ];

    // const stats = [
    //     { number: "98%", label: "Project Success Rate", icon: ArrowUpRight },
    //     { number: "250+", label: "Happy Clients", icon: Building2 },
    //     { number: "15+", label: "Industry Awards", icon: ArrowUpRight },
    //     { number: "24/7", label: "Support Available", icon: Clock },
    // ];

    // const filteredProjects =
    //     activeCategory === "All"
    //         ? projects
    //         : projects.filter((project) => project.category === activeCategory);

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Vision for The{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-700">
                            Future
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Our company is committed to becoming a one-stop service
                        provider, offering our clients everything they need in
                        one convenient location. Our goal is to evolve into a
                        "super company" by expanding our offerings to include a
                        wide range of products and services, from essential
                        daily needs to specialized services. We plan to invest
                        in cutting-edge technology and recruit the best talent
                        in the industry to ensure we deliver the highest levels
                        of quality and efficiency to our clients. Our focus on
                        customer satisfaction, combined with our commitment to
                        innovation, will set us apart from the competition and
                        position us as leaders in the industry. We believe that
                        by providing a comprehensive suite of products and
                        services, we will meet the diverse needs of our clients,
                        saving them time and money while helping them achieve
                        their goals more efficiently.
                    </p>
                </div>

                {/* Categories */}
                {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                       ${
                           category === activeCategory
                               ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                       }`}
                        >
                            {category}
                        </button>
                    ))}
                </div> */}

                {/* Projects Grid */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                            <div className="relative">
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-blue-600">
                                        {project.category}
                                    </span>
                                </div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <p className="text-gray-300 text-sm mb-4">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            {project.client}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            {project.duration}
                                        </span>
                                    </div>
                                </div>
                                <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-xl text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn">
                                    <span className="font-medium">
                                        View Project
                                    </span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div> */}

                {/* Stats Section */}
                {/* <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 md:p-12 shadow-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="inline-block p-4 rounded-2xl bg-white shadow-md mb-4 group-hover:shadow-lg transition-all duration-300">
                                    <stat.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-sm font-medium text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default Portfolio;
