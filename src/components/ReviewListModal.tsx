import React, { useState, useEffect } from 'react';
import { X, Star, ChevronDown, BadgeCheck } from 'lucide-react';
import { Vendor, Review } from '../types';
import { useVendorReviews } from '../hooks/useApi';

interface ReviewListModalProps {
    isOpen: boolean;
    onClose: () => void;
    vendor: Vendor;
  }

  const ReviewListModal: React.FC<ReviewListModalProps> = ({
  isOpen,
  onClose,
  vendor,
}) => {
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useVendorReviews(vendor.id, page, {
    enabled: isOpen,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.currentPage < lastPage.pagination.pages) {
        return lastPage.pagination.currentPage + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const allReviews = data?.pages.flatMap(page => page.reviews) || [];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleModalClick}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {vendor.businessName}
              </h3>
              <p className="text-purple-600">@{vendor.username}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < vendor.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">
              {vendor.rating.toFixed(1)}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">{vendor.reviewCount} reviews</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : allReviews.length > 0 ? (
            <div className="p-6">
              {allReviews.map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="mb-6 pb-6 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center mb-3">
                    <img
                      src={review.user.profileImage}
                      alt={review.user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">
                          @{review.user.username}
                        </span>
                        {review.user.verified && (
                          <BadgeCheck className="h-4 w-4 text-blue-500 ml-1" />
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}

              {hasNextPage && (
                <div className="flex justify-center py-4">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="flex items-center justify-center px-4 py-2 text-purple-600 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFetchingNextPage ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600 mr-2"></div>
                    ) : (
                      <ChevronDown className="h-5 w-5 mr-2" />
                    )}
                    {isFetchingNextPage ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <p>No reviews yet</p>
              <p className="text-sm mt-1">Be the first to review this vendor</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewListModal;