import React from "react";
import {
    Globe2,
    CheckCircle2,
    Users,
    Star,
    TrendingUp,
    Award,
    Building2,
    ThumbsUp,
} from "lucide-react";

const Stats = () => {
    const stats = [
        {
            number: "200+",
            label: "Multinational Companies",
            icon: Globe2,
            description: "Diverse Industries",
            growth: "+25% this year",
            color: "from-blue-400 to-blue-600",
        },
        {
            number: "200+",
            label: "Projects Completed",
            icon: CheckCircle2,
            description: "Successfully delivered",
            growth: "+40% this year",
            color: "from-emerald-400 to-emerald-600",
        },
        {
            number: "SOLID",
            label: "Expert Team Members",
            icon: Users,
            description: "Skilled professionals",
            growth: "+15% this year",
            color: "from-purple-400 to-purple-600",
        },
        {
            number: "5+",
            label: "Years Experience",
            icon: Star,
            description: "Industry expertise",
            growth: "Established 2020",
            color: "from-amber-400 to-amber-600",
        },
    ];

    const additionalStats = [
        {
            icon: TrendingUp,
            label: "Growth Rate",
            value: "125%",
        },
        {
            icon: Award,
            label: "Awards Won",
            value: "15+",
        },
        {
            icon: Building2,
            label: "Variety of Industries",
            value: "12",
        },
        {
            icon: ThumbsUp,
            label: "Client Satisfaction",
            value: "98%",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-gray-900 to-blue-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNHMtNi4yNjggMTQtMTQgMTR6IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Trusted by{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Prestigious Companies
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-blue-100/80">
                        Our numbers speak for themselves. See how we've helped
                        businesses grow and succeed.
                    </p>
                </div>

                {/* Main Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="relative group">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10">
                                    {/* Icon */}
                                    <div
                                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Numbers */}
                                    <div className="space-y-2">
                                        <div className="text-4xl font-bold text-white">
                                            {stat.number}
                                        </div>
                                        <div className="text-lg font-semibold text-blue-100">
                                            {stat.label}
                                        </div>
                                        <div className="text-sm text-blue-200/80">
                                            {stat.description}
                                        </div>
                                        <div className="text-sm text-emerald-400 flex items-center">
                                            <TrendingUp className="w-4 h-4 mr-1" />
                                            {stat.growth}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Stats Bar */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {additionalStats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="px-6 py-4 text-center"
                                >
                                    <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                    <div className="text-sm text-blue-200/80 mb-1">
                                        {stat.label}
                                    </div>
                                    <div className="text-2xl font-bold text-white">
                                        {stat.value}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </section>
    );
};

export default Stats;
