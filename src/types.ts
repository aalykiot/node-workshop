export type Maybe<T> = T | null | undefined;

export interface Account {
  id: string;
  name: string;
  balance: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: string;
  createdAt: Date;
  updatedAt: Date;
}
