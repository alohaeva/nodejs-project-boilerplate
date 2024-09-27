import { beforeAll, describe, expect, it, vi } from 'vitest';

import { HelloService } from '../../src/services/HelloService.ts';

describe('Test HelloService', () => {
  beforeAll(() => {
    vi.setSystemTime(new Date('2024-09-27T00:00:00.000Z'));
  });

  it('Should return modified string with provided payload', async () => {
    const helloService = new HelloService();

    const result = helloService.handler({
      name: 'Name',
    });

    expect(result).toEqual('Hello World! from Name, 2024-09-27T00:00:00.000Z');
  });
});
