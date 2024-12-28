import React, { useState } from 'react';
import { Star, Instagram, MessageCircle } from 'lucide-react';
import { Vendor } from '../types';
import ReviewModal from './ReviewModal';
import ReviewListModal from './ReviewListModal';
import { useAuth } from '../context/AuthContext';