
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import BrochureSection from "../components/BrochureSection";
import LocationSection from "../components/LocationSection";
import PricingSection from "../components/PricingSection";
import StickyCTA from "../components/StickyCTA";
import Footer from "../components/Footer";

const Index = () => {
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Brochure Download Section */}
      <BrochureSection />
      
      {/* Location Section */}
      <LocationSection />
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Floating CTAs */}
      <StickyCTA />
    </div>
  );
};

export default Index;
