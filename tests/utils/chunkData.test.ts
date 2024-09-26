import { describe, expect, it } from 'vitest';

import { chunkData } from '../../utils/transformers/chunkData.ts';

describe('Test chunkData util function', () => {
  const initialArray = new Array(10).fill(0).map((_, i) => i);

  it('Should return an array of chunks', () => {
    const resultArray = chunkData(initialArray, 2);

    expect(resultArray).toHaveLength(5);
  });

  it('Should return an array of one chunk', () => {
    const resultArray = chunkData(initialArray, 10);

    expect(resultArray).toHaveLength(1);
  });

  it('Should return an array of one chunk', () => {
    const resultArray = chunkData(initialArray, 9);

    expect(resultArray).toHaveLength(2);
  });
});
