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

  

export default ReviewModal;