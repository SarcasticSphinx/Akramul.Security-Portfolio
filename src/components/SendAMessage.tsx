"use client";
import React, { useState } from "react";
import Lottie from "lottie-react";
import { FiSend } from "react-icons/fi";
import SendMessage from "./SendMessage.json";

const SendAMessage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:digitx.comilla@gmail.com?subject=Message from ${formData.name}&body=${formData.message} (${formData.email})`;
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex justify-center items-center sm:px-30 px-6  gap-8 mb-20">
      <div className="h-full w-2/5 hidden sm:block overflow-hidden">
        <Lottie animationData={SendMessage} loop={true}  />
      </div>
      <div>
        <h1 className="text-3xl">Send A Message</h1>
        <p className="text-gray-400 text-base mt-2">
          Fill out the form below and I’ll get back to you as soon as possible.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 max-w-xl w-full z-99"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
          >
            <FiSend />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendAMessage;
