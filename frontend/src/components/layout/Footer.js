import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiFacebook, 
  FiInstagram, 
  FiTwitter, 
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';
import { BUSINESS_INFO, NAV_LINKS, SOCIAL_LINKS } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 xs:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8">
          {/* Company Info */}
          <div className="space-y-4 xs:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/velvet-logo.png" 
                alt="Velvet Hair Wigs" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-display text-lg sm:text-xl font-bold">{BUSINESS_INFO.name}</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              {BUSINESS_INFO.description}. {BUSINESS_INFO.tagline}
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200 p-1"
                aria-label="Facebook"
              >
                <FiFacebook size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200 p-1"
                aria-label="Instagram"
              >
                <FiInstagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200 p-1"
                aria-label="Twitter"
              >
                <FiTwitter size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200 p-1"
                aria-label="YouTube"
              >
                <FiYoutube size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=male-wigs" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                >
                  Men's Wigs
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=female-wigs" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                >
                  Women's Wigs
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=accessories" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=care-products" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                >
                  Care Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/shipping" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link 
                  to="/size-guide" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4 xs:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-3">
                <FiMapPin className="text-purple-400 flex-shrink-0 mt-1" size={14} />
                <span className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {BUSINESS_INFO.address}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <FiPhone className="text-purple-400 flex-shrink-0 mt-1" size={14} />
                <span className="text-gray-300 text-xs sm:text-sm">
                  {BUSINESS_INFO.phone}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <FiMail className="text-purple-400 flex-shrink-0 mt-1" size={14} />
                <span className="text-gray-300 text-xs sm:text-sm">
                  {BUSINESS_INFO.email}
                </span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-4 sm:mt-6">
              <h4 className="text-xs sm:text-sm font-semibold mb-2">Newsletter</h4>
              <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                Subscribe to get updates on new arrivals and special offers
              </p>
              <div className="flex flex-col xs:flex-row">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-800 border border-gray-700 rounded-md xs:rounded-l-md xs:rounded-r-none focus:outline-none focus:border-purple-500 mb-2 xs:mb-0"
                />
                <button className="px-3 sm:px-4 py-2 bg-purple-600 text-white text-xs sm:text-sm rounded-md xs:rounded-l-none xs:rounded-r-md hover:bg-purple-700 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              {BUSINESS_INFO.copyright}
            </div>
            <div className="flex flex-col xs:flex-row justify-center sm:justify-end space-y-2 xs:space-y-0 xs:space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white transition-colors duration-200 text-center"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white transition-colors duration-200 text-center"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-400 hover:text-white transition-colors duration-200 text-center"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;