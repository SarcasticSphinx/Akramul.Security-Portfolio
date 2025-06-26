'use client'

import React, { useState } from 'react';
import { Building2, Users, Shield, Laptop, Facebook, PenTool, ArrowUpRight, Calendar, MapPin, Award, Star } from 'lucide-react';

const ExperienceSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const experiences = [
    {
      id: 1,
      title: "DigitX",
      role: "Founder & CEO",
      icon: Building2,
      period: "2020 - Present",
      location: "Bangladesh",
      type: "Cybersecurity Consultancy",
      description: "Leading cybersecurity brand providing enterprise-level consulting, awareness programs, and comprehensive client services.",
      details: [
        "Strategic cybersecurity consulting for 50+ enterprises",
        "Digital awareness campaigns and training programs",
        "Comprehensive security assessments and audits",
        "Custom security solutions implementation",
        "24/7 incident response and support services"
      ],
      achievements: "50+ Clients • $2M+ Revenue Protected • 200+ Assessments",
      stats: { clients: "50+", assessments: "200+", uptime: "99.9%" }
    },
    {
      id: 2,
      title: "Cyber Help Cumilla",
      role: "Founder & Community Leader",
      icon: Users,
      period: "2019 - Present",
      location: "Cumilla, Bangladesh",
      type: "Community Initiative",
      description: "Built and manage online awareness group supporting digital safety education and community cybersecurity initiatives.",
      details: [
        "Grew community to 10,000+ active members",
        "Conducted 100+ workshops on digital literacy",
        "Created comprehensive cybersecurity resource library",
        "Established incident reporting and response system",
        "Collaborated with local law enforcement agencies"
      ],
      achievements: "10K+ Members • 100+ Workshops • 500+ Cases Resolved",
      stats: { members: "10K+", workshops: "100+", cases: "500+" }
    },
    {
      id: 3,
      title: "Bangladesh Police Training",
      role: "Digital Forensics Instructor",
      icon: Shield,
      period: "2022 - 2023",
      location: "Police Headquarters, Dhaka",
      type: "Government Training",
      description: "Assisted senior mentor Arif Muhyuddin in delivering specialized training on digital forensics and cybercrime investigation.",
      details: [
        "Developed curriculum for digital forensics training",
        "Conducted hands-on laboratory sessions",
        "Taught cybercrime investigation methodologies",
        "Trained officers in evidence preservation techniques",
        "Covered legal aspects of digital evidence handling"
      ],
      achievements: "300+ Officers Trained • 95% Completion Rate • 5★ Rating",
      stats: { officers: "300+", completion: "95%", rating: "5★" }
    },
    {
      id: 4,
      title: "Bangladesh Army Cybersecurity",
      role: "Training Support Specialist",
      icon: Laptop,
      period: "2023",
      location: "Military Installations",
      type: "Defense Training",
      description: "Provided specialized cybersecurity training support for Bangladesh Army personnel on advanced threat detection and response.",
      details: [
        "Advanced persistent threat (APT) analysis training",
        "Network security and monitoring protocols",
        "Military-grade encryption implementation",
        "Critical infrastructure protection strategies",
        "Incident response for national security threats"
      ],
      achievements: "150+ Personnel Trained • Critical Infrastructure Secured",
      stats: { personnel: "150+", systems: "25+", clearance: "Top Secret" }
    },
    {
      id: 5,
      title: "Client Recovery Services",
      role: "Social Media Security Specialist",
      icon: Facebook,
      period: "2020 - Present",
      location: "Remote Operations",
      type: "Recovery Services",
      description: "Specialized in recovering compromised social media accounts and enabling monetization for content creators and businesses.",
      details: [
        "Facebook page recovery from sophisticated attacks",
        "Monetization setup and revenue optimization",
        "Rights Manager configuration and troubleshooting",
        "Legal Entity Rights System (LERS) issue resolution",
        "Account security hardening and prevention protocols"
      ],
      achievements: "200+ Pages Recovered • $500K+ Revenue Restored",
      stats: { recovered: "200+", revenue: "$500K+", success: "98%" }
    },
    {
      id: 6,
      title: "Content Creation Hub",
      role: "Cybersecurity Educator & Writer",
      icon: PenTool,
      period: "2018 - Present",
      location: "Digital Platforms",
      type: "Education & Media",
      description: "Publishing regular cybersecurity content across multiple platforms to educate and raise awareness in the cybersecurity community.",
      details: [
        "Technical deep-dive articles on Medium platform",
        "Professional insights and case studies on LinkedIn",
        "Educational video content and live sessions",
        "Threat intelligence reports and analysis",
        "Community engagement and expert consultations"
      ],
      achievements: "500+ Articles • 50K+ Followers • 1M+ Views",
      stats: { articles: "500+", followers: "50K+", views: "1M+" }
    }
  ];

  return (
    <div id='experience' className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white mb-6">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive cybersecurity expertise across consulting, training, and community building
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => {
            const IconComponent = exp.icon;
            const isHovered = hoveredCard === exp.id;
            
            return (
              <div
                key={exp.id}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredCard(exp.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Main Card */}
                <div className={`
                  relative bg-gray-900 border border-gray-800 rounded-2xl p-8 h-full
                  transition-all duration-500 ease-out overflow-hidden
                  ${isHovered ? 'border-white transform -translate-y-2 shadow-2xl shadow-white/10' : 'hover:border-gray-700'}
                `}>
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`
                      p-4 bg-white rounded-xl transition-all duration-300
                      ${isHovered ? 'rotate-6 scale-110' : ''}
                    `}>
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                    <div className={`
                      transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `}>
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Card Content */}
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

                    {/* Meta Information */}
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

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 pt-4">
                      {Object.entries(exp.stats).map(([key, value], index) => (
                        <div key={index} className="text-center">
                          <div className="text-lg font-bold text-white">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Overlay with Details */}
                  <div className={`
                    absolute inset-0 bg-black/95 backdrop-blur-sm rounded-2xl p-8
                    transition-all duration-500 flex flex-col justify-between
                    ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  `}>
                    
                    {/* Detailed Header */}
                    <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-white rounded-lg">
                          <IconComponent className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                          <p className="text-sm text-gray-400">{exp.type}</p>
                        </div>
                      </div>

                      {/* Detailed Information */}
                      <div className="space-y-3 mb-6">
                        {exp.details.map((detail, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-300 leading-relaxed">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievement Footer */}
                    <div className="border-t border-gray-800 pt-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="w-4 h-4 text-white" />
                        <span className="text-xs font-semibold text-white uppercase tracking-wider">
                          Key Achievements
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">
                        {exp.achievements}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "5+", label: "Years Experience", icon: Calendar },
            { number: "400+", label: "Clients & Trainees", icon: Users },
            { number: "50K+", label: "Community Reach", icon: Star },
            { number: "500+", label: "Content Published", icon: PenTool }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group cursor-pointer">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-white hover:bg-gray-800 transition-all duration-300">
                  <IconComponent className="w-8 h-8 text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
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