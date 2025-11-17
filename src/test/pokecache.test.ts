import { Cache } from '../pokecache.js';
import { test, expect } from 'vitest';

test('add overwrites existing key', () => {
  const c = new Cache(500);
  c.add('k', 'v1');
  c.add('k', 'v2');
  expect(c.get('k')).toBe('v2');
  c.stopReapLoop();
});

test('add multiple entries', () => {
  const c = new Cache(1000); // long enough to avoid expiry during test
  c.add('a', 'b');
  c.add('c', 'd');

  expect(c.get('a')).toBe('b');
  expect(c.get('c')).toBe('d');

  c.stopReapLoop();
});

test('returns undefined for missing key', () => {
  const c = new Cache(1000);
  expect(c.get('missing')).toBeUndefined();
  c.stopReapLoop();
});

test('stopReapLoop prevents future reaps', async () => {
  const c = new Cache(100);
  c.add('k', 'v');
  c.stopReapLoop();
  await new Promise((r) => setTimeout(r, 200));
  expect(c.get('k')).toBe('v');
});

test('expires with 0.5 second', async () => {
  const interval = 500;
  const c = new Cache(interval);

  c.add('k', 'v');
  expect(c.get('k')).toBe('v'); // immediate check, no wait

  await new Promise((r) => setTimeout(r, interval + 100)); // small buffer
  expect(c.get('k')).toBeUndefined();

  c.stopReapLoop();
});

test('expires with 1 second', async () => {
  const interval = 1000;
  const c = new Cache(interval);

  c.add('k', 'v');
  expect(c.get('k')).toBe('v'); // immediate check, no wait

  await new Promise((r) => setTimeout(r, interval + 100)); // small buffer
  expect(c.get('k')).toBeUndefined();

  c.stopReapLoop();
});
