import React from "react";
import {
    Users,
    LinkedinIcon,
    TwitterIcon,
    MailIcon,
    GlobeIcon,
} from "lucide-react";

const Team = () => {
    const team = [
        {
            name: "John Doe",
            position: "CEO & Co-Founder",
            image: "/images/retail.jpg",
            bio: "Visionary leader with 15+ years of experience in tech innovation",
            expertise: ["Retail", "Creative Company"],
            color: "blue",
            social: {
                linkedin: "https://linkedin.com/in/johndoe",
                twitter: "https://twitter.com/johndoe",
                email: "john@company.com",
                website: "https://johndoe.com",
            },
        },
        {
            name: "Jane Smith",
            position: "CTO & Tech Lead",
            image: "/images/edu.jpg",
            bio: "Tech enthusiast driving cutting-edge solutions in software development",
            expertise: ["Educational", "Financial", "Information Technology"],
            color: "purple",
            social: {
                linkedin: "https://linkedin.com/in/janesmith",
                twitter: "https://twitter.com/janesmith",
                email: "jane@company.com",
                website: "https://janesmith.com",
            },
        },
        {
            name: "Mike Johnson",
            position: "Lead Designer",
            image: "/images/farm.jpg",
            bio: "Creative mind behind our award-winning user experience designs",
            expertise: ["Agriculture", "Aquaculture"],
            color: "pink",
            social: {
                linkedin: "https://linkedin.com/in/mikejohnson",
                twitter: "https://twitter.com/mikejohnson",
                email: "mike@company.com",
                website: "https://mikejohnson.com",
            },
        },
        {
            name: "John Doe",
            position: "CEO & Co-Founder",
            image: "/images/factory.jpg",
            bio: "Visionary leader with 15+ years of experience in tech innovation",
            expertise: ["Infrastructure", "Manufacturing"],
            color: "blue",
            social: {
                linkedin: "https://linkedin.com/in/johndoe",
                twitter: "https://twitter.com/johndoe",
                email: "john@company.com",
                website: "https://johndoe.com",
            },
        },
        {
            name: "Jane Smith",
            position: "CTO & Tech Lead",
            image: "/images/mining.jpg",
            bio: "Tech enthusiast driving cutting-edge solutions in software development",
            expertise: ["Mining", "Energy"],
            color: "purple",
            social: {
                linkedin: "https://linkedin.com/in/janesmith",
                twitter: "https://twitter.com/janesmith",
                email: "jane@company.com",
                website: "https://janesmith.com",
            },
        },
        {
            name: "Mike Johnson",
            position: "Lead Designer",
            image: "/images/food.jpg",
            bio: "Creative mind behind our award-winning user experience designs",
            expertise: ["Food", "Beverage"],
            color: "pink",
            social: {
                linkedin: "https://linkedin.com/in/mikejohnson",
                twitter: "https://twitter.com/mikejohnson",
                email: "mike@company.com",
                website: "https://mikejohnson.com",
            },
        },
        {
            name: "Jane Smith",
            position: "CTO & Tech Lead",
            image: "/images/caroseri.jpg",
            bio: "Tech enthusiast driving cutting-edge solutions in software development",
            expertise: ["Caroseri"],
            color: "purple",
            social: {
                linkedin: "https://linkedin.com/in/janesmith",
                twitter: "https://twitter.com/janesmith",
                email: "jane@company.com",
                website: "https://janesmith.com",
            },
        },
        {
            name: "Mike Johnson",
            position: "Lead Designer",
            image: "/images/export.jpg",
            bio: "Creative mind behind our award-winning user experience designs",
            expertise: ["Export", "Import"],
            color: "pink",
            social: {
                linkedin: "https://linkedin.com/in/mikejohnson",
                twitter: "https://twitter.com/mikejohnson",
                email: "mike@company.com",
                website: "https://mikejohnson.com",
            },
        },
    ];

    const getGradient = (color) => {
        const gradients = {
            blue: "from-blue-500 to-blue-600",
            purple: "from-purple-500 to-purple-600",
            pink: "from-pink-500 to-pink-600",
        };
        return gradients[color];
    };

    const getBgLight = (color) => {
        const backgrounds = {
            blue: "bg-blue-50",
            purple: "bg-purple-50",
            pink: "bg-pink-50",
        };
        return backgrounds[color];
    };

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Clients
                        </span>
                    </h2>
                    {/* <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Our team of experts brings together decades of
                        experience to deliver exceptional results
                    </p> */}
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-500 pattern-grid-lg" />

                            {/* Member Image Container */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Hover Social Links */}
                                {/* <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <a
                                        href={member.social.linkedin}
                                        className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <LinkedinIcon className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={member.social.twitter}
                                        className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <TwitterIcon className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={`mailto:${member.social.email}`}
                                        className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors duration-300"
                                    >
                                        <MailIcon className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={member.social.website}
                                        className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <GlobeIcon className="w-5 h-5" />
                                    </a>
                                </div> */}
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Name & Position */}
                                {/* <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {member.name}
                                    </h3>
                                    <p
                                        className={`inline-block text-sm font-medium bg-gradient-to-r ${getGradient(
                                            member.color
                                        )} bg-clip-text text-transparent`}
                                    >
                                        {member.position}
                                    </p>
                                </div> */}

                                {/* Bio */}
                                {/* <p className="text-gray-600 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                    {member.bio}
                                </p> */}

                                {/* Expertise Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {member.expertise.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-3 py-1 text-sm rounded-full ${getBgLight(
                                                member.color
                                            )} text-gray-700`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Bottom Accent */}
                                <div
                                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getGradient(
                                        member.color
                                    )} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
