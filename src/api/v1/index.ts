import { Router } from 'express';
import { StatusCode } from 'status-code-enum';

import { helloRoute } from '../../routes/v1/index.ts';
import { sendResponse } from '../../utils/http/index.ts';

const apiV1Router = Router();

apiV1Router.get(helloRoute.path, (req, res) => {
  const result = helloRoute.handler(req.url);

  return sendResponse(res, {
    result,
    status: StatusCode.SuccessOK,
    success: true,
  });
});

export default apiV1Router;
