import React, { useState, useEffect } from 'react';
import { X, Instagram } from 'lucide-react';

interface AddVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddVendorModal: React.FC<AddVendorModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [showAuth, setShowAuth] = useState(false);

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAuth(true);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInstagramAuth = () => {
    window.location.href = `instagram://user?username=${username}`;
    setTimeout(() => {
      window.location.href = `https://www.instagram.com/${username}`;
    }, 25);
  };

  if (showAuth) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={handleModalClick}>
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Verify Your Instagram Account</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center">
            <Instagram className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">
              Please verify that you own the Instagram account @{username} to add your business.
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={handleModalClick}>
      <div className="bg-white rounded-lg max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Your Business</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Instagram Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace('@', ''))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="@yourbusiness"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="businessName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Your Business Name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Business Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Tell us about your business..."
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

export default AddVendorModal;