import _ from 'lodash';
import camelcaseKeys from 'camelcase-keys';
import type { PoolClient } from 'pg';
import type { Account, Maybe } from '../types';
import { getClient } from '../db';

const getAccounts = async (): Promise<Account[]> => {
  const sql = 'SELECT * FROM accounts;';
  const client = await getClient();
  const result = await client.query(sql);

  client.release();
  return camelcaseKeys(result.rows);
};

const getAccount = async (id: string): Promise<Maybe<Account>> => {
  const sql = 'SELECT * FROM accounts WHERE id = $1;';
  const client = await getClient();
  const result = await client.query(sql, [id]);

  client.release();
  return _.head(camelcaseKeys(result.rows));
};

type CreateAccountInput = {
  name: string;
  balance: string;
};

const createAccount = async (input: CreateAccountInput): Promise<Account> => {
  const sql =
    'INSERT INTO accounts (name, balance) VALUES ($1, $2::numeric) RETURNING *;';
  const client = await getClient();
  const result = await client.query(sql, [input.name, input.balance]);

  client.release();
  return _.head(camelcaseKeys(result.rows));
};

const getAndLockAccount = async (
  id: string,
  client: PoolClient,
): Promise<Maybe<Account>> => {
  const sql = 'SELECT * FROM accounts WHERE id = $1 FOR UPDATE;';
  const result = await client.query(sql, [id]);

  return _.head(camelcaseKeys(result.rows));
};

const transferFunds = async (
  sender: string,
  receiver: string,
  amount: string,
  client: PoolClient,
) => {
  const sql =
    'UPDATE accounts SET balance = balance - $1::numeric WHERE id = $2;';
  const sqlNext =
    'UPDATE accounts SET balance = balance + $1::numeric WHERE id = $2;';

  await client.query(sql, [amount, sender]);
  await client.query(sqlNext, [amount, receiver]);
};

export default {
  getAccounts,
  getAccount,
  getAndLockAccount,
  createAccount,
  transferFunds,
};
