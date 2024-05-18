import _ from 'lodash';
import type { PoolClient } from 'pg';
import camelcaseKeys from 'camelcase-keys';
import { getClient } from '../db';
import type { Transaction } from '../types';

const getTransactionLogs = async (): Promise<Transaction[]> => {
  const sql = 'SELECT * FROM transactions;';
  const client = await getClient();
  const result = await client.query(sql);

  client.release();
  return camelcaseKeys(result.rows);
};

type CreateTransactionInput = {
  from: string;
  to: string;
  amount: string;
};

const createTransactionLog = async (
  input: CreateTransactionInput,
  client: PoolClient,
): Promise<Transaction> => {
  const sql =
    'INSERT INTO transactions (sender, receiver, amount) VALUES ($1, $2, $3) RETURNING *;';
  const { from, to, amount } = input;
  const result = await client.query(sql, [from, to, amount]);

  return _.head(camelcaseKeys(result.rows));
};

export default {
  getTransactionLogs,
  createTransactionLog,
};
