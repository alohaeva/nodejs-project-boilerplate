import { NextFunction, Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';

import { TokenService } from '../services/TokenService.ts';
import { Roles, Scopes } from '../types.ts';

import { sendResponse } from './helpers/sendResponse.ts';

export const authMiddleware =
  (role: Roles, scope: Scopes) => async (req: Request, res: Response, next: NextFunction) => {
    const authorisationHeader = req.headers['authorization'];

    if (authorisationHeader) {
      const accessToken = authorisationHeader.replace('Bearer ', '');

      const tokenData = TokenService.verifyToken<{
        email: string;
        role: Roles;
        scopes: Scopes[];
      }>(accessToken);

      if (tokenData.isValid) {
        if ([role, Roles.Admin].includes(tokenData.payload.role)) {
          if (tokenData.payload.scopes.some(tokenScope => tokenScope === scope)) {
            return next();
          } else {
            return sendResponse(res, {
              status: StatusCode.ClientErrorForbidden,
              success: false,
              error: {
                code: StatusCode.ClientErrorForbidden,
                message: 'insufficient scope',
              },
            });
          }
        }

        return sendResponse(res, {
          status: StatusCode.ClientErrorForbidden,
          success: false,
          error: {
            code: StatusCode.ClientErrorForbidden,
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
