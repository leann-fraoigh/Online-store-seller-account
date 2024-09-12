import { test, expect } from 'vitest';
import { formatDate } from '../helpers/format-date';

test('should format date ISO string', () => {
  expect(formatDate(new Date('2023-10-10 00:00:00').toISOString())).toBe('10.10.2023 00:00');
});
