import { describe, vi, expect, it } from 'vitest';
import * as zod from 'zod';
import httpMocks from 'node-mocks-http';
import { StatusCode } from 'status-code-enum';

import * as sendResponseModule from '../../src/api/helpers/sendResponse.ts';
import { validationMiddleware } from '../../src/validators/validationMiddleware.ts';

const sendResponseSpy = vi.spyOn(sendResponseModule, 'sendResponse');

const schema = zod.object({
  value: zod.string(),
});

const mockValidationFunction = (data: Record<string, unknown>) => {
  return schema.safeParse(data);
};

const mockValidationFunctionThrowError = vi.fn().mockImplementation(() => {
  throw Error('validationError');
});

describe('Test validation middleware', () => {
  it('should invoke next function with correct payload', () => {
    const payload = {
      value: '42',
    };

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/user/42',
      body: payload,
    });

    const response = httpMocks.createResponse();

    const next = vi.fn();

    validationMiddleware(mockValidationFunction)(request, response, next);

    expect(next).toBeCalled();
    expect(response.locals.payload).toEqual(payload);
  });

  it('should invoke sendResponse function with validation error', () => {
    const payload = {
      value: 42,
    };

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/user/42',
      body: payload,
    });

    const response = httpMocks.createResponse();

    const next = vi.fn();

    validationMiddleware(mockValidationFunction)(request, response, next);

    expect(next).not.toBeCalled();
    expect(sendResponseSpy).toBeCalledWith(response, {
      error: {
        code: StatusCode.ClientErrorBadRequest,
        message: 'Validation error: Expected string, received number at "value"',
      },
      status: StatusCode.ClientErrorBadRequest,
      success: false,
    });
  });

  it('should invoke sendResponse function after catching error', () => {
    const payload = {
      value: 42,
    };

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/user/42',
      body: payload,
    });

    const response = httpMocks.createResponse();

    const next = vi.fn();

    validationMiddleware(mockValidationFunctionThrowError)(request, response, next);

    expect(sendResponseSpy).toBeCalledWith(response, {
      error: {
        message: 'Internal Server Error',
        code: StatusCode.ServerErrorInternal,
      },
      status: StatusCode.ServerErrorInternal,
      success: false,
    });
  });
});
