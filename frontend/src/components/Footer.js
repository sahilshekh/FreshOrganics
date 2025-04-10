import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Left Section - Branding */}
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold mb-4">FreshOrganics</h3>
          <p className="text-sm">Delivering fresh, organic produce straight to your door.</p>
          <p className="text-sm mt-2">© 2025 FreshOrganics. All rights reserved.</p>
        </div>

        {/* Center Section - Social Media */}
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Right Section - Contact Us */}
        <div className="text-center sm:text-right sm:col-span-2 md:col-span-1">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center justify-center sm:justify-end">
              <Mail className="h-5 w-5 mr-2" />
              <a href="mailto:support@freshorganics.com" className="hover:underline">
                support@freshorganics.com
              </a>
            </li>
            <li className="flex items-center justify-center sm:justify-end">
              <Phone className="h-5 w-5 mr-2" />
              <a href="tel:+1234567890" className="hover:underline">
                +1 (234) 567-890
              </a>
            </li>
            <li className="flex items-center justify-center sm:justify-end">
              <MapPin className="h-5 w-5 mr-2" />
              <span>123 Organic Lane, Green City</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;