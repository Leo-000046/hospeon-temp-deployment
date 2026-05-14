/// <reference types="vite/client" />
import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url('VITE_API_BASE_URL must be a valid URL').default('http://localhost:5000/api/v1'),
  VITE_SOCKET_URL: z.string().url('VITE_SOCKET_URL must be a valid URL').optional(),
});

const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
}

export const env = _env.success ? _env.data : { VITE_API_BASE_URL: 'http://localhost:5000/api/v1', VITE_SOCKET_URL: undefined };
