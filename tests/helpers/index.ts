import { vi } from 'vitest';

export function MockOf<T extends object>(...methods: (keyof T)[]): T {
  const mock: Partial<T> = {};

  methods.forEach(method => {
    mock[method] = vi.fn() as T[keyof T];
  });

  return mock as T;
}
