
import React, { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface LeadFormProps {
  variant?: 'hero' | 'popup' | 'inline';
  onSuccess?: (data: FormData) => void;
  ctaText?: string;
}

const LeadForm = ({ 
  variant = 'inline', 
  onSuccess, 
  ctaText = "Download Brochure & Floor Plans" 
}: LeadFormProps) => {
  const isMobile = useIsMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate phone number (basic validation for Indian numbers)
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

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: "Thank you for your interest in ATS Province D Olympia. Our team will contact you soon.",
      });
      
      if (onSuccess) {
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value);
        });
        onSuccess(formDataObj);
      }
      
      // Reset form if not in a multi-step flow
      if (variant !== 'popup') {
        setFormData({
          name: '',
          email: '',
          phone: ''
        });
      }
    }, 1500);
  };

  const formClasses = {
    hero: 'bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-2xl w-full max-w-md',
    popup: 'w-full max-w-md',
    inline: 'bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-muted'
  };

  return (
    <form onSubmit={handleSubmit} className={formClasses[variant]}>
      {variant === 'hero' && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-estate-primary mb-1">Get Exclusive Details</h3>
          <p className="text-sm text-muted-foreground">Premium plots starting from 150 sq. yards</p>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <Input
            placeholder="Your Name*"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Email Address*"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <Input
            type="tel"
            placeholder="Phone Number*"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className={`w-full ${variant === 'hero' ? 'bg-estate-accent hover:bg-estate-accent/90' : 'bg-estate-primary hover:bg-estate-primary/90'}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : ctaText}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground pt-2">
          By submitting, you agree to our <a href="#" className="underline">privacy policy</a> and consent to receive updates.
        </p>
      </div>
    </form>
  );
};

export default LeadForm;
