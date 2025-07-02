import Banner from "@/components/Banner";
import React from "react";
import EducationAndCertification from "../../components/EducationAndCertification";
import ExperienceSection from "@/components/ExperienceSection";
import ServicesSection from "../../components/ServicesSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "../../components/ContactSection";
import SendAMessage from "@/components/SendAMessage";
import { Articles } from "@/components/Articles";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <EducationAndCertification />
      <ExperienceSection />
      <ServicesSection />
      <Articles/>
      <Testimonials />
      <ContactSection />
      <SendAMessage/>
    </div>
  );
};

export default HomePage;
