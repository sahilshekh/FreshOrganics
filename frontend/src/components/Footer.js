import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-4">
      {/* Mobile view */}
      <div className="sm:hidden">
        <div className="max-w-6xl mx-auto px-4">
          {/* Two-column layout for Follow Us and Contact Us */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Left Section: Follow Us */}
            <div className="flex flex-col items-center">
              <h4 className="text-base font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a
                  href="https://www.instagram.com/only_fams.in/profilecard/?igsh=ZW5kdDkxMGpuMnNl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Right Section: Contact Us */}
            <div className="text-center">
              <h4 className="text-base font-semibold mb-3">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:support@onlyfams.com" className="hover:underline text-xs">
                    support@onlyfams.com
                  </a>
                </li>
                <li className="flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="tel:+91-9637447770" className="hover:underline text-xs">
                    +91-9637447770
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Middle Section: Farm Address */}
          <div className="text-center mb-4">
            <h4 className="text-base font-semibold mb-3">Farm Address</h4>
            <div className="flex items-center justify-center">
              <a
                href="https://maps.app.goo.gl/HopXDA5MZvhCFP6V7?g_st=com.google.maps.preview.copy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:underline text-xs"
              >
                Farm Address: H.no.497 Kapase post Umberpada
              </a>
            </div>
          </div>

          {/* Bottom Section: Privacy Policy */}
          <div className="flex flex-col items-center">
            <div className="flex">
              <Link to="/privacy-policy" className="text-xs hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:grid max-w-6xl mx-auto px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Branding */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold mb-3">Onlyfams</h3>
          <p className="text-xs">Delivering fresh, organic produce straight to your door.</p>
          <p className="text-xs mt-1">© 2025 onlyfams. All rights reserved.</p>
          <div className="mt-3 flex space-x-4 justify-center sm:justify-start">
            <Link to="/privacy-policy" className="text-xs hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center">
          <h4 className="text-base font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-3">
            <a
              href="https://www.instagram.com/only_fams.in/profilecard/?igsh=ZW5kdDkxMGpuMnNl"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <li className="flex flex-col items-center ">
            <h4 className="text-base font-semibold mb-3">Farm Location</h4>
            <div className="flex items-center justify-center md:justify-end">
              <a
                href="https://maps.app.goo.gl/HopXDA5MZvhCFP6V7?g_st=com.google.maps.preview.copy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:underline text-xs"
              >
                Farm Address: H.no.497 Kapase post Umberpada
              </a>
            </div>
          </li>
        </div>

        {/* Contact Us */}
        <div className="text-center sm:text-right md:text-right">
          <h4 className="text-base font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-center justify-center md:justify-end">
              <Mail className="h-4 w-4 mr-2" />
              <a href="mailto:support@onlyfams.com" className="hover:underline text-xs">
                support@onlyfams.com
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-end">
              <Phone className="h-4 w-4 mr-2" />
              <a href="tel:+91-9637447770" className="hover:underline text-xs">
                +91-9637447770
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;