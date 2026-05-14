import { Response } from 'express';

export const successResponse = <T>(
  res: Response,
  data: T | null = null,
  message = 'Success',
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (message: string, error?: any) => {
  return {
    success: false,
    message,
    ...(error && { error }),
  };
};
