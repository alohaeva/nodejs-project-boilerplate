import { describe, expect, it } from 'vitest';

import { firstLetterToUpperCase } from '../../utils/transformers/firstLetterToUpperCase.ts';

describe('Test firstLetterToUpperCase function', () => {
  it('Should return string with first capital letter', () => {
    const result = firstLetterToUpperCase('exampleWord');

    expect(result).toEqual('ExampleWord');
  });

  it('Should return string with first capital letter', () => {
    const result = firstLetterToUpperCase('example word');

    expect(result).toEqual('Example word');
  });
});
