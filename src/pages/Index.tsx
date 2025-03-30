
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import BrochureSection from "../components/BrochureSection";
import LocationSection from "../components/LocationSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PricingSection from "../components/PricingSection";
import StickyCTA from "../components/StickyCTA";
import Footer from "../components/Footer";
import GameWheel from "../components/GameWheel";

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
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Floating CTAs */}
      <StickyCTA />
      
      {/* Gamified Lead Generation */}
      <GameWheel />
    </div>
  );
};

export default Index;
