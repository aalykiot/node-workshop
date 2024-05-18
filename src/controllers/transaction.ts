import httpStatus from 'http-status';
import type { Request, Response } from 'express';
import accountRepo from '../repositories/account';
import transactionRepo from '../repositories/transaction';
import { executeTransaction } from '../repositories';
import { ApiError } from '../utils/errors';

const getTransactions = async (req: Request, res: Response) => {
  const transactions = await transactionRepo.getTransactionLogs();
  res.status(httpStatus.OK).send(transactions);
};

type CreateTransactionBody = {
  from: string;
  to: string;
  amount: string;
};

const createTransaction = async (req: Request, res: Response) => {
  const { from, to, amount } = req.body as CreateTransactionBody;
  const result = await executeTransaction(async (client) => {
    // We need to lock the accounts before the transfer.
    const sender = await accountRepo.getAndLockAccount(from, client);
    const receiver = await accountRepo.getAndLockAccount(to, client);

    if (!sender || !receiver) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid accounts provided.');
    }

    // Check if balance is sufficient.
    const balance = Number.parseFloat(sender.balance);
    const transferAmount = Number.parseFloat(amount);

    if (balance < transferAmount) {
      const message = 'Insufficient balance in the account.';
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, message);
    }

    await accountRepo.transferFunds(sender.id, receiver.id, amount, client);
    return transactionRepo.createTransactionLog({ from, to, amount }, client);
  });

  res.status(httpStatus.OK).send(result);
};

export default {
  getTransactions,
  createTransaction,
};
