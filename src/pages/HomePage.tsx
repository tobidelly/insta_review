import React, { useState } from 'react';
import { Search, Star, Shield, AlertTriangle, ThumbsUp } from 'lucide-react';
import VendorCard from '../components/VendorCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { mockVendors } from '../data/mockData';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 100;

  const filteredVendors = mockVendors.filter(vendor => 
    vendor.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Find Trusted Instagram Vendors
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join our community in building a safer online shopping experience. 
              Review vendors, share experiences, and help others make informed decisions.
            </p>
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by Instagram username or business name"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/50 backdrop-blur-sm border-y border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <ThumbsUp className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
              <p className="text-gray-600">Verified Vendors</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <Star className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">50,000+</h3>
              <p className="text-gray-600">Customer Reviews</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Reported Scams</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-900">Recent Reviews</h3>
          <div className="text-sm text-gray-500">
            Showing {currentVendors.length} of {filteredVendors.length} vendors
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentVendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;