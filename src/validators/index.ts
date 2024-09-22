import { postHelloMessageSchema } from '../dtos/hello.ts';
import { createTodoSchema, updateTodoSchema } from '../dtos/TodoDTO.ts';

export const validateHelloPayload = (data: Record<string, string>) => {
  return postHelloMessageSchema.safeParse(data);
};

export const validateCreateToDoPayload = (data: Record<string, string>) => {
  return createTodoSchema.safeParse(data);
};

export const validateUpdateToDoPayload = (data: Record<string, string>) => {
  return updateTodoSchema.safeParse(data);
};
