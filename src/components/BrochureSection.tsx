
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

// Document URLs
const BROCHURE_URL = "https://drive.google.com/uc?export=download&id=1BTqD3xTujckdmZzHRVpn3VEdIByemIb4";
const MASTER_PLAN_URL = "https://drive.google.com/uc?export=download&id=1PQ7mUbyxB8gViV3PA1GPasa91qWK6jHv";
const PAYMENT_PLAN_URL = "https://drive.google.com/uc?export=download&id=1g-TzGgrvUn1b4cydtHsMBnVQzQ_UlbdG";

// Master plan preview image - using direct Google Drive image link
const masterPlanImage = "https://drive.google.com/uc?export=view&id=1PQ7mUbyxB8gViV3PA1GPasa91qWK6jHv";

// Updated brochure items with better descriptions
const brochureItems = [
  {
    title: "Master Plan",
    icon: <Home size={24} className="text-estate-primary" />,
    description: "Complete township layout with plot locations and amenities",
    url: MASTER_PLAN_URL
  },
  {
    title: "Payment Plan",
    icon: <FileText size={24} className="text-estate-primary" />,
    description: "Flexible payment options for various plot sizes",
    url: PAYMENT_PLAN_URL
  },
  {
    title: "Brochure",
    icon: <FileText size={24} className="text-estate-primary" />,
    description: "Complete details about the project and amenities",
    url: BROCHURE_URL
  }
];

const BrochureSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openMasterPlan, setOpenMasterPlan] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleBrochureClick = (title: string) => {
    if (title === "Master Plan") {
      setOpenMasterPlan(true);
    } else {
      setActiveItem(title);
      setOpenDialog(true);
      setDownloadSuccess(false);
    }
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllFiles = () => {
    // Download all files one by one with a small delay to prevent browser blocking
    setTimeout(() => downloadFile(BROCHURE_URL, 'ATS_Province_D_Olympia_Brochure.pdf'), 500);
    setTimeout(() => downloadFile(MASTER_PLAN_URL, 'ATS_Province_D_Olympia_Master_Plan.pdf'), 1500);
    setTimeout(() => downloadFile(PAYMENT_PLAN_URL, 'ATS_Province_D_Olympia_Payment_Plan.pdf'), 2500);
  };

  const handleDownloadSuccess = () => {
    setDownloadSuccess(true);
    // Download current item first
    const currentItem = brochureItems.find(item => item.title === activeItem);
    if (currentItem) {
      setTimeout(() => downloadFile(currentItem.url, `ATS_Province_D_Olympia_${activeItem}.pdf`), 500);
    }
    
    // Download all files
    downloadAllFiles();
  };

  return (
    <section className="py-16 bg-estate-primary/5">
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
            Get access to all the information you need about ATS Province D Olympia to make an informed decision.
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
              onClick={() => handleBrochureClick(item.title)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-estate-primary/10 p-4 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-estate-primary">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <Button variant="outline" className="mt-2 border-estate-secondary text-estate-primary">
                  <Download size={16} className="mr-2" />
                  {item.title === "Master Plan" ? "View Master Plan" : `Download ${item.title}`}
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
                <span>ATS Province D Olympia - Master Plan</span>
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
                  <img 
                    src={masterPlanImage} 
                    alt="ATS Province D Olympia Master Plan" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?q=80&w=1587&auto=format";
                    }}
                  />
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
                  Download Master Plan PDF
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
                {downloadSuccess ? "Download Started!" : `Download ${activeItem}`}
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
                  All document downloads have started. If they don't begin automatically, please click the buttons below.
                </p>
                <div className="space-y-3 mt-4">
                  {brochureItems.map((item, index) => (
                    <Button 
                      key={index}
                      className="w-full bg-estate-primary hover:bg-estate-primary/90"
                      onClick={() => downloadFile(item.url, `ATS_Province_D_Olympia_${item.title}.pdf`)}
                    >
                      <Download size={16} className="mr-2" />
                      Download {item.title}
                    </Button>
                  ))}
                </div>
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
