import { Router, Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';

import { sendResponse } from '../helpers/sendResponse.ts';
import { validationMiddleware } from '../../validators/validationMiddleware.ts';
import { validateHelloPayload } from '../../validators';
import { HelloService } from '../../services/HelloService.ts';

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

export default apiV1Router;
