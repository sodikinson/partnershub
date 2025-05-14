import React from "react";
import { Quote } from "lucide-react";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Chen Jiuheng",
            position: "CEO, Tech Solutions",
            image: "/images/chen.png",
            quote: "Working with this company has been an absolute game-changer for our business. Their innovative solutions and dedicated team exceeded our expectations.",
            color: "blue",
        },
        {
            name: "Wen Yifan",
            position: "Marketing Director, Mining Corp",
            image: "/images/wen.png",
            quote: "The level of professionalism and expertise they bring to the table is outstanding. Our project was delivered on time and within budget.",
            color: "purple",
        },
        {
            name: "William Park",
            position: "Founder, StartUp Inc",
            image: "/images/will.png",
            quote: "Their creative approach to problem-solving and attention to detail made our collaboration incredibly successful. Highly recommended!",
            color: "pink",
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

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        What Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Clients Say
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Discover why leading companies choose us for their
                        business journey
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 pattern-grid-lg" />

                            {/* Quote Icon */}
                            <div className="mb-6 relative">
                                <div
                                    className={`w-14 h-14 rounded-lg bg-gradient-to-r ${getGradient(
                                        testimonial.color
                                    )} flex items-center justify-center`}
                                >
                                    <Quote className="w-7 h-7 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <blockquote className="text-gray-600 leading-relaxed mb-6 italic">
                                "{testimonial.quote}"
                            </blockquote>

                            {/* Author Info */}
                            <div className="flex items-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                                />
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {testimonial.position}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
