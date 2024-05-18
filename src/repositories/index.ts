import type { PoolClient } from 'pg';
import { getClient } from '../db';

type TxCallback<T> = (client: PoolClient) => Promise<T>;

export async function executeTransaction<T>(
  callback: TxCallback<T>,
): Promise<T> {
  const client = await getClient();
  try {
    await client.query('BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;');
    const result = await callback(client);
    await client.query('COMMIT;');
    return result;
  } catch (err) {
    await client.query('ROLLBACK;');
    throw err;
  } finally {
    client.release();
  }
}
