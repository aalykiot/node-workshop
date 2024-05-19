import type { Transaction } from 'kysely';
import type { Database, NewTransfer } from '../types';

const registerTransfer = async (
  trx: Transaction<Database>,
  transfer: NewTransfer,
) => {
  return trx
    .insertInto('transfers')
    .values(transfer)
    .returningAll()
    .executeTakeFirstOrThrow();
};

const executeTransfer = async (
  trx: Transaction<Database>,
  { fromAccount, toAccount, amount }: NewTransfer,
) => {
  // Take amount from sender.
  await trx
    .updateTable('accounts')
    .set((eb) => ({
      balance: eb('balance', '-', amount),
    }))
    .where('id', '=', fromAccount)
    .execute();

  // Apply amount to receiver.
  await trx
    .updateTable('accounts')
    .set((eb) => ({
      balance: eb('balance', '+', amount),
    }))
    .where('id', '=', toAccount)
    .execute();
};

export default {
  executeTransfer,
  registerTransfer,
};
