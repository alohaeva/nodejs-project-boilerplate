import { describe, expect, it } from 'vitest';
import { fromError } from 'zod-validation-error';

import { validateHelloPayload } from '../../src/validators';

describe('Test validateHelloPayload', () => {
  it('should return successful result with parsed payload', () => {
    const payload = {
      name: 'Vlad',
    };

    const result = validateHelloPayload(payload);

    expect(result.success).toBeTruthy();
    expect(result.data).toEqual(payload);
  });

  it('should return failed result with error', () => {
    const result = validateHelloPayload({
      name1: 'Vlad',
    });

    const validationErrors = fromError(result.error);

    expect(result.success).toBeFalsy();
    expect(validationErrors.toString()).toEqual('Validation error: Required at "name"');
  });
});
