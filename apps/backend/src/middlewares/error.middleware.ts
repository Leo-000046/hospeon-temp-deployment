import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/app-error';
import { logger } from '../lib/logger';
import { errorResponse } from '../utils/api-response';
import { HTTP_STATUS } from '../constants/http-status';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({ err, path: req.path }, err.message);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(errorResponse(err.message));
  }

  if (err instanceof ZodError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse('Validation Error', err.errors));
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse('Internal Server Error'));
};
