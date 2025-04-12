import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-3"> {/* Reduced py-8 to py-3 */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Mobile view */}
        <div className="sm:hidden">
          <div className="flex gap-4">
            {/* Left: Branding + Social Media */}
            <div className="flex-1 text-center">
              <h3 className="text-lg font-bold mb-2">FreshOrganics</h3> {/* Reduced text-2xl to text-lg */}
              <p className="text-xs mb-2">Delivering fresh, organic produce straight to your door.</p>
              <p className="text-xs mb-3">© 2025 FreshOrganics. All rights reserved.</p>
              <div className="flex justify-center space-x-2"> {/* Reduced space-x-4 to space-x-2 */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                >
                  <Facebook className="h-4 w-4" /> {/* Reduced h-6 w-6 to h-4 w-4 */}
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
            {/* Right: Contact Us */}
            <div className="flex-1 text-center">
              <h4 className="text-base font-semibold mb-2">Contact Us</h4> {/* Reduced text-lg to text-base */}
              <ul className="space-y-1"> {/* Reduced space-y-3 to space-y-1 */}
                <li className="flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-1" /> {/* Reduced h-5 w-5 to h-4 w-4, mr-2 to mr-1 */}
                  <a href="mailto:support@freshorganics.com" className="hover:underline text-xs">
                    support@freshorganics.com
                  </a>
                </li>
                <li className="flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-1" />
                  <a href="tel:+1234567890" className="hover:underline text-xs">
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-center justify-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-xs">123 Organic Lane, Green City</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Branding */}
          <div className="text-left">
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
          <div className="text-right">
            <h4 className="text-base font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center justify-end">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:support@freshorganics.com" className="hover:underline text-xs">
                  support@freshorganics.com
                </a>
              </li>
              <li className="flex items-center justify-end">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+1234567890" className="hover:underline text-xs">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center justify-end">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-xs">123 Organic Lane, Green City</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;