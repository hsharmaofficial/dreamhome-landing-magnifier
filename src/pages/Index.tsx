
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import BrochureSection from "../components/BrochureSection";
import LocationSection from "../components/LocationSection";
import PricingSection from "../components/PricingSection";
import TestimonialsSection from "../components/TestimonialsSection";
import StickyCTA from "../components/StickyCTA";
import Footer from "../components/Footer";
import ExitIntentPopup from "../components/ExitIntentPopup";

const Index = () => {
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
    
    // Add canonical URL for SEO
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = 'https://atshomekraftplot.com/ats-province-d-olympia-sector-22d';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
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
      
      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
