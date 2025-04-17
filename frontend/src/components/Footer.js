import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-4">
      {/* Mobile view */}
      <div className="sm:hidden">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 gap-6">
          {/* Social Media */}
          <div className="flex flex-col items-center">
            <h4 className="text-base font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Us */}
          <div className="text-center">
            <h4 className="text-base font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:support@freshorganics.com" className="hover:underline text-xs">
                  support@freshorganics.com
                </a>
              </li>
              <li className="flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+1234567890" className="hover:underline text-xs">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center justify-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-xs">123 Organic Lane, Green City</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:grid max-w-6xl mx-auto px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Branding */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold mb-3">FreshOrganics</h3>
          <p className="text-xs">Delivering fresh, organic produce straight to your door.</p>
          <p className="text-xs mt-1">© 2025 FreshOrganics. All rights reserved.</p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center">
          <h4 className="text-base font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Contact Us */}
        <div className="text-center sm:text-right md:text-right">
          <h4 className="text-base font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-center justify-center md:justify-end">
              <Mail className="h-4 w-4 mr-2" />
              <a href="mailto:support@freshorganics.com" className="hover:underline text-xs">
                support@freshorganics.com
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-end">
              <Phone className="h-4 w-4 mr-2" />
              <a href="tel:+1234567890" className="hover:underline text-xs">
                +1 (234) 567-890
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-end">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-xs">123 Organic Lane, Green City</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;