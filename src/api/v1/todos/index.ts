import { Request, Response, Router } from 'express';
import { StatusCode } from 'status-code-enum';

import { validationMiddleware } from '../../../validators/validationMiddleware.ts';
import { sendResponse } from '../../helpers/sendResponse.ts';
import MongoDBConnection from '../../../connectors/mongo/index.ts';
import { validateCreateToDoPayload, validateUpdateToDoPayload } from '../../../validators/index.ts';
import { TodosRepository } from '../../../repositories/ItemRepository.ts';
import { TodosService } from '../../../services/TodosService.ts';
import { authMiddleware } from '../../authMiddleware.ts';
import { Roles, Scopes } from '../../../types.ts';

export const todosRouter = Router();

const todosRepo = new TodosRepository({
  connection: MongoDBConnection,
});

const todosService = new TodosService(todosRepo);

/**
 * @swagger
 * /v1/todos:
 *   post:
 *     summary: Creates new record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 description: action property indicating what should be done
 *                 example: Update documentation
 *     responses:
 *       200:
 *         description: A successful response
 */
todosRouter.post(
  '/',
  authMiddleware(Roles.User, Scopes.Write),
  validationMiddleware(validateCreateToDoPayload),
  async (_: Request, res: Response) => {
    const result = await todosService.create(res.locals.payload);

    return sendResponse(res, {
      result,
      status: StatusCode.SuccessOK,
      success: true,
    });
  }
);

/**
 * @swagger
 * /v1/todos/{id}:
 *   patch:
 *     summary: Updates new record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo item to update.
 *         schema:
 *           type: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 description: action property indicating what should be done
 *                 example: Update documentation
 *     responses:
 *       200:
 *         description: A successful response
 */
todosRouter.patch(
  '/:id',
  authMiddleware(Roles.User, Scopes.Write),
  validationMiddleware(validateUpdateToDoPayload),
  async (req: Request, res: Response) => {
    const result = await todosService.update(req.params.id, res.locals.payload);

    return sendResponse(res, {
      result,
      status: StatusCode.SuccessOK,
      success: true,
    });
  }
);

/**
 * @swagger
 * /v1/todos/{id}:
 *   delete:
 *     summary: Delete existing record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo item to delete.
 *         schema:
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: A successful response
 */
todosRouter.delete('/:id', authMiddleware(Roles.Admin, Scopes.Write), async (req: Request, res: Response) => {
  const result = await todosService.delete(req.params.id);

  return sendResponse(res, {
    result,
    status: StatusCode.SuccessOK,
    success: true,
  });
});

/**
 * @swagger
 * /v1/todos/{id}:
 *   get:
 *     summary: Retrieve existing record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo item to retrieve.
 *         schema:
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: A successful response
 */
todosRouter.get('/:id', authMiddleware(Roles.User, Scopes.Read), async (req: Request, res: Response) => {
  const result = await todosService.get(req.params.id);

  return sendResponse(res, {
    result,
    status: StatusCode.SuccessOK,
    success: true,
  });
});

/**
 * @swagger
 * /v1/todos:
 *   get:
 *     summary: Retrieve list of records
 *     responses:
 *       200:
 *         description: A successful response
 */
todosRouter.get('/', authMiddleware(Roles.User, Scopes.Read), async (_: Request, res: Response) => {
  const result = await todosService.list();

  return sendResponse(res, {
    result,
    status: StatusCode.SuccessOK,
    success: true,
  });
});
