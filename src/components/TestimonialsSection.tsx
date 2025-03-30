
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Star, Quote } from 'lucide-react';
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Rajesh Sharma",
    location: "Delhi",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "I invested in ATS Province D Olympia because of its strategic location near the upcoming Jewar Airport. The transparent dealings and professional team made the entire process smooth. Highly recommended for serious investors!"
  },
  {
    name: "Priya Patel",
    location: "Noida",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "As a first-time real estate investor, I was looking for a reliable developer. ATS Homekraft's reputation and the premium location of Province D Olympia convinced me. The plots are well-planned and the project has excellent growth potential."
  },
  {
    name: "Amit Gupta",
    location: "Ghaziabad",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 4,
    text: "What impressed me most about ATS Province D Olympia was the quality of infrastructure and planning. The amenities are world-class, and the location is perfect for long-term investment. Looking forward to building my dream home here!"
  }
];

const TestimonialsSection = () => {
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
            What Our Customers Say
          </h2>
          <div className="w-20 h-1 bg-estate-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our satisfied customers who made the smart decision to invest in ATS Province D Olympia.
          </p>
        </motion.div>
        
        <div className="mb-16">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="h-full bg-white p-8 rounded-xl shadow-lg border border-muted relative"
                  >
                    <Quote className="absolute top-4 right-4 w-10 h-10 text-estate-secondary/20" />
                    
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-estate-secondary"
                      />
                      <div>
                        <h4 className="font-semibold text-estate-primary">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < testimonial.rating ? "text-estate-secondary fill-estate-secondary" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">{testimonial.text}</p>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="relative static mr-2" />
              <CarouselNext className="relative static" />
            </div>
          </Carousel>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg border border-muted mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-semibold text-estate-primary mb-1">RERA Registered Project</h4>
                <p className="text-sm text-muted-foreground">Ensuring transparency and security for your investment</p>
                <div className="mt-2 flex flex-col sm:flex-row gap-4">
                  <div className="bg-estate-primary/5 px-3 py-2 rounded-md">
                    <span className="text-xs text-estate-primary font-medium">Project RERA No:</span>
                    <span className="text-xs ml-1">UPRERAPRJ556048/03/2025</span>
                  </div>
                  <div className="bg-estate-primary/5 px-3 py-2 rounded-md">
                    <span className="text-xs text-estate-primary font-medium">Agent RERA No:</span>
                    <span className="text-xs ml-1">UPRERAAGT10202</span>
                  </div>
                </div>
              </div>
              
              <Button className="bg-estate-primary hover:bg-estate-primary/90">
                Verify RERA Details
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
