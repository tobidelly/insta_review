import axios from 'axios';

interface InstagramProfile {
  username: string;
  businessName: string;
  profileImage: string;
  bio: string;
}

export async function fetchInstagramProfile(username: string): Promise<InstagramProfile> {
  try {
    // In production, this would use Instagram's Graph API with proper authentication
    // For demo purposes, we'll simulate the API response
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a consistent but random-looking profile image
    const imageId = Buffer.from(username).toString('hex').slice(0, 10);
    
    return {
      username,
      businessName: username.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      profileImage: `https://images.unsplash.com/photo-${imageId}?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3`,
      bio: `${username} is a business on Instagram. This is a simulated profile.`,
    };
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    throw new Error('Failed to fetch Instagram profile');
  }
}