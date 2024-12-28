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