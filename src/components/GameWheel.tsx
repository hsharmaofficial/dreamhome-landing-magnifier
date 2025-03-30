
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

  // Show wheel popup based on exit intent or timer
  useEffect(() => {
    // Show after 30 seconds if not shown before
    const timer = setTimeout(() => {
      if (!hasSpun && !open) {
        setOpen(true);
      }
    }, 30000);
    
    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasSpun && !open) {
        setOpen(true);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasSpun, open]);

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
                  <div className="relative w-64 h-64 mb-8">
                    {/* Wheel Center Peg */}
                    <div className="absolute w-6 h-6 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg border-2 border-estate-primary"></div>
                    
                    {/* Spinner */}
                    <motion.div 
                      className="w-full h-full rounded-full overflow-hidden relative"
                      style={{ 
                        background: `conic-gradient(
                          #0F3460 0%,
                          #B8973D 16.6%,
                          #1A1A2E 33.2%,
                          #E94560 49.8%,
                          #0F3460 66.4%,
                          #B8973D 83%,
                          #1A1A2E 100%
                        )` 
                      }}
                      animate={{ 
                        rotate: rotation 
                      }}
                      transition={{ 
                        duration: 5,
                        ease: "easeOut" 
                      }}
                    >
                      {rewards.map((reward, index) => {
                        const angle = (index * 360) / rewards.length;
                        return (
                          <div 
                            key={index}
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
