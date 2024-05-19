/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errors';
import { logger } from '../utils/logger';

export function handleErrors(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // Handle unknown errors.
  if (!(err instanceof ApiError)) {
    const isError = err instanceof Error;
    const isProduction = process.env.NODE_ENV === 'production';
    const response = {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
      ...(!isProduction && isError && { stack: err.stack }),
    };
    logger.error(err);
    res.status(response.code).send(response);
    return;
  }

  res.status(err.statusCode).send({
    code: err.statusCode,
    message: err.message,
  });
}
