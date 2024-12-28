import React, { useState } from 'react';
import { Star, Instagram, MessageCircle } from 'lucide-react';
import { Vendor } from '../types';
import ReviewModal from './ReviewModal';
import ReviewListModal from './ReviewListModal';
import { useAuth } from '../context/AuthContext';

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewListOpen, setIsReviewListOpen] = useState(false);
  const { user, login } = useAuth();

  const handleReviewClick = () => {
    if (!user) {
      login();
    } else {
      setIsReviewModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-purple-100">
        <div className="relative">
          <img
            src={vendor.profileImage}
            alt={vendor.businessName}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2">
            <a
              href={`https://instagram.com/${vendor.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            >
              <Instagram className="h-5 w-5 text-purple-600" />
            </a>
          </div>
        </div>
        <div className="p-4">
          <button
            onClick={() => setIsReviewListOpen(true)}
            className="text-left group"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600">
              {vendor.businessName}
            </h3>
            <p className="text-purple-600 text-sm mb-3">@{vendor.username}</p>
            <div className="flex items-center mb-3 bg-purple-50 rounded-lg p-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < vendor.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600 font-medium">
                {vendor.rating.toFixed(1)}
              </span>
              <span className="mx-1 text-gray-400">•</span>
              <span className="text-sm text-gray-600">
                {vendor.reviewCount} reviews
              </span>
            </div>
          </button>
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <MessageCircle className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
              <p className="text-gray-700 text-sm line-clamp-2">
                {vendor.latestReview}
              </p>
            </div>
          </div>
          <button
            onClick={handleReviewClick}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Write a Review
          </button>
        </div>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        vendor={vendor}
      />
      <ReviewListModal
        isOpen={isReviewListOpen}
        onClose={() => setIsReviewListOpen(false)}
        vendor={vendor}
      />
    </>
  );
};

export default VendorCard;