
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
            !hasSpun && !open && !pricingSectionVisited && 
            !sessionStorage.getItem('pricingSectionPopupShown')) {
          setPricingSectionVisited(true);
          sessionStorage.setItem('pricingSectionPopupShown', 'true');
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
    const landedRewardIndex = rewards.length - 1 - Math.floor(((randomRotation % 360) / 360) * rewards.length);
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
                <h3 className="text-3xl font-bold text-estate-primary mb-2">
                  {reward}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use this coupon when you book your plot at ATS Province D Olympia
                </p>
                
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <p className="text-lg font-mono font-bold tracking-wider text-estate-primary">
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
                  className="bg-estate-primary hover:bg-estate-primary/90"
                >
                  Continue Browsing
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-4">
              {showForm ? (
                <div className="py-4">
                  <p className="text-center text-lg font-semibold text-estate-primary mb-6">
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
                  {/* Improved Wheel Design */}
                  <div className="relative w-64 h-64 mb-8">
                    <div className="absolute w-full h-full rounded-full border-4 border-estate-primary overflow-hidden">
                      <motion.div 
                        className="w-full h-full relative"
                        animate={{ 
                          rotate: rotation 
                        }}
                        transition={{ 
                          duration: 5,
                          ease: "easeOut" 
                        }}
                      >
                        {/* Wheel segments */}
                        {rewards.map((_, index) => {
                          const rotation = index * (360 / rewards.length);
                          const isEven = index % 2 === 0;
                          return (
                            <div 
                              key={index}
                              className={`absolute w-full h-full origin-center`}
                              style={{ 
                                transform: `rotate(${rotation}deg)`,
                                clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos(Math.PI / rewards.length)}% ${50 - 50 * Math.sin(Math.PI / rewards.length)}%)`,
                                background: isEven ? '#2F8F5F' : '#3DA373',
                                zIndex: rewards.length - index
                              }}
                            />
                          )
                        })}
                        
                        {/* Reward Text - Positioned clearly on each segment */}
                        {rewards.map((reward, index) => {
                          const angle = index * (360 / rewards.length);
                          const textAngle = angle + (360 / rewards.length) / 2;
                          const radians = (textAngle - 90) * (Math.PI / 180);
                          const x = 50 + 35 * Math.cos(radians);
                          const y = 50 + 35 * Math.sin(radians);
                          
                          return (
                            <div
                              key={`text-${index}`}
                              className="absolute text-white font-bold text-sm"
                              style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: `translate(-50%, -50%) rotate(${textAngle}deg)`,
                                width: '80px',
                                textAlign: 'center',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                              }}
                            >
                              {reward}
                            </div>
                          );
                        })}
                      </motion.div>
                    </div>
                    
                    {/* Center dot */}
                    <div className="absolute w-8 h-8 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 shadow-md border-2 border-estate-primary flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-estate-secondary"></div>
                    </div>
                    
                    {/* Pointer */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
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
