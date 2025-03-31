
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import LeadForm from './LeadForm';
import { Calculator, Phone } from 'lucide-react';

const plotSizes = [
  {
    size: "150 sq. yards",
    price: "₹2.10 Crore*",
    features: ["Corner Plots Available", "Park Facing Options", "Flexible Payment Plans"]
  },
  {
    size: "210 sq. yards",
    price: "₹2.94 Crore*",
    features: ["Premium Location", "Corner Plots Available", "Park Facing Options", "Flexible Payment Plans"],
    highlight: true
  },
  {
    size: "270 sq. yards",
    price: "₹3.78 Crore*",
    features: ["Premium Location", "Corner Plots Available", "Park Facing Options", "Flexible Payment Plans"]
  }
];

const PricingSection = () => {
  const [openCallbackDialog, setOpenCallbackDialog] = useState(false);
  const [openCalculatorDialog, setOpenCalculatorDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loanAmount, setLoanAmount] = useState<number>(4500000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [loanTerm, setLoanTerm] = useState<number>(20);

  const handleCallbackRequest = (size: string) => {
    setSelectedSize(size);
    setOpenCallbackDialog(true);
  };

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
               (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
               
    return Math.round(emi);
  };

  return (
    <section className="py-16 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-estate-primary">
            Transparent Pricing
          </h2>
          <div className="w-20 h-1 bg-estate-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plot size that suits your requirements and budget.
          </p>
          <p className="text-md text-estate-secondary font-medium mt-2">
            Price: ₹1.40 Lacs per sq. yard
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {plotSizes.map((plot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`rounded-xl overflow-hidden shadow-lg border ${
                plot.highlight 
                  ? 'border-estate-secondary relative' 
                  : 'border-muted'
              }`}
            >
              {plot.highlight && (
                <div className="bg-estate-secondary text-white text-xs font-bold px-4 py-1 absolute right-0 top-4 rounded-l-full">
                  MOST POPULAR
                </div>
              )}
              
              <div className={`p-8 ${plot.highlight ? 'bg-estate-primary/5' : 'bg-white'}`}>
                <h3 className="text-2xl font-bold text-estate-primary mb-2">
                  {plot.size}
                </h3>
                <div className="text-3xl font-bold text-estate-secondary mb-4">
                  {plot.price}
                </div>
                
                <ul className="mb-8">
                  {plot.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start mb-3">
                      <svg className="w-5 h-5 text-estate-secondary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-3">
                  <Button 
                    className={`w-full ${
                      plot.highlight 
                        ? 'bg-estate-secondary hover:bg-estate-secondary/90 text-white' 
                        : 'bg-estate-primary hover:bg-estate-primary/90'
                    }`}
                    onClick={() => handleCallbackRequest(plot.size)}
                  >
                    <Phone size={16} className="mr-2" />
                    Request Callback
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-estate-primary/20 text-estate-primary"
                    onClick={() => {
                      setLoanAmount(parseInt(plot.price.replace(/[^\d]/g, '')) * 100000);
                      setOpenCalculatorDialog(true);
                    }}
                  >
                    <Calculator size={16} className="mr-2" />
                    Calculate EMI
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-estate-primary/10 p-8 rounded-xl text-center"
        >
          <h3 className="text-2xl font-semibold mb-3 text-estate-primary">
            Need Customized Pricing Options?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our expert team can help you find the perfect plot according to your requirements and budget.
          </p>
          <Button 
            size="lg" 
            className="bg-estate-primary hover:bg-estate-primary/90"
            onClick={() => {
              setSelectedSize("Custom");
              setOpenCallbackDialog(true);
            }}
          >
            <Phone size={16} className="mr-2" />
            Request Personalized Consultation
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            *Prices are base prices and may vary based on location, size, and other factors. Statutory charges extra.
          </p>
        </motion.div>
      </div>
      
      <Dialog open={openCallbackDialog} onOpenChange={setOpenCallbackDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-estate-primary">
              Request a Callback{selectedSize ? ` - ${selectedSize}` : ''}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-muted-foreground mb-6 text-center">
              Fill in your details, and our expert team will contact you with detailed pricing information.
            </p>
            <LeadForm 
              variant="popup" 
              ctaText="Request Callback"
              onSuccess={() => setOpenCallbackDialog(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={openCalculatorDialog} onOpenChange={setOpenCalculatorDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-estate-primary">
              EMI Calculator
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Amount
                </label>
                <input
                  type="range"
                  min="1000000"
                  max="10000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-muted-foreground">₹10 Lakhs</span>
                  <span className="text-sm font-medium text-estate-primary">
                    ₹{(loanAmount / 100000).toFixed(2)} Lakhs
                  </span>
                  <span className="text-sm text-muted-foreground">₹1 Crore</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (%)
                </label>
                <input
                  type="range"
                  min="6"
                  max="12"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-muted-foreground">6%</span>
                  <span className="text-sm font-medium text-estate-primary">{interestRate}%</span>
                  <span className="text-sm text-muted-foreground">12%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Term (Years)
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-muted-foreground">5 years</span>
                  <span className="text-sm font-medium text-estate-primary">{loanTerm} years</span>
                  <span className="text-sm text-muted-foreground">30 years</span>
                </div>
              </div>
              
              <div className="bg-estate-primary/5 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-estate-primary mb-2">
                  Your Estimated Monthly EMI
                </h4>
                <div className="text-3xl font-bold text-estate-secondary">
                  ₹{calculateEMI().toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  *This is an approximation. Actual EMI may vary based on the lender's terms.
                </p>
              </div>
              
              <Button 
                className="w-full bg-estate-primary hover:bg-estate-primary/90"
                onClick={() => setOpenCallbackDialog(true)}
              >
                <Phone size={16} className="mr-2" />
                Talk to a Financing Expert
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PricingSection;
