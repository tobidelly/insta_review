import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Lock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: March 16, 2024
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Information We Collect
                </h2>
              </div>
              <div className="pl-8 space-y-4">
                <p className="text-gray-600">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc text-gray-600 pl-5">
                  <li>Instagram account information for verification purposes</li>
                  <li>Contact information (email, phone number)</li>
                  <li>Review content and ratings</li>
                  <li>Communications with our support team</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  How We Use Your Information
                </h2>
              </div>
              <div className="pl-8 space-y-4">
                <p className="text-gray-600">
                  We use the collected information for:
                </p>
                <ul className="list-disc text-gray-600 pl-5">
                  <li>Verifying user and vendor identities</li>
                  <li>Processing and displaying reviews</li>
                  <li>Improving our services</li>
                  <li>Communicating with you about your account</li>
                  <li>Preventing fraud and abuse</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center mb-4">
                <UserCheck className="h-6 w-6 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Information Sharing
                </h2>
              </div>
              <div className="pl-8">
                <p className="text-gray-600 mb-4">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc text-gray-600 pl-5 mb-4">
                  <li>Service providers who assist in our operations</li>
                  <li>Law enforcement when required by law</li>
                  <li>Other users (only your public profile information)</li>
                </ul>
                <p className="text-gray-600">
                  All third-party services we use are bound by confidentiality agreements.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Rights
              </h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc text-gray-600 pl-5">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Security
              </h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information, including:
              </p>
              <ul className="list-disc text-gray-600 pl-5">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Continuous monitoring for suspicious activities</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <p className="text-gray-600">
                  Email: privacy@instareview.com<br />
                  Address: 123 Review Street, New York, NY 10001<br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;