"use client";
import React from "react";
import Image from "next/image";
import RotatingText from "./ui/RotatingText/RotatingText";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="px-4 md:px-30 h-[92vh] flex flex-col sm:flex-row sm:items-center relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start h-full sm:w-1/2 relative border-b border-white sm:border-none">
        <div className="absolute top-40 z-10 flex flex-col gap-4">
          <h1 className="font-poppins font-extrabold text-5xl md:text-7xl ">
            Akramul <br /> Islam
          </h1>
          <hr />
          <div className="flex space-x-6 text-gray-700 dark:text-gray-300">
            <Link
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-black dark:hover:text-white"
            >
              <BsGithub size={24} />
            </Link>
            <Link
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-gray-700"
            >
              <BsTwitterX size={24} />
            </Link>
            <Link
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-400"
            >
              <BsLinkedin size={24} />
            </Link>
            <Link
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-400"
            >
              <BsInstagram size={24} />
            </Link>
            <Link
              href="https://facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-600"
            >
              <BsFacebook size={24} />
            </Link>
          </div>
        </div>
        <Image
          src={"/Hero.png"}
          alt="Hero Image"
          width={450}
          height={200}
          className="absolute left-15 sm:left-50 bottom-0 sm:top-15"
        />
      </div>
      {/* Right-Side */}
      <div className="flex flex-col justify-center gap-4 text-3xl md:text-5xl sm:w-1/2 z-50">
        <h1>I am a </h1>
        <RotatingText
          texts={[
            "Cybersecurity Expert",
            "Ethical Hacker",
            "Digital Forensics Specialist",
          ]}
          mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 w-fit rounded-lg"
          staggerFrom="last"
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          rotationInterval={3000}
        />
        <p className="text-sm">
          Dedicated cybersecurity professional from Cumilla, Bangladesh with
          expertise in identifying, analyzing, and mitigating security threats
          across digital landscapes. Combining technical precision with
          strategic insight to protect organizational assets and data integrity.
        </p>
        <InteractiveHoverButton text="My Story" className="text-sm" />
      </div>

      {/* Left-Side */}
    </div>
  );
};

export default Banner;