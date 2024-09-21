import { postHelloMessageSchema } from '../dtos/hello.ts';
import { createTodoEntitySchema, updateTodoEntitySchema } from '../entities/TodoEntity.ts';

export const validateHelloPayload = (data: Record<string, string>) => {
  return postHelloMessageSchema.safeParse(data);
};

export const validateCreateToDoPayload = (data: Record<string, string>) => {
  return createTodoEntitySchema.safeParse(data);
};

export const validateUpdateToDoPayload = (data: Record<string, string>) => {
  return updateTodoEntitySchema.safeParse(data);
};
