import { postHelloMessageSchema } from '../dtos/hello.ts';
import { createTodoSchema, updateTodoSchema } from '../dtos/TodoDTO.ts';
import { authenticateSchema } from '../dtos/TokenDTO.ts';

export const validateHelloPayload = (data: Record<string, string>) => {
  return postHelloMessageSchema.safeParse(data);
};

export const validateCreateToDoPayload = (data: Record<string, string>) => {
  return createTodoSchema.safeParse(data);
};

export const validateUpdateToDoPayload = (data: Record<string, string>) => {
  return updateTodoSchema.safeParse(data);
};

export const validateAuthPayload = (data: Record<string, string>) => {
  return authenticateSchema.safeParse(data);
};
