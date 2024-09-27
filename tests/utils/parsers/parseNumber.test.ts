import { describe, expect, it } from 'vitest';

import { parseNumber } from '../../../src/utils/parse/parseNumber.ts';

describe('Test parseNumber', () => {
  it('Should parse a number', () => {
    const numberString = '100';

    const result = parseNumber(numberString);

    expect(result).toEqual(100);
  });

  it('Should parse a number with characters in the end', () => {
    const numberString = '100n';

    const result = parseNumber(numberString);

    expect(result).toEqual(100);
  });

  it('Should parse a number with default value if a string is not a number', () => {
    const numberString = 's100';

    const result = parseNumber(numberString, 100);

    expect(result).toEqual(100);
  });
});
