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

  

export default ReviewModal;