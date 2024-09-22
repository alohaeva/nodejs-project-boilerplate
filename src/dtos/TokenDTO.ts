import z from 'zod';
import mongoose from 'mongoose';

import { Token } from '../types.ts';

export const tokenDTOSchema = z.object({
  id: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), 'id value is not valid ObjectId'),
  type: z.nativeEnum(Token),
  value: z.string({
    message: 'action is required',
  }),
});

export const updateTokenSchema = z.object({
  value: z.string().optional(),
});

export const createTokenSchema = z.object({
  type: z.nativeEnum(Token),
  email: z.string(),
});

export type TokenDTO = z.infer<typeof tokenDTOSchema>;
export type UpdateToken = z.infer<typeof updateTokenSchema>;
export type CreateToken = z.infer<typeof createTokenSchema>;
