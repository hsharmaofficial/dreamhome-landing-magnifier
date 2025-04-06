
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Shield, Trees, TrendingUp, Award, Zap, DollarSign, Trophy } from 'lucide-react';

const benefits = [
  {
    icon: <Building2 size={36} className="text-estate-secondary" />,
    title: "Custom Home Designs",
    description: "Own a plot and build your dream home with complete flexibility in Greater Noida's most prestigious township."
  },
  {
    icon: <MapPin size={36} className="text-estate-secondary" />,
    title: "Prime Location",
    description: "Sector 22D, Yamuna Expressway – Just 15 mins from Jewar International Airport & 20 mins from the upcoming Film City."
  },
  {
    icon: <Shield size={36} className="text-estate-secondary" />,
    title: "Exclusive Gated Community",
    description: "75 acres of premium plotted township with RERA approval and modern conveniences in Greater Noida."
  },
  {
    icon: <Trees size={36} className="text-estate-secondary" />,
    title: "World-Class Amenities",
    description: "Clubhouse, Swimming Pool, Gym, Amphitheater, Landscaped Gardens, and 14+ elite recreation spaces."
  },
  {
    icon: <TrendingUp size={36} className="text-estate-secondary" />,
    title: "High Investment Potential",
    description: "Located in a rapidly developing area with exceptional ROI potential near Jewar Airport and Film City."
  },
  {
    icon: <Award size={36} className="text-estate-secondary" />,
    title: "YEIDA Approved",
    description: "Plot development by ATS Homekraft is fully approved by Yamuna Expressway Industrial Development Authority."
  },
  {
    icon: <Zap size={36} className="text-estate-secondary" />,
    title: "Ready To Build",
    description: "Plots starting from 150 sq. yards with all development work completed and ready for construction."
  },
  {
    icon: <DollarSign size={36} className="text-estate-secondary" />,
    title: "Attractive Payment Plan",
    description: "Flexible payment options with attractive schemes starting at just ₹1.3 Lakh per square yard."
  },
  {
    icon: <Trophy size={36} className="text-estate-secondary" />,
    title: "ATS Group Legacy",
    description: "Backed by the trusted ATS Group with over 20 years of excellence in real estate development."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-estate-primary"
          >
            Why Invest in ATS Province D Olympia?
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-1 bg-estate-secondary mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            ATS Homekraft Province D Olympia offers premium residential plots at Yamuna Expressway, Sector 22D. With RERA approval, excellent connectivity to Jewar Airport, and backed by the prestigious ATS Group, these plots represent a premium investment opportunity in Greater Noida's fastest growing region.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-muted"
            >
              <div className="bg-estate-primary/5 p-4 inline-block rounded-full mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-estate-primary">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-estate-primary/5 p-8 rounded-xl border border-estate-primary/10"
        >
          <h3 className="text-2xl font-semibold mb-4 text-estate-primary">Project Highlights & Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-lg mb-2">Township Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Gated community with 24×7 security</li>
                <li>Wide internal roads (18-24 meters)</li>
                <li>Underground electrical cabling</li>
                <li>Water supply and drainage systems</li>
                <li>Earthquake resistant construction</li>
                <li>Street lighting and landscaped parks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-lg mb-2">Recreational Amenities:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Modern clubhouse with swimming pool</li>
                <li>Multipurpose hall and community center</li>
                <li>Indoor games and fitness center</li>
                <li>Tennis/badminton courts</li>
                <li>Children's play area and jogging track</li>
                <li>Meditation garden and amphitheater</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
