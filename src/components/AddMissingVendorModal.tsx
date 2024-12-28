import React, { useState, useEffect } from 'react';
import { X, Instagram, Loader2 } from 'lucide-react';
import ReviewModal from './ReviewModal';

interface AddMissingVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

interface InstagramProfile {
  username: string;
  businessName: string;
  profileImage: string;
  bio: string;
}

const AddMissingVendorModal: React.FC<AddMissingVendorModalProps> = ({
  isOpen,
  onClose,
  username,
}) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Simulate API call to Instagram
      setLoading(true);
      setTimeout(() => {
        setProfile({
          username: username,
          businessName: username.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          profileImage: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          bio: 'This is a simulated Instagram business profile.',
        });
        setLoading(false);
      }, 1500);
    }
  }, [isOpen, username]);

  if (!isOpen) return null;

  const handleAddVendor = () => {
    // Here you would typically add the vendor to your platform
    setShowReview(true);
  };

  if (showReview && profile) {
    return (
      <ReviewModal
        isOpen={true}
        onClose={() => {
          setShowReview(false);
          onClose();
        }}
        vendor={{
          id: 'new',
          username: profile.username,
          businessName: profile.businessName,
          profileImage: profile.profileImage,
          rating: 0,
          reviewCount: 0,
          latestReview: '',
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Add Vendor to Platform</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-purple-600 animate-spin mb-4" />
            <p className="text-gray-600">Fetching profile information...</p>
          </div>
        ) : profile ? (
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={profile.profileImage}
                alt={profile.username}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-900">{profile.businessName}</h4>
                <p className="text-purple-600">@{profile.username}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 text-sm">{profile.bio}</p>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleAddVendor}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                Add and Review
              </button>
              <button
                onClick={onClose}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Could not fetch profile information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMissingVendorModal;