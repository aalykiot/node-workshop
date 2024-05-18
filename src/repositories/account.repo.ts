import _ from 'lodash';
import camelcaseKeys from 'camelcase-keys';
import type { Account, Maybe } from '../types';
import { getClient } from '../db';

const getAccounts = async (): Promise<Account[]> => {
  const sql = 'SELECT * FROM accounts;';
  const client = await getClient();
  const result = await client.query(sql);

  return camelcaseKeys(result.rows);
};

const getAccount = async (id: string): Promise<Maybe<Account>> => {
  const sql = 'SELECT * FROM accounts WHERE id = $1;';
  const client = await getClient();
  const result = await client.query(sql, [id]);

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

  return _.head(camelcaseKeys(result.rows));
};

export default {
  getAccounts,
  getAccount,
  createAccount,
};
