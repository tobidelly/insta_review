import { useState, useCallback } from 'react';
import { User } from '../types';

export function useInstagramAuth() {
  const [authenticating, setAuthenticating] = useState(false);

  const authenticate = useCallback(async (username: string): Promise<User> => {
    setAuthenticating(true);
    