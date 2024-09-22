import { Router, Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';

import { helloRoute } from '../../routes/v1/index.ts';
import { sendResponse } from '../helpers/sendResponse.ts';
import { validationMiddleware } from '../../validators/validationMiddleware.ts';

import { todosRouter } from './todos/index.ts';
import { authRouter } from './auth/index.ts';

const apiV1Router = Router();

apiV1Router.post(helloRoute.path, validationMiddleware(helloRoute.payloadValidator), (_: Request, res: Response) => {
  const result = helloRoute.handler(res.locals.payload);

  return sendResponse(res, {
    result,
    status: StatusCode.SuccessOK,
    success: true,
  });
});

apiV1Router.use('/todos', todosRouter);
apiV1Router.use('/auth', authRouter);

export default apiV1Router;
