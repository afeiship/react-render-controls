/**
 * Check if running in development mode
 */
export const isDev =
  typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';

