import type { Transaction } from 'kysely';
import { db } from './client';
import type { Database } from '../types';

type TrxCallback<T> = (trx: Transaction<Database>) => Promise<T>;

export async function executeTransaction<T>(
  callback: TrxCallback<T>,
): Promise<T> {
  return db
    .transaction()
    .setIsolationLevel('repeatable read')
    .execute((trx) => callback(trx));
}
