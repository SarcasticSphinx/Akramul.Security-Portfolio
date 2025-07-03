"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { FiMail, FiPhone, FiMapPin, FiDownload } from "react-icons/fi";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";

const ContactSection = () => {
  return (
    <div
      id="contact"
      className="w-full bg-slate-950 py-12 px-4 sm:px-6 lg:px-30 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col-reverse sm:flex-row  justify-between items-center gap-20"
        >
          {/* Left Column - Contact Info */}
          <div className="z-99 flex flex-col justify-center sm:h-screen px-4 pb-20 sm:pb-0 sm:px-0 w-fit">
            <h1 className="text-2xl md:text-3xl whitespace-nowrap">
              Contact Informations
            </h1>

            <motion.div
              className="space-y-6 my-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* Email */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-2 bg-gray-900 rounded-lg text-white">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Email</h3>
                  <a
                    href="mailto:digitx.comilla@gmail.com"
                    className="text-white hover:text-blue-400 transition-colors break-all"
                  >
                    digitx.comilla@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-2 bg-gray-900 rounded-lg text-white">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Phone</h3>
                  <a
                    href="tel:+8801690203446"
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    +8801690203446
                  </a>
                </div>
              </div>

              {/* Resume */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-2 bg-gray-900 rounded-lg text-white">
                  <FiDownload className="text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Resume</h3>
                  <a
                    href="/cv.pdf"
                    download
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    Download My CV
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-2 bg-gray-900 rounded-lg text-white">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Location</h3>
                  <p className="text-white">Cumilla, Bangladesh</p>
                </div>
              </div>
            </motion.div>

            <hr className="w-3/4" />
            <div className="flex space-x-6 text-gray-700 dark:text-gray-300 mt-8">
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
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-pink-400"
              >
                <BsInstagram size={24} />
              </Link>
              <Link
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-blue-600"
              >
                <BsFacebook size={24} />
              </Link>
            </div>
          </div>

          {/* Right Column - Contact Form inside LampContainer */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="w-full h-[85vh] sm:h-screen"
          >
            <LampContainer>
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white text-5xl font-bold text-center"
              >
                Let&apos;s Connect
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gray-300 text-lg mt-2 text-center max-w-xl mx-auto"
              >
                I&apos;m open to freelance work, collaborations, or just a
                friendly hello.
              </motion.p>
            </LampContainer>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
