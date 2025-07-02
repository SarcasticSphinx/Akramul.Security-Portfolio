"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import { ArrowRight } from "lucide-react";
// import { InteractiveHoverButton } from "./ui/interactive-hover-button";

export function MyStoryModal() {
  return (
    <div className="flex items-center">
      <Modal>
        <ModalTrigger className="relative bg-black dark:bg-white dark:text-black text-white flex items-center  overflow-hidden group/modal-btn h-12 px-6 font-bold border-2 border-transparent hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 text-sm rounded-full">
          {/* Text that slides out */}
          <span className="group-hover/modal-btn:-translate-y-full opacity-100 group-hover/modal-btn:opacity-0 transform transition-all duration-500 ease-in-out">
            My Story
          </span>

          {/* Icon that slides in */}
          <div className="absolute inset-0 flex items-center justify-center transform translate-y-full group-hover/modal-btn:translate-y-0 transition-all duration-500 ease-in-out">
            <span>Let&apos;s Go!</span>
            <ArrowRight className="text-white dark:text-black size-6" />
          </div>

          {/* Glow effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover/modal-btn:opacity-20 transition-opacity duration-300"></span>

          {/* Ripple effect (will be added via JavaScript in reality) */}
          <span className="absolute bg-white opacity-30 rounded-full scale-0 group-hover/modal-btn:scale-100 transition-transform duration-700 w-64 h-64"></span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
              My Story
            </h2>
            <div className="text-neutral-800 dark:text-neutral-300 text-sm md:text-base leading-6 space-y-4">
              <span className="block mb-4">
                Ever since I was a teenager growing up in Cumilla, Bangladesh, I
                found myself drawn to the hidden world of technology —
                especially the parts most people don’t see. While others were
                browsing the internet casually, I was curious about how systems
                work, how they break, and more importantly, how to protect them.
              </span>
              <span className="block mb-4">
                That curiosity slowly transformed into passion. I pursued a
                Diploma in Computer Engineering and later stepped deeper into
                the world of cybersecurity, where I discovered my true calling —
                defending the digital world.
              </span>
              <span className="block mb-4">
                One of the most defining moments of my journey was completing a
                SOC Analyst internship at D-Codes Lab, where I learned how
                real-time threats are detected and mitigated. I didn’t stop
                there. I had the privilege of assisting my mentor, Arif
                Muhyuddin, in conducting cybersecurity and criminology training
                for the Bangladesh Police, helping them understand the digital
                battlefield that lies behind cybercrime.
              </span>
              <span className="block mb-4">
                Over time, I began helping individuals and businesses secure
                their online presence. From recovering hacked Facebook pages to
                giving strategic guidance on platform protection — I realized
                that cybersecurity is not just a profession for me; it&apos;s a
                responsibility.
              </span>
              <span className="block">
                To take this mission even further, I founded{" "}
                <strong>DigitX</strong> — a growing initiative aimed at
                providing accessible and reliable cybersecurity solutions to
                people and businesses who need them most.
              </span>
              <span className="block mt-4">
                This is more than a job. It’s my story, my mission, and my way
                of giving back in the age of digital chaos.
              </span>
            </div>
          </ModalContent>
          <ModalFooter>
            {/* If your modal library provides a ModalClose, use it here instead */}
            <button
              type="button"
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md border border-black text-sm"
              // onClick={() => modalRef.current?.close()} // Use your modal's close method if needed
              data-modal-close // If your modal lib supports data attributes for closing
            >
              Close
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
