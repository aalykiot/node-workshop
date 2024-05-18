import _ from 'lodash';
import httpStatus from 'http-status';
import type { Request, Response } from 'express';
import accountRepo from '../repositories/account';
import { ApiError } from '../utils/errors';

const getAccounts = async (_req: Request, res: Response) => {
  const accounts = await accountRepo.getAccounts();
  res.status(httpStatus.OK).send(accounts);
};

const getAccount = async (req: Request, res: Response) => {
  const id = _.get(req.params, 'id');
  const account = await accountRepo.getAccount(id);
  if (!account) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not Found.');
  }
  res.status(httpStatus.OK).send(account);
};

const createAccount = async (req: Request, res: Response) => {
  const account = await accountRepo.createAccount(req.body);
  res.status(httpStatus.CREATED).send(account);
};

export default {
  getAccounts,
  getAccount,
  createAccount,
};
