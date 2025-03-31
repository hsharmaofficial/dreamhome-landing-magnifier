
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Gift, Tag } from 'lucide-react'; // Changed Discount to Tag
import LeadForm from './LeadForm';
import { toast } from "@/components/ui/use-toast";

const offers = [
  "₹50,000 Off on Booking",
  "Site Visit with Return Cab",
  "Exclusive Floor Plan Access",
  "VIP Plot Selection Priority",
  "Special Payment Plan"
];

const LeadPopup = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'initial' | 'form' | 'success'>('initial');
  const [selectedOffer, setSelectedOffer] = useState('');
  const [pricingSectionVisited, setPricingSectionVisited] = useState(false);

  // Show popup based on user behavior
  useEffect(() => {
    // Create a flag in sessionStorage to track if we've shown the popup
    const hasShownInitialPopup = sessionStorage.getItem('hasShownInitialPopup');
    
    // Show on initial load if not already shown
    if (!hasShownInitialPopup && !open) {
      setTimeout(() => {
        setOpen(true);
        setStep('initial');
        // Mark that we've shown the initial popup
        sessionStorage.setItem('hasShownInitialPopup', 'true');
      }, 5000); // Increased delay to let user see the site first
    }
    
    // Monitor scrolling to check if pricing section is visited
    const handleScroll = () => {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        // If pricing section is in view and we haven't shown the popup for it yet
        if (rect.top < window.innerHeight && rect.bottom >= 0 && 
            !open && !pricingSectionVisited && 
            !sessionStorage.getItem('pricingSectionPopupShown')) {
          setPricingSectionVisited(true);
          sessionStorage.setItem('pricingSectionPopupShown', 'true');
          setTimeout(() => {
            setOpen(true);
            setStep('initial');
          }, 2000);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [open, pricingSectionVisited]);

  const handleSelectOffer = (offer: string) => {
    setSelectedOffer(offer);
    setStep('form');
  };

  const handleFormSuccess = () => {
    setStep('success');
    
    setTimeout(() => {
      toast({
        title: "Congratulations!",
        description: `Your ${selectedOffer} has been reserved. Our team will contact you soon.`,
      });
    }, 500);
  };

  const closeDialog = () => {
    setOpen(false);
    setTimeout(() => {
      setStep('initial');
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-center text-2xl font-bold text-estate-primary flex-1">
              {step === 'success' ? "Congratulations! 🎉" : "Exclusive Limited Time Offers"}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 rounded-full" onClick={closeDialog}>
                <X size={18} />
              </Button>
            </DialogClose>
          </div>
          {step === 'initial' && (
            <DialogDescription className="text-center">
              Choose one of these special offers available only for a limited time!
            </DialogDescription>
          )}
        </DialogHeader>
        
        <AnimatePresence mode="wait">
          {step === 'initial' && (
            <motion.div 
              key="offers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-2 space-y-3"
            >
              {offers.map((offer, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-estate-primary/10 to-estate-primary/5 p-4 rounded-lg border border-estate-primary/20 hover:border-estate-primary cursor-pointer transition-colors"
                  onClick={() => handleSelectOffer(offer)}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-estate-primary rounded-full p-2 text-white">
                      <Tag size={18} /> {/* Changed from Discount to Tag */}
                    </div>
                    <div>
                      <h3 className="font-medium text-estate-primary">{offer}</h3>
                      <p className="text-sm text-muted-foreground">
                        {index % 2 === 0 ? "Limited slots available" : "Offer ends soon"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {step === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-2"
            >
              <div className="mb-4 p-3 bg-estate-primary/10 rounded-lg text-center">
                <p className="text-estate-primary font-medium">
                  You selected: <span className="font-bold">{selectedOffer}</span>
                </p>
              </div>
              <LeadForm 
                variant="popup" 
                ctaText="Claim Your Offer"
                onSuccess={handleFormSuccess}
              />
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <div className="mx-auto bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <Gift className="h-10 w-10 text-estate-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-estate-primary mb-2">
                Your Offer is Reserved!
              </h3>
              
              <div className="bg-estate-primary/10 border border-estate-primary/20 p-4 rounded-xl mb-6 mt-4">
                <p className="text-lg font-medium text-estate-primary">
                  {selectedOffer}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Reference: ATS{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Our team will contact you shortly to help you avail this exclusive offer.
              </p>
              
              <Button 
                onClick={closeDialog}
                className="bg-estate-primary hover:bg-estate-primary/90"
              >
                Continue Browsing
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default LeadPopup;
