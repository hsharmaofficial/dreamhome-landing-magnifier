
import React from 'react';
import { Building, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, Hexagon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-estate-primary text-white pt-16 pb-8" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Hexagon size={36} className="text-estate-secondary mr-2" />
              <h3 className="text-xl font-bold">ATS Province D Olympia</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Premium residential plots at Yamuna Expressway, Sector 22D. Build your dream home with ATS Province D Olympia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-estate-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-estate-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-estate-secondary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-estate-secondary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-estate-secondary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-estate-secondary transition-colors">
                  About Project
                </a>
              </li>
              <li>
                <a href="#amenities" className="text-gray-300 hover:text-estate-secondary transition-colors">
                  Amenities
                </a>
              </li>
              <li>
                <a href="#location" className="text-gray-300 hover:text-estate-secondary transition-colors">
                  Location
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-300 hover:text-estate-secondary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-estate-secondary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex">
                <Building size={20} className="text-estate-secondary mr-3 flex-shrink-0" />
                <span className="text-gray-300">ATS Homekraft Ltd.</span>
              </li>
              <li className="flex">
                <MapPin size={20} className="text-estate-secondary mr-3 flex-shrink-0" />
                <span className="text-gray-300">Sector 22D, Yamuna Expressway, Greater Noida, Uttar Pradesh</span>
              </li>
              <li className="flex">
                <Phone size={20} className="text-estate-secondary mr-3 flex-shrink-0" />
                <a href="tel:+918420595900" className="text-gray-300 hover:text-estate-secondary transition-colors">
                  +91 8420595900
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ATS Province D Olympia. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-300 hover:text-estate-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-estate-secondary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-estate-secondary transition-colors">
                Disclaimer
              </a>
            </div>
          </div>
          
          <p className="text-xs text-gray-400 text-center mt-6">
            Disclaimer: The information, images, and visuals on this website are indicative only. The developer reserves the right to change any or all of the above-mentioned details without prior notice. This website does not constitute an offer and/or contract of any type between the developer and the recipient.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
