import { Response, Request } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { SafeParseReturnType } from 'zod';
import { fromError } from 'zod-validation-error';
import { StatusCode } from 'status-code-enum';

import { sendResponse } from '../api/helpers/sendResponse.ts';
import { logger } from '../logger/index.ts';

export const validationMiddleware =
  (fn: (data: Record<string, string>) => SafeParseReturnType<unknown, unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = fn(req.body);

      console.log(result);

      if (result.success) {
        res.locals.payload = result.data;

        return next(null);
      } else {
        const validationErrors = fromError(result.error);

        sendResponse(res, {
          error: {
            message: validationErrors.toString(),
            code: StatusCode.ClientErrorBadRequest,
          },
          status: StatusCode.ClientErrorBadRequest,
          success: false,
        });
      }
    } catch (err: unknown) {
      logger.error(err);
      sendResponse(res, {
        error: {
          message: 'Internal Server Error',
          code: StatusCode.ServerErrorInternal,
        },
        status: StatusCode.ServerErrorInternal,
        success: false,
      });
    }
  };
