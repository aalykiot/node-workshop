export type Maybe<T> = T | null | undefined;

export interface Account {
  id: string;
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
