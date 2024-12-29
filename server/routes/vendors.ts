import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { fetchInstagramProfile } from '../services/instagram';

const router = Router();
const prisma = new PrismaClient();

const vendorSchema = z.object({
  username: z.string().min(1),
  businessName: z.string().min(1),
  profileImage: z.string().url().optional(),
  bio: z.string().optional(),
});