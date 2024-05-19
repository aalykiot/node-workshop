import accountRepository from '../repositories/accountRepository';
import type { NewAccount } from '../types';

const getAccounts = () => {
  return accountRepository.findAccounts();
};

const getAccountById = (id: string) => {
  return accountRepository.findAccountById(id);
};

const createAccount = (account: NewAccount) => {
  return accountRepository.createAccount(account);
};

export default {
  getAccounts,
  getAccountById,
  createAccount,
};
