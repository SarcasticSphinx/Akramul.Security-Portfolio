import React from "react";
import { StaggerTestimonials } from "./ui/stagger-testimonials";
import { AnimatedModalDemo } from "./AddTestimonial";

const Testimonials = () => {
  return (
    <div
      id="testimonial"
      className="flex flex-col w-full min-h-screen justify-center items-center  py-20"
    >
      <div className="text-center mb-12 sm:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
          What Clients Say
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl sm:max-w-3xl mx-auto">
          Real stories from satisfied clients who trust our solutions and
          support
        </p>
      </div>

      <AnimatedModalDemo />

      <StaggerTestimonials />
    </div>
  );
};

export default Testimonials;
