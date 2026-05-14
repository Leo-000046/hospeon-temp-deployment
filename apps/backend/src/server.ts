import { createServer } from 'http';
import app from './app';
import { env } from './config/env';
import { logger } from './lib/logger';
import { prisma } from './lib/prisma';

const httpServer = createServer(app);

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');
    
    httpServer.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error(error, 'Failed to start server');
    process.exit(1);
  }
};

startServer();
