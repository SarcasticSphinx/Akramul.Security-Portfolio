"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import { CgFileAdd } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import axiosInstance from "@/lib/axios";

export function AnimatedModalDemo() {
  const [totalTestimonials, setTotalTestimonials] = useState(0);
  const [formData, setFormData] = useState({
    testimonialId: totalTestimonials,
    name: "",
    company: "",
    profilePic: "",
    testimonial: "",
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosInstance.get("/testimonials");
        setTotalTestimonials(response.data.length + 1);
      } catch (error) {
        console.error("Failed to fetch testimonials count", error);
      }
    };
    fetchTestimonials();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submission = {
      ...formData,
      testimonialId: totalTestimonials,
    };

    try {
      await axiosInstance.post("/testimonials", submission);
      console.log("Testimonial submitted:", submission);
      window.location.reload()
      setFormData({
        name: "",
        company: "",
        profilePic: "",
        testimonial: "",
        testimonialId: 0,
      });
    } catch (error) {
      console.log("Something went wrong submitting testimonial", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn text-sm">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Submit a review on Me
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <CgFileAdd className="text-black size-6" />
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Submit a review on{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Akramul.Security
              </span>
            </h4>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Testimonial Preview */}
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-medium mb-4">Preview</h3>
                <TestimonialCard
                  profilePic={formData.profilePic}
                  quote={formData.testimonial}
                  name={formData.name}
                  company={formData.company}
                />
              </div>

              {/* Form */}
              <div className="w-full md:w-1/2">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      placeholder="Name"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium mb-1"
                    >
                      Your Company and Designation
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      placeholder="Your Designation, Company"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="profilePic"
                      className="block text-sm font-medium mb-1"
                    >
                      Profile Picture URL
                    </label>
                    <input
                      type="text"
                      id="profilePic"
                      name="profilePic"
                      placeholder="Enter the url only"
                      value={formData.profilePic}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="testimonial"
                      className="block text-sm font-medium mb-1"
                    >
                      Your Testimonial
                    </label>
                    <textarea
                      id="testimonial"
                      name="testimonial"
                      value={formData.testimonial}
                      onChange={handleChange}
                      placeholder="Write what you think about me and my work"
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              type="button"
              className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
            >
              Submit
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

// ... (keep all your existing icon components)

interface TestimonialCardProps {
  quote: string;
  name: string;
  company: string;
  profilePic: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  profilePic,
  company,
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-100 p-6 shadow-md max-w-md mx-auto relative cut-corner min-h-60 ${className}`}
    >
      {profilePic ? (
        <img
          src={profilePic}
          alt="Client Profile pic"
          className="size-12 object-cover mb-4"
        />
      ) : (
        <FaUser className="text-black size-6 m-2 mb-6" />
      )}
      <blockquote className="text-md font-semibold italic text-gray-800 mb-4">
        &quot;{quote}&quot;
      </blockquote>
      <div className="text-sm text-gray-600">
        <p>
          —{" "}
          <span className="font-medium">
            {name}
            {company && ", "}
          </span>{" "}
          {company?.split(",").join(" at ")}
        </p>
      </div>
    </div>
  );
};
