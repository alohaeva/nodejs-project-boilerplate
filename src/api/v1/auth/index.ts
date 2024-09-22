import { Request, Response, Router } from 'express';
import { StatusCode } from 'status-code-enum';

import MongoDBConnection from '../../../connectors/mongo/index.ts';
import { TokenRepository } from '../../../repositories/TokenRepository.ts';
import { TokenService } from '../../../services/TokenService.ts';
import { AuthService } from '../../../services/AuthService.ts';
import { sendResponse } from '../../helpers/sendResponse.ts';

export const authRouter = Router();

const tokenRepo = new TokenRepository({
  connection: MongoDBConnection,
});

const tokenService = new TokenService(tokenRepo);

const authService = new AuthService(tokenService);

authRouter.post('/login', async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await authService.login(req.body);

  return sendResponse(res, {
    status: StatusCode.SuccessOK,
    success: true,
    result: {
      accessToken,
      refreshToken,
    },
  });
});
