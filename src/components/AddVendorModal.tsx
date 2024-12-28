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