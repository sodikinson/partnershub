import React, { useState } from "react";
import {
  Calendar,
  User,
  Tag,
  TrendingUp,
  Eye,
  MessageSquare,
  BookOpen,
} from "lucide-react";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const posts = [
    {
      title: "The Future of Web Development",
      excerpt:
        "Explore the latest trends and technologies shaping the future of web development...",
      image: "/src/assets/Logo.jpg",
      date: "March 15, 2024",
      author: "John Smith",
      category: "Technology",
      readTime: "5 min read",
      views: "2.5k",
      comments: "18",
      color: "from-blue-400 to-blue-600",
      trending: true,
    },
    {
      title: "Maximizing Business Growth with Digital Solutions",
      excerpt:
        "Learn how digital transformation can accelerate your business growth...",
      image: "/src/assets/Logo.jpg",
      date: "March 10, 2024",
      author: "Emily Brown",
      category: "Business",
      readTime: "7 min read",
      views: "1.8k",
      comments: "24",
      color: "from-purple-400 to-purple-600",
      trending: false,
    },
    {
      title: "UI/UX Design Best Practices",
      excerpt:
        "Discover the essential principles of creating user-friendly interfaces...",
      image: "/src/assets/Logo.jpg",
      date: "March 5, 2024",
      author: "Alex Turner",
      category: "Design",
      readTime: "6 min read",
      views: "3.2k",
      comments: "32",
      color: "from-emerald-400 to-emerald-600",
      trending: true,
    },
    {
      title: "Modern JavaScript Development",
      excerpt:
        "Learn about the latest features and best practices in JavaScript development...",
      image: "/src/assets/Logo.jpg",
      date: "March 2, 2024",
      author: "Sarah Johnson",
      category: "Development",
      readTime: "8 min read",
      views: "1.9k",
      comments: "15",
      color: "from-orange-400 to-orange-600",
      trending: false,
    },
  ];

  const categories = ["All", "Technology", "Business", "Design", "Development"];

  const filteredPosts = posts.filter((post) =>
    selectedCategory === "All" ? true : post.category === selectedCategory
  );

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 pattern-grid-lg" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stay Updated with Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Latest Articles
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Explore our collection of expert insights, tips, and strategies to
            help you stay ahead in the digital world
          </p>
        </div>

        {/* Featured Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                category === selectedCategory
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {post.trending && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">
                      Trending
                    </span>
                  </div>
                )}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${post.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category & Date */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>{post.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Author & Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
            View All Articles
          </button>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </section>
  );
};

export default Blog;
