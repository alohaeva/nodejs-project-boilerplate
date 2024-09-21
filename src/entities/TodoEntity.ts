import z from 'zod';
import mongoose from 'mongoose';

export const todoEntitySchema = z.object({
  id: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), 'id value is not valid ObjectId'),
  action: z.string({
    message: 'action is required',
  }),
});

export const createTodoEntitySchema = z.object({
  action: z.string({
    message: 'action is required',
  }),
});

export const updateTodoEntitySchema = z.object({
  action: z
    .string({
      message: 'action is required',
    })
    .optional(),
});

export type TodoEntity = z.infer<typeof todoEntitySchema>;
export type CreateTodoEntity = z.infer<typeof createTodoEntitySchema>;
export type UpdateTodoEntity = z.infer<typeof updateTodoEntitySchema>;
