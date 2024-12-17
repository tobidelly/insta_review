import { useState, useCallback } from 'react';
import { User } from '../types';

export function useInstagramAuth() {
  const [authenticating, setAuthenticating] = useState(false);

  const authenticate = useCallback(async (username: string): Promise<User> => {
    setAuthenticating(true);
    
    try {
      // In production, this is meant to handle the Instagram OAuth flow
      // Demo's authentication can be simulated
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: User = {
        id: Math.random().toString(36).substring(2),
        username,
        profileImage: `https://images.unsplash.com/photo-${Math.random().toString(36).substring(2)}`,
        verified: true,
      };

      return user;
    } finally {
      setAuthenticating(false);
    }
  }, []);

  return { authenticate, authenticating };
}