import { z } from 'zod';
import { Role } from '../enums';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.nativeEnum(Role).optional(),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export interface AuthResponseDto {
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
  accessToken: string;
}
