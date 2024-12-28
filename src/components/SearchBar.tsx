import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import AddMissingVendorModal from './AddMissingVendorModal';
import { mockVendors } from '../data/mockData';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
    const [showNoResults, setShowNoResults] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleSearch = (searchValue: string) => {
      onChange(searchValue);
      
      // Check if the search term looks like an Instagram username
      const isUsernameSearch = searchValue.startsWith('@') || searchValue.includes('instagram.com/');
      
      // Extract username from different formats
      let username = searchValue;
      if (username.startsWith('@')) {
        username = username.substring(1);
      }
      if (username.includes('instagram.com/')) {
        username = username.split('instagram.com/')[1].split('/')[0];
      }
  
      // Check if vendor exists
      const vendorExists = mockVendors.some(
        vendor => vendor.username.toLowerCase() === username.toLowerCase()
      );
  
      setShowNoResults(isUsernameSearch && !vendorExists && username.length > 0);
    };
  
    return (
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-purple-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border-2 border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 bg-white shadow-sm placeholder-gray-400"
          placeholder={placeholder}
        />
        
        {showNoResults && (
          <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-purple-100 p-4 z-10">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Plus className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Vendor not found</h4>
                <p className="text-sm text-gray-600 mb-3">
                  This vendor isn't on our platform yet. Would you like to add them?
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Vendor
                </button>
              </div>
            </div>
          </div>
        )}
  
        <AddMissingVendorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          username={value.replace('@', '')}
        />
      </div>
    );
  };
  
  export default SearchBar;