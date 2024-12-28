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

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>("General");
  const [showChat, setShowChat] = useState(false);

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <HelpCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 mb-8">
            Find answers to common questions or chat with our support team
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-purple-100 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((category) => (
            <div key={category.category} className="bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setOpenCategory(
                  openCategory === category.category ? null : category.category
                )}
                className="w-full px-6 py-4 flex justify-between items-center"
              >
                <h2 className="text-lg font-semibold text-gray-900">
                  {category.category}
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transform transition-transform ${
                    openCategory === category.category ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openCategory === category.category && (
                <div className="px-6 pb-4">
                  {category.questions.map((faq, index) => (
                    <div
                      key={index}
                      className={`py-4 ${
                        index !== 0 ? 'border-t border-gray-100' : ''
                      }`}
                    >
                      <h3 className="font-medium text-gray-900 mb-2">
                        {faq.q}
                      </h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm p-6 text-center">
          <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Still need help?
          </h2>
          <p className="text-gray-600 mb-4">
            Our support team is here to assist you
          </p>
          <button
            onClick={() => setShowChat(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Chat with Support
          </button>
        </div>
      </div>

      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Chat with Support</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-600 text-center">
                Our support team will be with you shortly. Average response time is under 5 minutes.
              </p>
            </div>
            <textarea
              placeholder="Type your message here..."
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32 resize-none"
            />
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;