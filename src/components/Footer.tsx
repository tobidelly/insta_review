import React from 'react';
import { Shield, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                InstaReview
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Making online shopping safer, one review at a time. Join our community
              of conscious shoppers and trusted vendors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Twitter className="h-6 w-6" aria-label="X (formerly Twitter)" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              For Vendors
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/add-business" className="text-gray-600 hover:text-purple-600">
                  Add Your Business
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-gray-600 hover:text-purple-600">
                  Vendor Guidelines
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-600 hover:text-purple-600">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-purple-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/report-scam" className="text-gray-600 hover:text-purple-600">
                  Report a Scam
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-purple-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-purple-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} InstaReview. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;