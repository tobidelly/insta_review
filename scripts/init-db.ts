import { PrismaClient } from '@prisma/client';
import { logger } from '../server/utils/logger';

const prisma = new PrismaClient();

async function initializeDatabase() {
  try {
    // Run migrations
    await prisma.$executeRaw`SELECT 1`;
    logger.info('Database connection verified');

    // Run seeds if in development
    if (process.env.NODE_ENV === 'development') {
      const seedModule = await import('../prisma/seed');
      await seedModule.default();
      logger.info('Database seeded successfully');
    }

    logger.info('Database initialization completed');
  } catch (error) {
    logger.error('Database initialization failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

initializeDatabase();