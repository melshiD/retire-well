import { createCorsHandler } from '@liquidmetal-ai/raindrop-framework/core/cors';

/**
 * CORS enabled for RetireWell frontend
 * Allows credentials (cookies) for session management
 */
export const cors = createCorsHandler({
  origin: '*', // Allow all origins for development - restrict in production
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
});
