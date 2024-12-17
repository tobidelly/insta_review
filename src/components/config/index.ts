export const config = {
    api: {
      baseURL: import.meta.env.PROD 
        ? 'https://api.instareview.com' // Replace with your production API URL
        : '/api',
      timeout: 10000,
      withCredentials: true,
    },
    instagram: {
      clientId: import.meta.env.VITE_INSTAGRAM_CLIENT_ID,
      redirectUri: import.meta.env.VITE_INSTAGRAM_REDIRECT_URI,
    },
  } as const;