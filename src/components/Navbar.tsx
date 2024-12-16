import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                InstaReview
              </h1>
              <p className="text-xs text-gray-600">Verify before you buy</p>
            </div>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/guidelines" className="text-gray-600 hover:text-purple-600">Guidelines</Link>
            <Link to="/report-scam" className="text-gray-600 hover:text-purple-600">Report Scam</Link>
            <Link
              to="/add-business"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Add Your Business
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;