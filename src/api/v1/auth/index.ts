import { Request, Response, Router } from 'express';
import { StatusCode } from 'status-code-enum';

import MongoDBConnection from '../../../connectors/mongo/index.ts';
import { TokenRepository } from '../../../repositories/TokenRepository.ts';
import { TokenService } from '../../../services/TokenService.ts';
import { AuthService } from '../../../services/AuthService.ts';
import { sendResponse } from '../../helpers/sendResponse.ts';
import { validationMiddleware } from '../../../validators/validationMiddleware.ts';
import { validateAuthPayload } from '../../../validators/index.ts';

export const authRouter = Router();

const tokenRepo = new TokenRepository({
  connection: MongoDBConnection,
});

const tokenService = new TokenService(tokenRepo);

const authService = new AuthService(tokenService);

authRouter.post('/login', validationMiddleware(validateAuthPayload), async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await authService.login(res.locals.payload);

  return sendResponse(res, {
    status: StatusCode.SuccessOK,
    success: true,
    result: {
      accessToken,
      refreshToken,
    },
  });
});
