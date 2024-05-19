import { z } from 'zod';

export const accountByIdSchema = z.string().uuid('Not a valid UUID value.');

export const accountCreationSchema = z.object({
  fullName: z.string().max(30, 'Name must be max 30 characters.'),
  email: z.string().email('Not a valid email address.'),
  balance: z.number().optional(),
});
