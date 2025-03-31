
import React, { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import emailjs from 'emailjs-com';

interface LeadFormProps {
  variant?: 'hero' | 'popup' | 'inline';
  onSuccess?: (data: FormData) => void;
  ctaText?: string;
}

const plotSizes = [
  "150 sq. yards",
  "210 sq. yards",
  "270 sq. yards"
];

const facingOptions = [
  "East Facing",
  "West Facing",
  "North Facing",
  "South Facing",
  "North-East Facing",
  "North-West Facing",
  "South-East Facing",
  "South-West Facing"
];

const budgetRanges = [
  "₹2 - 2.5 Crore",
  "₹2.5 - 3 Crore",
  "₹3 - 3.5 Crore",
  "₹3.5 - 4 Crore",
  "₹4 Crore+"
];

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
    phone: '',
    city: '',
    preference: ''
  });
  const [consentChecked, setConsentChecked] = useState(false);
  const [emailServiceInitialized, setEmailServiceInitialized] = useState(false);

  // Initialize EmailJS with your actual user ID
  useEffect(() => {
    emailjs.init("WKjHfDNX_5CvulN4n");
    setEmailServiceInitialized(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = async () => {
    try {
      const templateParams = {
        to_email: 'fabhomzoffcial@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        city: formData.city,
        preference: formData.preference,
        consent: consentChecked ? 'Yes' : 'No',
      };

      console.log("Sending email with params:", templateParams);

      const response = await emailjs.send(
        'service_zvk7ypk',
        'template_nj96gph',
        templateParams
      );

      console.log('Email sent successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!consentChecked) {
      toast({
        title: "Consent required",
        description: "Please agree to the privacy policy and consent to be contacted",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
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

    const emailSent = await sendEmail();
    
    setIsSubmitting(false);
    
    if (emailSent) {
      toast({
        title: "Success!",
        description: "Thank you for your interest in ATS Province D Olympia. Our team will contact you soon.",
      });
      
      if (onSuccess) {
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value);
        });
        formDataObj.append('consent', consentChecked.toString());
        onSuccess(formDataObj);
      }
      
      if (variant !== 'popup') {
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          preference: ''
        });
        setConsentChecked(false);
      }
    } else {
      toast({
        title: "Form submission error",
        description: "There was a problem submitting your form. Please try again later.",
        variant: "destructive"
      });
    }
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
        
        <div>
          <Input
            placeholder="City*"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <Textarea
            placeholder="Your Preferences (Size, Facing, Budget, etc.)*"
            name="preference"
            value={formData.preference}
            onChange={handleChange}
            className="w-full min-h-[80px]"
            required
          />
        </div>
        
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox 
            id="consent" 
            checked={consentChecked} 
            onCheckedChange={(checked) => setConsentChecked(checked === true)}
            className="mt-1"
          />
          <Label htmlFor="consent" className="text-xs text-muted-foreground font-normal leading-tight">
            I give my consent for the privacy policy to apply to the processing of the provided data. I give authority to the website owner and its representatives permission to contact me via phone, text, email, or whatsapp with its offers and products.
          </Label>
        </div>
        
        <Button 
          type="submit" 
          className={`w-full ${variant === 'hero' ? 'bg-estate-accent hover:bg-estate-accent/90' : 'bg-estate-primary hover:bg-estate-primary/90'}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : ctaText}
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;
