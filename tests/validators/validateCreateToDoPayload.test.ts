import { describe, expect, it } from 'vitest';
import { fromError } from 'zod-validation-error';

import { validateCreateToDoPayload } from '../../src/validators';

describe('Test validateCreateToDoPayload', () => {
  it('should return successful result with parsed payload', () => {
    const payload = {
      action: 'Create Test Case',
    };

    const result = validateCreateToDoPayload(payload);

    expect(result.success).toBeTruthy();
    expect(result.data).toEqual(payload);
  });

  it('should return failed result with error', () => {
    const result = validateCreateToDoPayload({
      action: 1212,
    });

    const validationErrors = fromError(result.error);

    expect(result.success).toBeFalsy();
    expect(validationErrors.toString()).toEqual('Validation error: field should be string at "action"');
  });
});
