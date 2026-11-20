import test from 'node:test';
import assert from 'node:assert/strict';
import { isNearBottom, shouldAutoScrollOnUpdate } from './chatScroll';

test('isNearBottom returns true when content fits or scroll is within threshold', () => {
  assert.equal(isNearBottom({ scrollTop: 0, scrollHeight: 300, clientHeight: 400 }), true);
  assert.equal(isNearBottom({ scrollTop: 560, scrollHeight: 1000, clientHeight: 400 }, 48), true);
  assert.equal(isNearBottom({ scrollTop: 600, scrollHeight: 1000, clientHeight: 400 }, 48), true);
});

test('isNearBottom returns false when user scrolled up to read earlier messages', () => {
  assert.equal(isNearBottom({ scrollTop: 200, scrollHeight: 1000, clientHeight: 400 }, 48), false);
  assert.equal(isNearBottom({ scrollTop: 551, scrollHeight: 1000, clientHeight: 400 }, 48), false);
});

test('shouldAutoScrollOnUpdate scrolls for user messages or when pinned near bottom', () => {
  assert.equal(shouldAutoScrollOnUpdate(false, 'user'), true);
  assert.equal(shouldAutoScrollOnUpdate(true, 'model'), true);
  assert.equal(shouldAutoScrollOnUpdate(false, 'model'), false);
});
