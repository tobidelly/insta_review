import React, { useState } from 'react';
import { Star, X, Instagram } from 'lucide-react';
import { Vendor } from '../types';
import { config } from '../config';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, vendor }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [showAuth, setShowAuth] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAuth(true);
  };

  const handleInstagramAuth = () => {
    // Generate a random state parameter for security
    const state = Math.random().toString(36).substring(7);
    // Store the state in sessionStorage for verification when the user returns
    sessionStorage.setItem('instagram_auth_state', state);
    
    // Construct the Instagram OAuth URL with state parameter
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${config.instagram.clientId}&redirect_uri=${encodeURIComponent(config.instagram.redirectUri)}&scope=user_profile,instagram_basic&response_type=code&state=${state}`;
    
    // Redirect to Instagram OAuth
    window.location.href = instagramAuthUrl;
  };

  if (showAuth) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Verify Your Instagram Account</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center">
            <Instagram className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">
              To submit your review, please verify your Instagram account. This helps us maintain authentic reviews.
            </p>
            <button
              onClick={handleInstagramAuth}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              <Instagram className="h-5 w-5 mr-2" />
              Continue with Instagram
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Review {vendor.businessName}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="review"
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Share your experience with this vendor..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;