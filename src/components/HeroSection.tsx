
import React, { useState, useEffect } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import LeadForm from './LeadForm';
import { motion } from 'framer-motion';

// Higher quality hero images with better loading strategy
const heroImages = [
  "https://images.unsplash.com/photo-1637559460151-2913c59c290b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=1200&auto=format&fit=crop",
];

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = heroImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = (err) => {
            console.error("Failed to load image:", src, err);
            reject(err);
          };
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
          setLoadError(false);
        })
        .catch(err => {
          console.error("Failed to preload images:", err);
          setLoadError(true);
          // Set images as loaded even if there's an error, so we can show fallback
          setImagesLoaded(true);
        });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Slider with Loading State */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-estate-primary/30">
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-estate-secondary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {loadError && imagesLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-estate-primary to-estate-primary/70">
            {/* Fallback background if images fail to load */}
          </div>
        )}
        
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              imagesLoaded && index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img
              src={image}
              alt={`ATS Province D Olympia - Image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              onError={(e) => {
                console.error(`Error loading image ${index}:`, e);
                const imgElement = e.currentTarget;
                imgElement.style.display = 'none';
              }}
            />
          </div>
        ))}
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
              Build Your Dream Home at 
              <span className="block text-gradient bg-gradient-to-r from-estate-secondary to-white">
                ATS Province D Olympia
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl mx-auto lg:mx-0">
              Premium Residential Plots at Yamuna Expressway, Sector 22D, Starting from 150 sq. yards.
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
