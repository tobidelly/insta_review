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

// Get all vendors with reviews and stats
router.get('/', async (req, res) => {
    try {
      const vendors = await prisma.vendor.findMany({
        include: {
          reviews: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
          _count: {
            select: { reviews: true },
          },
        },
      });
  
      const formattedVendors = vendors.map(vendor => ({
        id: vendor.id,
        username: vendor.username,
        businessName: vendor.businessName,
        profileImage: vendor.profileImage,
        rating: vendor.reviews.length > 0 
          ? vendor.reviews.reduce((acc, review) => acc + review.rating, 0) / vendor.reviews.length 
          : 0,
        reviewCount: vendor._count.reviews,
        latestReview: vendor.reviews[0]?.comment || '',
      }));
  
      res.json(formattedVendors);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      res.status(500).json({ error: 'Failed to fetch vendors' });
    }
  });
  
  // Search vendors
  router.get('/search', async (req, res) => {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }
  
    try {
      const vendors = await prisma.vendor.findMany({
        where: {
          OR: [
            { username: { contains: query.toLowerCase() } },
            { businessName: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: {
          reviews: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
          _count: {
            select: { reviews: true },
          },
        },
      });
  
      const formattedVendors = vendors.map(vendor => ({
        id: vendor.id,
        username: vendor.username,
        businessName: vendor.businessName,
        profileImage: vendor.profileImage,
        rating: vendor.reviews.length > 0 
          ? vendor.reviews.reduce((acc, review) => acc + review.rating, 0) / vendor.reviews.length 
          : 0,
        reviewCount: vendor._count.reviews,
        latestReview: vendor.reviews[0]?.comment || '',
      }));
  
      res.json(formattedVendors);
    } catch (error) {
      console.error('Error searching vendors:', error);
      res.status(500).json({ error: 'Failed to search vendors' });
    }
  });
  
  // Get vendor by username
  router.get('/:username', async (req, res) => {
    try {
      const vendor = await prisma.vendor.findUnique({
        where: { username: req.params.username },
        include: {
          reviews: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });
  
      if (!vendor) {
        // Try to fetch from Instagram if vendor doesn't exist
        try {
          const instagramProfile = await fetchInstagramProfile(req.params.username);
          return res.json({
            exists: false,
            profile: instagramProfile,
          });
        } catch (error) {
          return res.status(404).json({ error: 'Vendor not found' });
        }
      }
  
      res.json({ exists: true, vendor });
    } catch (error) {
      console.error('Error fetching vendor:', error);
      res.status(500).json({ error: 'Failed to fetch vendor' });
    }
  });
  
  // Add new vendor
  router.post('/', async (req, res) => {
    try {
      const validatedData = vendorSchema.parse(req.body);
      
      // Check if vendor already exists
      const existingVendor = await prisma.vendor.findUnique({
        where: { username: validatedData.username },
      });
  
      if (existingVendor) {
        return res.status(409).json({ error: 'Vendor already exists' });
      }
  
      // Fetch Instagram profile if not provided
      if (!validatedData.profileImage || !validatedData.bio) {
        try {
          const instagramProfile = await fetchInstagramProfile(validatedData.username);
          validatedData.profileImage = instagramProfile.profileImage;
          validatedData.bio = instagramProfile.bio;
        } catch (error) {
          console.error('Error fetching Instagram profile:', error);
        }
      }
  
      const vendor = await prisma.vendor.create({
        data: validatedData,
      });
  
      res.status(201).json(vendor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error('Error creating vendor:', error);
      res.status(500).json({ error: 'Failed to create vendor' });
    }
});
  
export default router;