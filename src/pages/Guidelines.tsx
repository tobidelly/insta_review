import React from 'react';
import { Shield, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

const Guidelines: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Vendor Guidelines</h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about being a successful vendor on InstaReview
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Create Your Profile</h3>
                  <p className="text-gray-600">Verify your Instagram business account and complete your profile with accurate information.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Add Business Details</h3>
                  <p className="text-gray-600">Include clear descriptions, contact information, and shipping policies.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Best Practices</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <HelpCircle className="h-6 w-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Respond to Reviews</h3>
                  <p className="text-gray-600">Engage with customer feedback professionally and address concerns promptly.</p>
                </div>
              </div>
              <div className="flex items-start">
                <HelpCircle className="h-6 w-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Maintain Transparency</h3>
                  <p className="text-gray-600">Keep your policies, pricing, and shipping information up to date.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rules and Policies</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Prohibited Practices</h3>
                  <ul className="list-disc list-inside text-gray-600 ml-4">
                    <li>Fake reviews or ratings</li>
                    <li>Misleading product information</li>
                    <li>Harassment of customers</li>
                    <li>Spam or promotional abuse</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;