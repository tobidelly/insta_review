import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create sample users
    const user1 = await prisma.user.create({
      data: {
        username: 'john_doe',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        verified: true,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        username: 'jane_smith',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        verified: true,
      },
    });

    // Create sample vendors
    const vendor1 = await prisma.vendor.create({
      data: {
        username: 'fashionista_boutique',
        businessName: 'Fashionista Boutique',
        profileImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
        bio: 'Your one-stop shop for trendy fashion.',
        verified: true,
      },
    });

    const vendor2 = await prisma.vendor.create({
      data: {
        username: 'tech_gadgets_hub',
        businessName: 'Tech Gadgets Hub',
        profileImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
        bio: 'Latest tech gadgets at the best prices.',
        verified: true,
      },
    });

    // Create sample reviews
    await prisma.review.createMany({
      data: [
        {
          userId: user1.id,
          vendorId: vendor1.id,
          rating: 5,
          comment: 'Amazing quality and service! Will definitely shop again.',
        },
        {
          userId: user2.id,
          vendorId: vendor1.id,
          rating: 4,
          comment: 'Great products but shipping took a bit longer than expected.',
        },
        {
          userId: user1.id,
          vendorId: vendor2.id,
          rating: 5,
          comment: 'Best tech store on Instagram! Fast shipping and authentic products.',
        },
      ],
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();