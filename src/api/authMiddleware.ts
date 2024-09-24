import { NextFunction, Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';

import { TokenService } from '../services/TokenService.ts';

import { sendResponse } from './helpers/sendResponse.ts';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorisationHeader = req.headers['authorization'];

  if (authorisationHeader) {
    const accessToken = authorisationHeader.replace('Bearer ', '');

    const tokenData = TokenService.verifyToken<{ email: string }>(accessToken);

    if (tokenData.isValid) {
      return next();
    }
  }

  return sendResponse(res, {
    status: StatusCode.ClientErrorUnauthorized,
    success: false,
    error: {
      code: StatusCode.ClientErrorUnauthorized,
      message: 'invalid token',
    },
  });
};
