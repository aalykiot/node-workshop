import type { Generated, ColumnType, Selectable, Insertable } from 'kysely';

export type Maybe<T> = T | null | undefined;

export interface Database {
  accounts: AccountsTable;
  transfers: TransfersTable;
}

export interface AccountsTable {
  id: Generated<string>;
  fullName: string;
  email: string;
  balance: number;
  createdAt: Generated<ColumnType<Date>>;
  updatedAt: Generated<ColumnType<Date>>;
}

export interface TransfersTable {
  id: number;
  fromAccount: string;
  toAccount: string;
  amount: number;
  createdAt: Generated<ColumnType<Date>>;
}

export type Account = Selectable<AccountsTable>;
export type NewAccount = Insertable<AccountsTable>;

export type Transfer = Selectable<TransfersTable>;
export type NewTransfer = Insertable<TransfersTable>;
