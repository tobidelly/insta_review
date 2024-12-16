import React, { useState } from 'react';
import { Star, X, Instagram } from 'lucide-react';
import { Vendor } from '../types';

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
    // In production, this would redirect to Instagram OAuth
    window.location.href = `instagram://user?username=${vendor.username}`;
    
    // Fallback for desktop or if app isn't installed
    setTimeout(() => {
      window.location.href = `https://www.instagram.com/${vendor.username}`;
    }, 25);
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

  

export default ReviewModal;