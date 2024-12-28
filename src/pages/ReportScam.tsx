import React, { useState } from 'react';
import { AlertTriangle, Search, Shield } from 'lucide-react';
import AddMissingVendorModal from '../components/AddMissingVendorModal';
import { mockVendors } from '../data/mockData';

const ReportScam: React.FC = () => {
    const [username, setUsername] = useState('');
    const [showAddVendor, setShowAddVendor] = useState(false);
    const [foundVendor, setFoundVendor] = useState<typeof mockVendors[0] | null>(null);
    const [description, setDescription] = useState('');
    const [evidence, setEvidence] = useState('');
  
    const handleSearch = () => {
      const vendor = mockVendors.find(
        v => v.username.toLowerCase() === username.toLowerCase().replace('@', '')
      );
      
      if (vendor) {
        setFoundVendor(vendor);
      } else {
        setShowAddVendor(true);
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // In production, this would submit to your API
      alert('Report submitted successfully. We will investigate this case.');
      setUsername('');
      setDescription('');
      setEvidence('');
      setFoundVendor(null);
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Report a Scam</h1>
            <p className="text-lg text-gray-600">
              Help protect our community by reporting suspicious vendors
            </p>
          </div>
  
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram Username
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@username"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Search
                </button>
              </div>
            </div>
  
            {foundVendor && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={foundVendor.profileImage}
                    alt={foundVendor.username}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{foundVendor.businessName}</h3>
                    <p className="text-purple-600">@{foundVendor.username}</p>
                  </div>
                </div>
              </div>
            )}
  
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description of Incident
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                  placeholder="Please provide details about what happened..."
                  required
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evidence (Optional)
                </label>
                <textarea
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
                  rows={2}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                  placeholder="Links to screenshots, messages, or other evidence..."
                />
              </div>
  
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Submit Report
              </button>
            </form>
  
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <Shield className="h-4 w-4 mr-2" />
              Your report will be kept confidential
            </div>
          </div>
        </div>
  
        <AddMissingVendorModal
          isOpen={showAddVendor}
          onClose={() => setShowAddVendor(false)}
          username={username.replace('@', '')}
        />
      </div>
    );
  };
  
  export default ReportScam;