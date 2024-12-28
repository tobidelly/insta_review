import React, { useState } from 'react';
import { MessageCircle, ChevronDown, Search, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is InstaReview?",
        a: "InstaReview is a platform that helps shoppers verify and review Instagram-based vendors, creating a safer online shopping environment."
      },
      {
        q: "How does vendor verification work?",
        a: "Vendors are verified through their Instagram accounts and must provide business details. We also track their review history and customer satisfaction."
      }
    ]
  },
  {
    category: "For Shoppers",
    questions: [
      {
        q: "How do I write a review?",
        a: "Search for the vendor, click on their profile, and select 'Write a Review'. You'll need to verify your Instagram account to submit a review."
      },
      {
        q: "What if I can't find a vendor?",
        a: "Use our search bar to look for the vendor. If they're not listed, you can add them to our platform using their Instagram username."
      }
    ]
  },
  {
    category: "For Vendors",
    questions: [
      {
        q: "How do I add my business?",
        a: "Click 'Add Your Business' in the navigation bar, enter your Instagram username, and follow the verification process."
      },
      {
        q: "Can I respond to reviews?",
        a: "Yes, verified vendors can respond to customer reviews through their vendor dashboard."
      }
    ]
  }
];