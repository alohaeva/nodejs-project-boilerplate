import z from 'zod';
import mongoose from 'mongoose';

import { parseNumber } from '../utils/parse/parseNumber.ts';

export const todoDTOSchema = z.object({
  id: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), 'id value is not valid ObjectId'),
  action: z.string({
    message: 'field should be string',
  }),
});

export const createTodoSchema = z.object({
  action: z.string({
    message: 'field should be string',
  }),
});

export const updateTodoSchema = z.object({
  action: z
    .string({
      message: 'field should be string',
    })
    .optional(),
});

export const listTodosOptionsSchema = z.object({
  offset: z
    .string()
    .optional()
    .transform(value => parseNumber(value, 0)),
  limit: z
    .string()
    .optional()
    .transform(value => parseNumber(value, 10)),
});

export type TodoDTO = z.infer<typeof todoDTOSchema>;
export type CreateTodo = z.infer<typeof createTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
export type ListTodosOptions = z.infer<typeof listTodosOptionsSchema>;
