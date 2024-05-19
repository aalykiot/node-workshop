import type { Transaction } from 'kysely';
import { db } from '../database/client';
import type { NewAccount, Database } from '../types';

const findAccounts = async () => {
  return db.selectFrom('accounts').selectAll().execute();
};

const findAccountById = async (id: string) => {
  return db
    .selectFrom('accounts')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
};

const findAndLockAccount = async (trx: Transaction<Database>, id: string) => {
  return trx
    .selectFrom('accounts')
    .where('id', '=', id)
    .selectAll()
    .forUpdate()
    .executeTakeFirst();
};

const createAccount = async (account: NewAccount) => {
  return db
    .insertInto('accounts')
    .values(account)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export default {
  findAccounts,
  findAccountById,
  findAndLockAccount,
  createAccount,
};
