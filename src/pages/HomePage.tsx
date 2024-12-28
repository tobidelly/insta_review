import React, { useState } from 'react';
import { Search, Star, Shield, AlertTriangle, ThumbsUp } from 'lucide-react';
import VendorCard from '../components/VendorCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { mockVendors } from '../data/mockData';

const HomePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [vendorsPerPage] = useState(6);

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = mockVendors.slice(indexOfFirstVendor, indexOfLastVendor);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar value={searchValue} onChange={setSearchValue} placeholder="Search for vendors" />
      <div className="grid grid-cols-1 gap-4 mt-4">
        {currentVendors
          .filter(vendor =>
            vendor.businessName.toLowerCase().includes(searchValue.toLowerCase()) ||
            vendor.username.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
      </div>
      <Pagination
        itemsPerPage={vendorsPerPage}
        totalItems={mockVendors.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};