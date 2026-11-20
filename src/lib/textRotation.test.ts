import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextRotatingIndex, resolveRotatingItem } from './textRotation.ts';

test('nextRotatingIndex cycles through all services and wraps back to 0 cleanly', () => {
  assert.equal(nextRotatingIndex(0, 8), 1);
  assert.equal(nextRotatingIndex(6, 8), 7);
  assert.equal(nextRotatingIndex(7, 8), 0);
  assert.equal(nextRotatingIndex(0, 1), 0);
  assert.equal(nextRotatingIndex(0, 0), 0);
});

test('resolveRotatingItem safely returns wrapped items even for out-of-bounds indices', () => {
  const services = ['Web Design', 'Mobile Apps', 'AI Automation'];
  assert.equal(resolveRotatingItem(services, 0), 'Web Design');
  assert.equal(resolveRotatingItem(services, 2), 'AI Automation');
  assert.equal(resolveRotatingItem(services, 3), 'Web Design');
  assert.equal(resolveRotatingItem(services, -1), 'AI Automation');
  assert.equal(resolveRotatingItem([], 0), undefined);
});
