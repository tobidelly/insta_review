import React from 'react';
import { Star, TrendingUp, Award, ThumbsUp } from 'lucide-react';

const successStories = [
  {
    vendorName: "Artisan Bakery",
    username: "artisan_bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=60",
    story: "Started as a small home bakery, now serving nationwide with over 10,000 happy customers. InstaReview helped us build trust and credibility.",
    rating: 4.9,
    reviews: 512,
    growth: "300%"
  },
  {
    vendorName: "Tech Gadgets Hub",
    username: "tech_gadgets_hub",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=60",
    story: "Verification through InstaReview doubled our conversion rate. Customers feel more confident buying from a verified vendor.",
    rating: 4.8,
    reviews: 256,
    growth: "150%"
  },
  {
    vendorName: "Fashionista Boutique",
    username: "fashionista_boutique",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=60",
    story: "The transparent review system helped us improve our service based on customer feedback. Our sales have tripled since joining.",
    rating: 4.7,
    reviews: 789,
    growth: "200%"
  }
];

const SuccessStories: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how vendors transformed their businesses through trust and transparency
          </p>
        </div>

        <div className="grid gap-12 mt-16">
          {successStories.map((story, index) => (
            <div 
              key={story.username}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-1/2">
                <img
                  src={story.image}
                  alt={story.vendorName}
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
              
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {story.vendorName}
                  </h2>
                  <p className="text-purple-600">@{story.username}</p>
                </div>

                <blockquote className="text-lg text-gray-700 italic">
                  "{story.story}"
                </blockquote>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Star className="h-6 w-6 text-yellow-400 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {story.rating}
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <ThumbsUp className="h-6 w-6 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {story.reviews}
                    </div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <TrendingUp className="h-6 w-6 text-green-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {story.growth}
                    </div>
                    <div className="text-sm text-gray-600">Growth</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-2xl shadow-sm p-8 text-center">
          <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Success Story
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Start building trust with your customers today. Join thousands of successful vendors on InstaReview.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Add Your Business
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;