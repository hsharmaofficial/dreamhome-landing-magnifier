
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Shield, Trees, TrendingUp } from 'lucide-react';

const benefits = [
  {
    icon: <Building2 size={36} className="text-estate-secondary" />,
    title: "Custom Home Designs",
    description: "Own a plot and build your dream home with complete flexibility."
  },
  {
    icon: <MapPin size={36} className="text-estate-secondary" />,
    title: "Prime Location",
    description: "Sector 22D, Yamuna Expressway – Near Jewar Airport & Film City."
  },
  {
    icon: <Shield size={36} className="text-estate-secondary" />,
    title: "Exclusive Gated Community",
    description: "75 acres of premium plotted township with modern conveniences."
  },
  {
    icon: <Trees size={36} className="text-estate-secondary" />,
    title: "World-Class Amenities",
    description: "Clubhouse, Swimming Pool, Gym, Amphitheater, Landscaped Gardens."
  },
  {
    icon: <TrendingUp size={36} className="text-estate-secondary" />,
    title: "High Investment Potential",
    description: "Located in a rapidly developing area with high ROI potential."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-estate-primary"
          >
            Why Choose ATS Province D Olympia?
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
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Experience a lifestyle of luxury, convenience and premium amenities at the best location with high growth potential.
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
      </div>
    </section>
  );
};

export default BenefitsSection;
