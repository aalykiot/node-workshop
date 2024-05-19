import asyncHandler from 'express-async-handler';
import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import accountService from '../services/accountService';
import { accountByIdSchema } from '../schemas/accountSchema';
import { ApiError } from '../utils/errors';

const getAccounts = asyncHandler(async (req: Request, res: Response) => {
  const accounts = await accountService.getAccounts();
  res.status(httpStatus.OK).send(accounts);
});

const getAccountById = asyncHandler(async (req: Request, res: Response) => {
  // Validate URL request param.
  const { success, data, error } = accountByIdSchema.safeParse(req.params.id);
  if (!success) {
    const message = error.errors.map((e) => e.message)[0];
    throw new ApiError(httpStatus.BAD_REQUEST, message);
  }

  const account = await accountService.getAccountById(data);
  if (!account) throw new ApiError(httpStatus.NOT_FOUND, 'Account Not Found.');

  res.status(httpStatus.OK).send(account);
});

const createAccount = asyncHandler(async (req: Request, res: Response) => {
  const account = await accountService.createAccount(req.body);
  res.status(httpStatus.CREATED).send(account);
});

export default {
  getAccounts,
  getAccountById,
  createAccount,
};
