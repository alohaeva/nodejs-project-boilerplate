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

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Returns access and refresh tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email to use as identification.
 *                 example: example@gmail.com
 *               role:
 *                 type: string
 *                 description: Role to be assigned to the token user or admin.
 *                 example: user
 *               scopes:
 *                 type: string
 *                 description: Scopes to be assigned to the token. Provide string with comma separated values.
 *                 example: read,write
 *     responses:
 *       200:
 *         description: A successful response
 */
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
