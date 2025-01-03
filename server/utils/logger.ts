import winston from 'winston';
import { config } from '../config/index.js';

export const logger = winston.createLogger({
  level: config.isDevelopment ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

if (config.isProduction) {
  logger.add(
    new winston.transports.File({ 
      filename: 'error.log', 
      level: 'error',
      dirname: 'logs',
    })
  );
  logger.add(
    new winston.transports.File({ 
      filename: 'combined.log',
      dirname: 'logs',
    })
  );
}