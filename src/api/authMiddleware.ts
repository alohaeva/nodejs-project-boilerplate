import { NextFunction, Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';

import { TokenService } from '../services/TokenService.ts';
import { Roles } from '../types.ts';

import { sendResponse } from './helpers/sendResponse.ts';

export const authMiddleware = (role: Roles) => async (req: Request, res: Response, next: NextFunction) => {
  const authorisationHeader = req.headers['authorization'];

  if (authorisationHeader) {
    const accessToken = authorisationHeader.replace('Bearer ', '');

    const tokenData = TokenService.verifyToken<{ email: string; role: Roles }>(accessToken);

    if (tokenData.isValid) {
      if ([role, Roles.Admin].includes(tokenData.payload.role)) {
        return next();
      }

      return sendResponse(res, {
        status: StatusCode.ClientErrorUnauthorized,
        success: false,
        error: {
          code: StatusCode.ClientErrorUnauthorized,
          message: 'insufficient role',
        },
      });
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
