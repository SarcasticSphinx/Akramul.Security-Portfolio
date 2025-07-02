"use client";

import React, { useEffect, useState } from "react";
import {
  Building2,
  Users,
  Shield,
  Laptop,
  Facebook,
  PenTool,
  ArrowUpRight,
  Calendar,
  MapPin,
  Award,
  Star,
} from "lucide-react";
import axiosInstance from "@/lib/axios";

interface Experience {
  _id: string;
  icon: string;
  title: string;
  role: string;
  description: string;
  period: string;
  location: string;
  stats: Record<string, string | number>;
  type: string;
  details: string[];
  achievements: string;
}

const ExperienceSection: React.FC = () => {
  const lucideIconMap: Record<string, React.ElementType> = {
    Building2,
    Users,
    Shield,
    Laptop,
    Facebook,
    PenTool,
    ArrowUpRight,
    Calendar,
    MapPin,
    Award,
    Star,
  };

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axiosInstance.get("/experiences");
        setExperiences(res.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div id="experience" className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white mb-6">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive cybersecurity expertise across consulting, training,
            and community building
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => {
            const IconComponent = lucideIconMap[exp.icon] || Shield;
            const isHovered = hoveredCard === exp._id;

            return (
              <div
                key={exp._id}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredCard(exp._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card */}
                <div
                  className={`
                    relative bg-gray-900 border border-gray-800 rounded-2xl p-8 h-full
                    transition-all duration-500 ease-out overflow-hidden
                    ${
                      isHovered
                        ? "border-white transform -translate-y-2 shadow-2xl shadow-white/10"
                        : "hover:border-gray-700"
                    }
                  `}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`p-4 bg-white rounded-xl transition-all duration-300 ${
                        isHovered ? "rotate-6 scale-110" : ""
                      }`}
                    >
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                    <div
                      className={`transition-all duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-medium text-gray-400 bg-gray-800 px-3 py-1 rounded-full inline-block">
                        {exp.role}
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-gray-800">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.period}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {exp.location}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-4">
                      {Object.entries(exp.stats).map(([key, value], idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-lg font-bold text-white">
                            {value}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/95 backdrop-blur-sm rounded-2xl p-8
                    transition-all duration-500 flex flex-col justify-between
                    ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}
                  `}
                  >
                    <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-white rounded-lg">
                          <IconComponent className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-gray-400">{exp.type}</p>
                        </div>
                      </div>
                      <div className="space-y-3 mb-6">
                        {(exp.details || []).map((detail, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-300 leading-relaxed">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-800 pt-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="w-4 h-4 text-white" />
                        <span className="text-xs font-semibold text-white uppercase tracking-wider">
                          Key Achievements
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{exp.achievements}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Summary */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "5+", label: "Years Experience", icon: Calendar },
            { number: "400+", label: "Clients & Trainees", icon: Users },
            { number: "50K+", label: "Community Reach", icon: Star },
            { number: "500+", label: "Content Published", icon: PenTool },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center group cursor-pointer">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-white hover:bg-gray-800 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
