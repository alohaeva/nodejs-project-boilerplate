import { describe, expect, it } from 'vitest';
import { fromError } from 'zod-validation-error';

import { validateAuthPayload } from '../../src/validators';

describe('Test validateAuthPayload', () => {
  it('should return successful result with parsed payload', () => {
    const payload = {
      role: 'user',
      scopes: 'read, write',
      email: 'example@gmail.com',
    };

    const result = validateAuthPayload(payload);

    expect(result.success).toBeTruthy();
    expect(result.data).toEqual({
      email: 'example@gmail.com',
      role: 'user',
      scopes: ['read', 'write'],
    });
  });

  it('should fallback to default scope if not provided', () => {
    const payload = {
      role: 'user',
      email: 'example@gmail.com',
    };

    const result = validateAuthPayload(payload);

    expect(result.success).toBeTruthy();
    expect(result.data).toEqual({
      email: 'example@gmail.com',
      role: 'user',
      scopes: ['read'],
    });
  });

  it('should fail validation due to invalid scope', () => {
    const payload = {
      role: 'user',
      scopes: 'read, delete',
      email: 'example@gmail.com',
    };

    const result = validateAuthPayload(payload);

    const validationErrors = fromError(result.error);

    expect(result.success).toBeFalsy();
    expect(validationErrors.toString()).toEqual(
      'Validation error: Not valid scope array string. Provide comma separated string with scopes array at "scopes"'
    );
  });
});
