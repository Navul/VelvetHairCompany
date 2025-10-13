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

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="font-display text-xl font-bold">Velvet Hair</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium quality wigs and hair extensions for men and women. 
              Transform your look with our luxurious collection of natural and synthetic hair products.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=male-wigs" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Men's Wigs
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=female-wigs" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Women's Wigs
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=accessories" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=care-products" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Care Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/shipping" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link 
                  to="/size-guide" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiMapPin className="text-purple-400 flex-shrink-0" size={16} />
                <span className="text-gray-300 text-sm">
                  123 Hair Street, Beauty City, BC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-purple-400 flex-shrink-0" size={16} />
                <span className="text-gray-300 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-purple-400 flex-shrink-0" size={16} />
                <span className="text-gray-300 text-sm">
                  info@velvethair.com
                </span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <p className="text-gray-400 text-xs mb-3">
                Subscribe to get updates on new arrivals and special offers
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-purple-500"
                />
                <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-r-md hover:bg-purple-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Velvet Hair Company. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-400 hover:text-white transition-colors"
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