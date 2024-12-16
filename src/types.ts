export interface Vendor {
    id: string;
    username: string;
    businessName: string;
    profileImage: string;
    rating: number;
    reviewCount: number;
    latestReview: string;
  }
  
  export interface Review {
    id: string;
    vendorId: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
      username: string;
      profileImage: string;
      verified: boolean;
    };
  }
  
  export interface User {
    id: string;
    username: string;
    profileImage: string;
    verified: boolean;
  }