import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';
import { setupSecurity } from './middleware/security';
import { config } from './config';
import { logger } from './utils/logger';
import vendorRoutes from './routes/vendors';
import reviewRoutes from './routes/reviews';
import authRoutes from './routes/auth';

const prisma = new PrismaClient();
const app = express();

// Security middleware
setupSecurity(app);

// Standard middleware
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));
app.use(express.json());
app.use(apiLimiter);

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

// Routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
// Error handler middleware
app.use(errorHandler);

// Initialize database
async function initializeDatabase() {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
}

const PORT = config.port;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
  });
});