
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LeadForm from './LeadForm';
import { toast } from "@/components/ui/use-toast";

const rewards = [
  "₹50,000 Discount",
  "₹25,000 Discount",
  "Site Visit",
  "₹10,000 Discount",
  "Free Consultation",
  "₹15,000 Discount"
];

const GameWheel = () => {
  const [open, setOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [reward, setReward] = useState('');
  const [hasSpun, setHasSpun] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [pricingSectionVisited, setPricingSectionVisited] = useState(false);

  // Show wheel popup based on initial load only
  useEffect(() => {
    // Create a flag in sessionStorage to track if we've shown the popup
    const hasShownInitialPopup = sessionStorage.getItem('hasShownInitialPopup');
    
    // Show on initial load if not already shown
    if (!hasShownInitialPopup && !open && !hasSpun) {
      setTimeout(() => {
        setOpen(true);
        // Mark that we've shown the initial popup
        sessionStorage.setItem('hasShownInitialPopup', 'true');
      }, 3000);
    }
    
    // Monitor scrolling to check if pricing section is visited
    const handleScroll = () => {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        // If pricing section is in view and we haven't shown the popup for it yet
        if (rect.top < window.innerHeight && rect.bottom >= 0 && 
            !hasSpun && !open && !pricingSectionVisited) {
          setPricingSectionVisited(true);
          setTimeout(() => {
            setOpen(true);
          }, 2000);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasSpun, open, pricingSectionVisited]);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowForm(false);
    
    // Random angle between 720-1080 degrees + offset to land on a specific segment
    const segmentAngle = 360 / rewards.length;
    const randomSegment = Math.floor(Math.random() * rewards.length);
    const segmentOffset = segmentAngle * randomSegment;
    const randomRotation = 720 + Math.floor(Math.random() * 360) + segmentOffset;
    
    // Get the reward based on where wheel lands
    const landedRewardIndex = Math.floor(((randomRotation % 360) / 360) * rewards.length);
    const selectedReward = rewards[landedRewardIndex];
    
    setRotation(randomRotation);
    setReward(selectedReward);
    
    // After wheel stops spinning
    setTimeout(() => {
      setIsSpinning(false);
      setShowForm(true);
    }, 5000); // Match this to the animation duration
  };

  const handleFormSuccess = () => {
    // Show coupon with reward
    setShowCoupon(true);
    setHasSpun(true);
    
    setTimeout(() => {
      toast({
        title: "Congratulations!",
        description: `Your reward of ${reward} has been emailed to you.`,
      });
    }, 500);
  };

  const closeDialog = () => {
    setOpen(false);
    setShowForm(false);
    setShowCoupon(false);
    setRotation(0);
  };

  // Generate segment styles
  const generateSegmentStyles = () => {
    const segmentAngle = 360 / rewards.length;
    let styles = '';
    
    rewards.forEach((_, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      
      // Alternate segment colors for better visibility
      const color = index % 2 === 0 ? '#2F8F5F' : '#3DA373';
      
      styles += `
        .segment-${index} {
          position: absolute;
          width: 100%;
          height: 100%;
          clip-path: polygon(50% 50%, ${getCoords(startAngle)}, ${getCoords(startAngle + 1)}, 
            ${getCoords(endAngle - 1)}, ${getCoords(endAngle)}, 50% 50%);
          background-color: ${color};
        }
      `;
    });
    
    return <style>{styles}</style>;
  };
  
  // Helper function to get coordinates on the circle edge
  const getCoords = (angle) => {
    const radians = (angle * Math.PI) / 180;
    const x = 50 + 50 * Math.cos(radians);
    const y = 50 + 50 * Math.sin(radians);
    return `${x}% ${y}%`;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-estate-primary">
              {showCoupon ? "Congratulations! 🎉" : "Spin & Win!"}
            </DialogTitle>
            {!showCoupon && (
              <DialogDescription className="text-center">
                Spin the wheel for a chance to win exclusive offers on your booking!
              </DialogDescription>
            )}
          </DialogHeader>
          
          {showCoupon ? (
            <div className="py-4">
              <div className="bg-estate-secondary/10 p-6 rounded-xl border-2 border-dashed border-estate-secondary text-center">
                <div className="bg-estate-secondary text-white py-2 px-4 rounded-full text-sm font-bold inline-block mb-4">
                  REWARD COUPON
                </div>
                <h3 className="text-3xl font-bold text-[#2F8F5F] mb-2">
                  {reward}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use this coupon when you book your plot at ATS Province D Olympia
                </p>
                
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <p className="text-lg font-mono font-bold tracking-wider text-[#2F8F5F]">
                    ATS{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  *Terms & conditions apply. Valid for 30 days from issue date.
                </p>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={closeDialog}
                  className="bg-[#2F8F5F] hover:bg-[#2F8F5F]/90"
                >
                  Continue Browsing
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-4">
              {showForm ? (
                <div className="py-4">
                  <p className="text-center text-lg font-semibold text-[#2F8F5F] mb-6">
                    You won: <span className="text-estate-secondary">{reward}</span>
                  </p>
                  <p className="text-muted-foreground mb-6 text-center text-sm">
                    Fill in your details to claim your reward.
                  </p>
                  <LeadForm 
                    variant="popup" 
                    ctaText="Claim Your Reward"
                    onSuccess={handleFormSuccess}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center py-6">
                  <div className="relative w-64 h-64 mb-8">
                    {/* Wheel segments generated dynamically */}
                    {generateSegmentStyles()}
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <motion.div 
                        className="w-full h-full rounded-full overflow-hidden relative"
                        animate={{ 
                          rotate: rotation 
                        }}
                        transition={{ 
                          duration: 5,
                          ease: "easeOut" 
                        }}
                      >
                        {/* Render segments */}
                        {rewards.map((_, index) => (
                          <div key={index} className={`segment-${index}`} />
                        ))}
                        
                        {/* Segment Text */}
                        {rewards.map((reward, index) => {
                          const angle = (index * 360) / rewards.length + 360 / rewards.length / 2;
                          return (
                            <div 
                              key={`text-${index}`}
                              className="absolute w-full text-center top-6 left-0 right-0 text-white font-semibold text-sm"
                              style={{ 
                                transform: `rotate(${angle}deg)`,
                                transformOrigin: 'center 8rem'
                              }}
                            >
                              {reward}
                            </div>
                          );
                        })}
                      </motion.div>
                    </div>
                    
                    {/* Wheel Center */}
                    <div className="absolute w-6 h-6 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg border-2 border-[#2F8F5F]"></div>
                    
                    {/* Pointer */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M15 0L30 30H0L15 0Z" fill="#E94560" />
                      </svg>
                    </div>
                  </div>
                  
                  <Button 
                    size="lg"
                    onClick={spinWheel}
                    disabled={isSpinning}
                    className="bg-estate-accent hover:bg-estate-accent/90 animate-pulse"
                  >
                    {isSpinning ? "Spinning..." : "SPIN NOW"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GameWheel;
