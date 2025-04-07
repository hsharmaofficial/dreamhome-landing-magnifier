
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { submitToGoogleForm } from '@/utils/googleFormSubmit';

const plotSizes = [
  "150 sq. yards",
  "210 sq. yards",
  "270 sq. yards"
];

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plotSize: '',
    city: 'Greater Noida' // Add default city value
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if we've shown the popup in this session already
    const hasShownPopup = sessionStorage.getItem('exitPopupShown');
    
    if (hasShownPopup) return;
    
    let timeoutId: number;
    let hasLeftPage = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving toward the top of the page
      if (e.clientY < 20 && !hasLeftPage) {
        hasLeftPage = true;
        timeoutId = window.setTimeout(() => {
          setOpen(true);
          sessionStorage.setItem('exitPopupShown', 'true');
        }, 500);
      }
    };

    // Add listener after a delay to avoid immediate triggering
    const initialDelay = window.setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 30000); // 30-second delay before enabling the exit intent
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeoutId);
      clearTimeout(initialDelay);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      plotSize: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate phone number (Indian format)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.phone)) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid 10-digit Indian mobile number",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Submit to Google Form
      const success = await submitToGoogleForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city, // Include the city field
        preference: `Preferred Plot Size: ${formData.plotSize}. Request for Free Site Visit with Pick-and-Drop.`,
        consent: true
      });
      
      if (success) {
        toast({
          title: "Success!",
          description: "Thank you! We'll contact you soon to schedule your free site visit.",
        });
        setOpen(false);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-estate-primary">
            Wait—Claim Your Free Site Visit & Complimentary Pick-and-Drop!
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground text-center mb-6">
            Schedule a no-obligation site visit today. We'll pick you up and drop you back—on us.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="plotSize">Preferred Plot Size</Label>
              <Select onValueChange={handleSelectChange} value={formData.plotSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Plot Size" />
                </SelectTrigger>
                <SelectContent>
                  {plotSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-estate-secondary hover:bg-estate-secondary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Claim My Free Site Visit"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
