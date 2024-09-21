import { Request, Response, Router } from 'express';
import { StatusCode } from 'status-code-enum';

import { validationMiddleware } from '../../../validators/validationMiddleware.ts';
import { sendResponse } from '../../helpers/sendResponse.ts';
import MongoDBConnection from '../../../connectors/mongo/index.ts';
import { validateCreateToDoPayload, validateUpdateToDoPayload } from '../../../validators/index.ts';
import { TodosRepository } from '../../../repositories/ItemRepository.ts';
import { TodosService } from '../../../services/TodosService.ts';

export const todosRouter = Router();

const todosRepo = new TodosRepository({
  connection: MongoDBConnection,
});

const todosService = new TodosService(todosRepo);

todosRouter.post('/', validationMiddleware(validateCreateToDoPayload), async (_: Request, res: Response) => {
  const result = await todosService.create(res.locals.payload);

  return sendResponse(res, {
    result,
    status: StatusCode.SuccessOK,
    success: true,
  });
});

todosRouter.patch('/:id', validationMiddleware(validateUpdateToDoPayload), async (req: Request, res: Response) => {
  const result = await todosService.update(req.params.id, res.locals.payload);

  return sendResponse(res, {
    result,
    status: StatusCode.SuccessOK,
    success: true,
  });
});

todosRouter.get('/:id', async (req: Request, res: Response) => {
  const result = await todosService.get(req.params.id);

  return sendResponse(res, {
    result,
    status: StatusCode.SuccessOK,
    success: true,
  });
});

todosRouter.delete('/:id', async (req: Request, res: Response) => {
  const result = await todosService.delete(req.params.id);

  return sendResponse(res, {
    result,
    status: StatusCode.SuccessOK,
    success: true,
  });
});

todosRouter.get('/', async (_: Request, res: Response) => {
  const result = await todosService.list();

  return sendResponse(res, {
    result,
    status: StatusCode.SuccessOK,
    success: true,
  });
});
