import { Request, Response } from 'express';
import { authService } from './auth.service';
import { successResponse } from '../../utils/api-response';
import { catchAsync } from '../../utils/catch-async';
import { RegisterDto, LoginDto } from '@hospeon/shared';

export const register = catchAsync(async (req: Request, res: Response) => {
  const data: RegisterDto = req.body;
  const result = await authService.register(data);
  return successResponse(res, result, 'Registration successful', 201);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const data: LoginDto = req.body;
  const result = await authService.login(data);
  return successResponse(res, result, 'Login successful', 200);
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  // req.user is set by the auth middleware
  const userId = req.user!.userId;
  const user = await authService.getCurrentUser(userId);
  return successResponse(res, user, 'Current user fetched');
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  // In a JWT-only setup without refresh tokens, logout is mostly handled client-side.
  // We just return a success response.
  return successResponse(res, null, 'Logged out successfully');
});
