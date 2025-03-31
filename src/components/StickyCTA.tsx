
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import LeadForm from './LeadForm';
import { MessageSquare, Phone } from 'lucide-react';

// Phone number used throughout the component
const PHONE_NUMBER = '+918420595900';
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER.replace(/\+/g, '')}?text=I'm%20interested%20in%20ATS%20Province%20D%20Olympia`;

const StickyCTA = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        {/* WhatsApp Button */}
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare size={24} />
        </motion.a>
        
        {/* Enquire Now Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={() => setOpenDialog(true)}
            className="bg-estate-accent hover:bg-estate-accent/90 text-white px-6 py-6 rounded-full shadow-lg flex items-center font-semibold"
          >
            <Phone size={20} className="mr-2" />
            Enquire Now
          </Button>
        </motion.div>
      </div>
      
      {/* Mobile bottom bar - only shows on mobile */}
      <AnimatePresence>
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-between items-center z-40 md:hidden shadow-lg"
        >
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex-1 flex items-center justify-center p-2 rounded-l-lg bg-estate-primary text-white"
          >
            <Phone size={18} className="mr-2" />
            Call Now
          </a>
          <Button 
            onClick={() => setOpenDialog(true)}
            className="flex-1 bg-estate-accent hover:bg-estate-accent/90 rounded-r-lg"
          >
            Enquire Now
          </Button>
        </motion.div>
      </AnimatePresence>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-estate-primary">
              Enquire Now
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-muted-foreground mb-6 text-center">
              Fill in your details, and our expert team will contact you shortly.
            </p>
            <LeadForm 
              variant="popup" 
              ctaText="Submit Enquiry"
              onSuccess={() => setOpenDialog(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StickyCTA;
