import httpStatus from 'http-status';
import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { ApiError } from '../utils/errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = err.errors.map((issue) => issue.message);
        const message = errorMessages[0];
        throw new ApiError(httpStatus.BAD_REQUEST, message);
      }
      throw err;
    }
  };
}
