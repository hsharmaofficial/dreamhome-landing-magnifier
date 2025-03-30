
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Building, 
  School, 
  ShoppingBag, 
  Train, 
  Car 
} from 'lucide-react';

const locationPoints = [
  { 
    icon: <Plane className="mr-2" />, 
    title: "Jewar Airport", 
    distance: "15 mins drive" 
  },
  { 
    icon: <Building className="mr-2" />, 
    title: "Film City", 
    distance: "20 mins drive" 
  },
  { 
    icon: <School className="mr-2" />, 
    title: "Gautam Buddha University", 
    distance: "10 mins drive" 
  },
  { 
    icon: <ShoppingBag className="mr-2" />, 
    title: "Pari Chowk", 
    distance: "25 mins drive" 
  },
  { 
    icon: <Train className="mr-2" />, 
    title: "Nearest Metro Station", 
    distance: "15 mins drive" 
  },
  { 
    icon: <Car className="mr-2" />, 
    title: "Yamuna Expressway", 
    distance: "Connected" 
  }
];

const LocationSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-estate-primary">
            Strategic Location Advantage
          </h2>
          <div className="w-20 h-1 bg-estate-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ATS Province D Olympia is strategically located at Yamuna Expressway, Sector 22D, with excellent connectivity to major landmarks.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.9116553952256!2d77.49661227444193!3d28.455267292307583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1d428efad17%3A0x31ebb57c71b3c9!2sYamuna%20Expressway%2C%20Sector%2022D%2C%20Greater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1694855720546!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="ATS Province D Olympia Location Map"
            ></iframe>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-estate-primary/5 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-6 text-estate-primary">
                Key Distances
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {locationPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex items-center"
                  >
                    <div className="bg-white p-3 rounded-full shadow-md mr-4 text-estate-primary">
                      {point.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-estate-primary">{point.title}</h4>
                      <p className="text-sm text-muted-foreground">{point.distance}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-estate-secondary/10 rounded-lg border border-estate-secondary/20">
                <p className="text-sm leading-relaxed text-estate-primary">
                  <strong>Strategic Location:</strong> ATS Province D Olympia is situated in one of the fastest developing regions in NCR, just minutes away from the upcoming Jewar International Airport and the proposed Film City.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
