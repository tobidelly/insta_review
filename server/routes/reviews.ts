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

// Get reviews for a vendor
router.get('/vendor/:vendorId', async (req, res) => {
  const { page = '1', limit = '10' } = req.query;
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

  try {
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { vendorId: req.params.vendorId },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit as string),
      }),
      prisma.review.count({
        where: { vendorId: req.params.vendorId },
      }),
    ]);

    res.json({
      reviews,
      pagination: {
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
        currentPage: parseInt(page as string),
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add new review
router.post('/', async (req, res) => {
  try {
    const validatedData = reviewSchema.parse(req.body);

    // Check if user has already reviewed this vendor
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: validatedData.userId,
        vendorId: validatedData.vendorId,
      },
    });

    if (existingReview) {
      return res.status(409).json({ error: 'User has already reviewed this vendor' });
    }

    const review = await prisma.review.create({
      data: validatedData,
      include: {
        user: true,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

export default router;