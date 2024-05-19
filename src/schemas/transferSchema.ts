import { z } from 'zod';

export const transferMakeSchema = z.object({
  fromAccount: z.string().uuid('Sender account not a valid UUID.'),
  toAccount: z.string().uuid('Sender account not a valid UUID.'),
  amount: z.number(),
});
