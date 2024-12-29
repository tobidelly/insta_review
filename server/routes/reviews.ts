import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10),
  userId: z.string().uuid(),
  vendorId: z.string().uuid(),
});