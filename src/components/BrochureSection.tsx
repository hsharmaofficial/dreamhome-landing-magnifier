
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download, Home, ZoomIn, X } from 'lucide-react';
import LeadForm from './LeadForm';

// Document URLs updated to Cloudinary links
const BROCHURE_URL = "https://res.cloudinary.com/dflmkihg4/image/upload/v1743489282/Homeskraft_brochure_up8xde.pdf";
const MASTER_PLAN_URL = "https://res.cloudinary.com/dflmkihg4/image/upload/v1743489281/Master_layout_axzrwp.pdf";
const PAYMENT_PLAN_URL = "https://res.cloudinary.com/dflmkihg4/image/upload/v1743489281/Payment_Pan_rth9zq.jpg";

// Images for document preview
const masterPlanPreview = "https://res.cloudinary.com/dflmkihg4/image/upload/v1743489281/Master_layout_axzrwp.pdf";
const brochurePreview = "https://res.cloudinary.com/dflmkihg4/image/upload/v1743489282/Homeskraft_brochure_up8xde.pdf";
const paymentPlanPreview = "https://res.cloudinary.com/dflmkihg4/image/upload/v1743489281/Payment_Pan_rth9zq.jpg";

// Updated brochure items with better descriptions
const brochureItems = [
  {
    title: "Master Plan",
    icon: <Home size={24} className="text-estate-primary" />,
    description: "Complete township layout with plot locations and amenities",
    url: MASTER_PLAN_URL,
    preview: masterPlanPreview
  },
  {
    title: "Payment Plan",
    icon: <FileText size={24} className="text-estate-primary" />,
    description: "Flexible payment options for various plot sizes",
    url: PAYMENT_PLAN_URL,
    preview: paymentPlanPreview
  },
  {
    title: "Brochure",
    icon: <FileText size={24} className="text-estate-primary" />,
    description: "Complete details about the project and amenities",
    url: BROCHURE_URL,
    preview: brochurePreview
  }
];

const BrochureSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openMasterPlan, setOpenMasterPlan] = useState(false);
  const [openPaymentPlan, setOpenPaymentPlan] = useState(false);
  const [openBrochure, setOpenBrochure] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activePreview, setActivePreview] = useState<string | null>(null);

  const handleBrochureClick = (title: string, preview: string) => {
    setActivePreview(preview);
    
    if (title === "Master Plan") {
      setOpenMasterPlan(true);
    } else if (title === "Payment Plan") {
      setOpenPaymentPlan(true);
    } else if (title === "Brochure") {
      setOpenBrochure(true);
    } else {
      setActiveItem(title);
      setOpenDialog(true);
      setDownloadSuccess(false);
    }
  };

  const handleDownloadSuccess = () => {
    setDownloadSuccess(true);
    // Form submission in LeadForm.tsx now automatically downloads all documents
  };

  return (
    <section className="py-16 bg-estate-primary/5" id="brochure">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-estate-primary">
            Download Project Details
          </h2>
          <div className="w-20 h-1 bg-estate-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get access to all the information you need to make an informed decision.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brochureItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 rounded-xl shadow-lg border border-muted hover:shadow-xl transition-all cursor-pointer hover:border-estate-secondary"
              onClick={() => handleBrochureClick(item.title, item.preview)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-estate-primary/10 p-4 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-estate-primary">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <Button variant="outline" className="mt-2 border-estate-secondary text-estate-primary">
                  <Download size={16} className="mr-2" />
                  {item.title === "Master Plan" || item.title === "Payment Plan" ? `View ${item.title}` : `Download ${item.title}`}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Master Plan Dialog */}
        <Dialog open={openMasterPlan} onOpenChange={setOpenMasterPlan}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold text-estate-primary flex items-center justify-between">
                <span>Master Plan</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setOpenMasterPlan(false)}
                  className="h-8 w-8 rounded-full"
                >
                  <X size={18} />
                </Button>
              </DialogTitle>
              <DialogDescription className="text-center">
                Sector 22D, Yamuna Expressway, Greater Noida
              </DialogDescription>
            </DialogHeader>
            
            <div className="relative">
              <div className="mt-4 bg-estate-primary/5 p-2 rounded-lg overflow-hidden">
                <div className="aspect-[4/3] relative rounded-md overflow-hidden border border-estate-primary/20">
                  <iframe 
                    src={`${masterPlanPreview}#view=FitH`}
                    title="Master Plan"
                    className="w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?q=80&w=1587&auto=format";
                    }}
                  ></iframe>
                  <div className="absolute bottom-3 right-3">
                    <Button 
                      className="bg-estate-primary/80 hover:bg-estate-primary backdrop-blur-sm rounded-full h-10 w-10 p-0"
                      onClick={() => window.open(MASTER_PLAN_URL, '_blank')}
                    >
                      <ZoomIn size={18} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center space-y-4">
                <p className="text-muted-foreground text-sm">
                  For detailed plot specifications and pricing, please fill the enquiry form.
                </p>
                <Button 
                  className="bg-estate-primary hover:bg-estate-primary/90"
                  onClick={() => {
                    setOpenMasterPlan(false);
                    setActiveItem("Master Plan");
                    setOpenDialog(true);
                  }}
                >
                  <Download size={16} className="mr-2" />
                  Download All Documents
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Payment Plan Dialog */}
        <Dialog open={openPaymentPlan} onOpenChange={setOpenPaymentPlan}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold text-estate-primary flex items-center justify-between">
                <span>Payment Plan</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setOpenPaymentPlan(false)}
                  className="h-8 w-8 rounded-full"
                >
                  <X size={18} />
                </Button>
              </DialogTitle>
              <DialogDescription className="text-center">
                Flexible payment options for various plot sizes
              </DialogDescription>
            </DialogHeader>
            
            <div className="relative">
              <div className="mt-4 bg-estate-primary/5 p-2 rounded-lg overflow-hidden">
                <div className="aspect-[4/3] relative rounded-md overflow-hidden border border-estate-primary/20">
                  <img 
                    src={paymentPlanPreview} 
                    alt="Payment Plan" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?q=80&w=1587&auto=format";
                    }}
                  />
                  <div className="absolute bottom-3 right-3">
                    <Button 
                      className="bg-estate-primary/80 hover:bg-estate-primary backdrop-blur-sm rounded-full h-10 w-10 p-0"
                      onClick={() => window.open(PAYMENT_PLAN_URL, '_blank')}
                    >
                      <ZoomIn size={18} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center space-y-4">
                <p className="text-muted-foreground text-sm">
                  For detailed payment options, please fill the enquiry form.
                </p>
                <Button 
                  className="bg-estate-primary hover:bg-estate-primary/90"
                  onClick={() => {
                    setOpenPaymentPlan(false);
                    setActiveItem("Payment Plan");
                    setOpenDialog(true);
                  }}
                >
                  <Download size={16} className="mr-2" />
                  Download All Documents
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Brochure Dialog */}
        <Dialog open={openBrochure} onOpenChange={setOpenBrochure}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold text-estate-primary flex items-center justify-between">
                <span>Brochure</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setOpenBrochure(false)}
                  className="h-8 w-8 rounded-full"
                >
                  <X size={18} />
                </Button>
              </DialogTitle>
              <DialogDescription className="text-center">
                Complete details about the project and amenities
              </DialogDescription>
            </DialogHeader>
            
            <div className="relative">
              <div className="mt-4 bg-estate-primary/5 p-2 rounded-lg overflow-hidden">
                <div className="aspect-[4/3] relative rounded-md overflow-hidden border border-estate-primary/20">
                  <iframe 
                    src={`${brochurePreview}#view=FitH`}
                    title="Brochure"
                    className="w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?q=80&w=1587&auto=format";
                    }}
                  ></iframe>
                  <div className="absolute bottom-3 right-3">
                    <Button 
                      className="bg-estate-primary/80 hover:bg-estate-primary backdrop-blur-sm rounded-full h-10 w-10 p-0"
                      onClick={() => window.open(BROCHURE_URL, '_blank')}
                    >
                      <ZoomIn size={18} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center space-y-4">
                <p className="text-muted-foreground text-sm">
                  For detailed information, please fill the enquiry form.
                </p>
                <Button 
                  className="bg-estate-primary hover:bg-estate-primary/90"
                  onClick={() => {
                    setOpenBrochure(false);
                    setActiveItem("Brochure");
                    setOpenDialog(true);
                  }}
                >
                  <Download size={16} className="mr-2" />
                  Download All Documents
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Download Form Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold text-estate-primary">
                {downloadSuccess ? "Download Started!" : "Download All Documents"}
              </DialogTitle>
            </DialogHeader>
            
            {downloadSuccess ? (
              <div className="py-4 text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-muted-foreground mb-4">
                  All document downloads have started. If they don't begin automatically, please check your browser's download settings.
                </p>
                <Button 
                  className="w-full bg-estate-primary hover:bg-estate-primary/90"
                  onClick={() => setOpenDialog(false)}
                >
                  Continue Browsing
                </Button>
              </div>
            ) : (
              <div className="py-4">
                <p className="text-muted-foreground mb-6 text-center">
                  Please fill in your details to access all project documents.
                </p>
                <LeadForm 
                  variant="popup" 
                  ctaText={`Download All Documents`}
                  onSuccess={handleDownloadSuccess}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default BrochureSection;
