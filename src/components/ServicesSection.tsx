import React from "react";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline";

const ServicesSection = () => {
  const timelineData = [
    {
      id: 1,
      title: "Social Media Account Recovery",
      availablity: "available",
      content:
        "We help you recover hacked or lost Facebook, Instagram, or other accounts with expert-level guidance and rapid response.",
      category: "Recovery",
      icon: "ShieldCheck",
      relatedIds: [2, 5],
      status: "expert",
      confidence: 90,
    },
    {
      id: 2,
      title: "Meta Rights Manager & Monetization",
      availablity: "available",
      content:
        "Support with Meta's Rights Manager, content ID claims, and eligibility issues for monetizing Facebook and Instagram content.",
      category: "Support",
      icon: "Globe2",
      relatedIds: [1, 3],
      status: "expert",
      confidence: 70,
    },
    {
      id: 3,
      title: "Cybersecurity Consultancy",
      availablity: "available",
      content:
        "We provide security audits and strategic advice for influencers and businesses to protect their digital brand presence.",
      category: "Consulting",
      icon: "MonitorSmartphone",
      relatedIds: [2, 4, 6],
      status: "expert",
      confidence: 75,
    },
    {
      id: 4,
      title: "Training & Mentorship",
      availablity: "available",
      content:
        "We mentor beginners and provide security awareness training to build foundational cybersecurity knowledge.",
      category: "Education",
      icon: "Users",
      relatedIds: [3, 5],
      status: "intermediate",
      confidence: 65,
    },
    {
      id: 5,
      title: "Emergency Cyber Support",
      availablity: "available",
      content:
        "Fast-response service for account breaches, impersonation, and digital threats. We're available 24/7 for emergencies.",
      category: "Emergency",
      icon: "AlertCircle",
      relatedIds: [1, 4, 6],
      status: "expert",
      confidence: 85,
    },
    {
      id: 6,
      title: "Privacy Setup for Social Platforms",
      availablity: "available",
      content:
        "We configure privacy and security settings across Facebook, Instagram, TikTok, and more to keep your data safe.",
      category: "Setup",
      icon: "Lock",
      relatedIds: [3, 5, 7],
      status: "intermediate",
      confidence: 60,
    },
    {
      id: 7,
      title: "DarkWeb Data & Risk Audit",
      availablity: "available",
      content:
        "Check if your data has been leaked on the dark web and receive a personalized risk audit to improve your defenses.",
      category: "Risk Analysis",
      icon: "Activity",
      relatedIds: [6, 8],
      status: "intermediate",
      confidence: 55,
    },
    {
      id: 8,
      title: "Online Reputation Management",
      availablity: "available",
      content:
        "We help remove fake content, improve your online visibility, and manage your digital footprint effectively.",
      category: "Reputation",
      icon: "UserCheck",
      relatedIds: [7],
      status: "expert",
      confidence: 68,
    },
  ];

  return (
    <div>
      <div id="service" className="text-center flex flex-col lg:flex-row items-center justify-center gap-2 mb-16 lg:px-30 py-20">
        <div>
          <h2 className="lg:text-6xl text-3xl font-bold text-white mb-6">
            Services I Provide
          </h2>
          <p className="sm:text-xl  text-gray-400 max-w-3xl mx-auto">
            Helping individuals and brands stay safe online through recovery,
            security setup, and expert guidance.
          </p>
        </div>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </div>
  );
};

export default ServicesSection;
