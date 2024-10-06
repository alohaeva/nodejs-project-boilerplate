import { Router, Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';

import { sendResponse } from '../helpers/sendResponse.ts';
import { validationMiddleware } from '../../validators/validationMiddleware.ts';
import { validateHelloPayload } from '../../validators/index.ts';
import { HelloService } from '../../services/HelloService.ts';

import { todosRouter } from './todos/index.ts';
import { authRouter } from './auth/index.ts';

const apiV1Router = Router();

const helloService = new HelloService();

apiV1Router.post('/hello', validationMiddleware(validateHelloPayload), (_: Request, res: Response) => {
  const result = helloService.handler(res.locals.payload);

  return sendResponse(res, {
    result,
    status: StatusCode.SuccessOK,
    success: true,
  });
});

apiV1Router.use('/todos', todosRouter);
apiV1Router.use('/auth', authRouter);

export default apiV1Router;
