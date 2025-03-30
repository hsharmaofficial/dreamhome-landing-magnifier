
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download, Home } from 'lucide-react';
import LeadForm from './LeadForm';

const brochureItems = [
  {
    title: "Master Plan",
    icon: <Home size={24} className="text-estate-primary" />,
    description: "Detailed layout of the ATS Province D Olympia township"
  },
  {
    title: "Floor Plans",
    icon: <FileText size={24} className="text-estate-primary" />,
    description: "Various plot sizes from 150 sq. yards onwards"
  },
  {
    title: "Brochure",
    icon: <FileText size={24} className="text-estate-primary" />,
    description: "Complete details about the project and amenities"
  }
];

const BrochureSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleBrochureClick = (title: string) => {
    setActiveItem(title);
    setOpenDialog(true);
    setDownloadSuccess(false);
  };

  const handleDownloadSuccess = () => {
    setDownloadSuccess(true);
    // Simulate PDF download after a short delay
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#'; // This would be the actual brochure URL
      link.setAttribute('download', `ATS_Province_D_Olympia_${activeItem}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 500);
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
                  Download {item.title}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
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
                  Your download has started. If it doesn't begin automatically, please click the button below.
                </p>
                <Button className="mt-2 bg-estate-primary hover:bg-estate-primary/90">
                  <Download size={16} className="mr-2" />
                  Download Again
                </Button>
              </div>
            ) : (
              <div className="py-4">
                <p className="text-muted-foreground mb-6 text-center">
                  Please fill in your details to access the {activeItem}.
                </p>
                <LeadForm 
                  variant="popup" 
                  ctaText={`Download ${activeItem}`}
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
