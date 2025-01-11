import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the structure of the Instagram profile data
interface InstagramProfile {
  username: string;
  businessName: string;
  profileImage: string;
  bio: string;
}

// Fetch the Instagram profile using the Graph API
export async function fetchInstagramProfile(username: string): Promise<InstagramProfile> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN; // Access token from environment variables

  try {
    if (!accessToken) {
      throw new Error('Instagram access token is not defined.');
    }

    // Make a GET request to the Instagram Graph API
    const response = await axios.get(`https://graph.instagram.com/${username}`, {
      params: {
        fields: 'username,account_type,profile_picture_url,bio',
        access_token: accessToken,
      },
    });

    const data = response.data;

    // Transform the response data into the InstagramProfile structure
    return {
      username: data.username,
      businessName: data.account_type === 'BUSINESS' ? 'Business Account' : 'Personal Account',
      profileImage: data.profile_picture_url,
      bio: data.bio || `${data.username} has not set a bio yet.`,
    };
  } catch (error) {
    console.error('Error fetching Instagram profile:', error.message);
    throw new Error('Failed to fetch Instagram profile');
  }
}
