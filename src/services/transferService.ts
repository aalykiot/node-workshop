import httpStatus from 'http-status';
import accountRepository from '../repositories/accountRepository';
import transferRepository from '../repositories/transferRepository';
import { executeTransaction } from '../database/transaction';
import type { NewTransfer } from '../types';
import { ApiError } from '../utils/errors';

const makeTransfer = async (transfer: NewTransfer) => {
  return executeTransaction(async (trx) => {
    const { fromAccount, toAccount, amount } = transfer;
    // We need to lock the accounts before the transfer.
    const sender = await accountRepository.findAndLockAccount(trx, fromAccount);
    const receiver = await accountRepository.findAndLockAccount(trx, toAccount);

    if (!sender || !receiver) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid accounts provided.');
    }

    if (sender.balance < amount) {
      const message = 'Insufficient balance in the account.';
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, message);
    }

    await transferRepository.executeTransfer(trx, transfer);
    return transferRepository.registerTransfer(trx, transfer);
  });
};

export default {
  makeTransfer,
};
