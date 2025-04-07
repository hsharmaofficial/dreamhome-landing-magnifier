
import React, { useState, useEffect } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import LeadForm from './LeadForm';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600";
    img.onload = () => setImageLoaded(true);
    img.onerror = (err) => {
      console.error("Failed to load hero image:", err);
      setImageLoaded(true); // Still set to true to show fallback
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Loading State */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-estate-primary/30">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-estate-secondary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600"
            alt="ATS Province D Olympia - Premium Residential Plots in Sector 22D, Yamuna Expressway"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error("Error loading hero image:", e);
              const imgElement = e.currentTarget;
              imgElement.style.display = 'none';
            }}
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left w-full lg:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              ATS Homekraft Province D Olympia – Premium Residential Plots in Sector 22D, Yamuna Expressway
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl mx-auto lg:mx-0">
              Premium Residential Plots at Yamuna Expressway, Sector 22D, Starting from 150 sq. yards. RERA approved plots at only ₹1.3 Lakh/SqYd.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <span className="bg-estate-secondary w-2 h-2 rounded-full mr-2"></span>
                <span className="text-white text-sm">RERA Approved Project</span>
              </div>
              
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <span className="bg-estate-secondary w-2 h-2 rounded-full mr-2"></span>
                <span className="text-white text-sm">14+ Elite Recreation Spaces</span>
              </div>
              
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <span className="bg-estate-secondary w-2 h-2 rounded-full mr-2"></span>
                <span className="text-white text-sm">12+ Wellness Spaces</span>
              </div>
              
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <span className="bg-estate-secondary w-2 h-2 rounded-full mr-2"></span>
                <span className="text-white text-sm">24×7 Security</span>
              </div>
              
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <span className="bg-estate-secondary w-2 h-2 rounded-full mr-2"></span>
                <span className="text-white text-sm">Near Jewar Airport</span>
              </div>
              
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <span className="bg-estate-secondary w-2 h-2 rounded-full mr-2"></span>
                <span className="text-white text-sm">ATS Group Project</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-5/12"
          >
            <LeadForm variant="hero" />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </div>
  );
};

export default HeroSection;
