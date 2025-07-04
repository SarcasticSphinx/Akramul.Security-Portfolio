import React from "react";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline";

interface ServiceData {
  serviceId: number;
  title: string;
  availability: string;
  content: string;
  category: string;
  icon: string;
  relatedIds: string[];
  status: string;
  confidence: number;
}

const getServices = async (): Promise<ServiceData[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services`, {
    cache: "no-store", // or 'force-cache' if the data doesn't change often
  });

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
};

const ServicesSection = async () => {
  const timelineData = await getServices();

  return (
    <div>
      <div
        id="service"
        className="text-center flex flex-col lg:flex-row items-center justify-center gap-2 mb-16 lg:px-30 py-20"
      >
        <div className="text-center px-4 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Services I Provide
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl sm:max-w-3xl mx-auto">
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
