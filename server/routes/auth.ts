import { Router } from 'express';
import { z } from 'zod';
import { config } from '../config';
import { logger } from '../utils/logger';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const instagramCallbackSchema = z.object({
  code: z.string(),
  state: z.string().optional(),
});

router.get('/instagram/callback', async (req, res) => {
  try {
    const { code } = instagramCallbackSchema.parse(req.query);
    
    // Exchange code for access token
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: config.instagram.clientId,
        client_secret: config.instagram.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: config.instagram.redirectUri,
        code,
      }),
    });

    const { access_token, user_id } = await tokenResponse.json();

    // Get user profile
    const profileResponse = await fetch(`https://graph.instagram.com/v12.0/${user_id}?fields=id,username&access_token=${access_token}`);
    const profile = await profileResponse.json();

    // Create or update user
    const user = await prisma.user.upsert({
      where: { username: profile.username },
      update: { verified: true },
      create: {
        username: profile.username,
        verified: true,
      },
    });

    // Generate JWT token
    const token = generateToken(user);

    res.redirect(`/?token=${token}`);
  } catch (error) {
    logger.error('Instagram callback error:', error);
    res.redirect('/?error=auth_failed');
  }
});

export default router;