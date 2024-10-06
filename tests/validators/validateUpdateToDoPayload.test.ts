import { describe, expect, it } from 'vitest';
import { fromError } from 'zod-validation-error';

import { validateUpdateToDoPayload } from '../../src/validators';

describe('Test validateUpdateToDoPayload', () => {
  it('should return successful result with parsed payload', () => {
    const payload = {
      action: 'Create Test Case',
    };

    const result = validateUpdateToDoPayload(payload);

    expect(result.success).toBeTruthy();
    expect(result.data).toEqual(payload);
  });

  it('should return failed result with error', () => {
    const result = validateUpdateToDoPayload({
      action: 1,
    });

    const validationErrors = fromError(result.error);

    expect(result.success).toBeFalsy();
    expect(validationErrors.toString()).toEqual('Validation error: field should be string at "action"');
  });
});
