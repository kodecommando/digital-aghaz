import test from 'node:test';
import assert from 'node:assert/strict';
import { wrapCarouselIndex, formatSlideCounter } from './carousel';

test('wrapCarouselIndex advances and wraps cleanly in both directions', () => {
  assert.equal(wrapCarouselIndex(0, 1, 4), 1);
  assert.equal(wrapCarouselIndex(3, 1, 4), 0);
  assert.equal(wrapCarouselIndex(0, -1, 4), 3);
  assert.equal(wrapCarouselIndex(2, -1, 4), 1);
  assert.equal(wrapCarouselIndex(0, 1, 0), 0);
});

test('formatSlideCounter pads index and total cleanly', () => {
  assert.equal(formatSlideCounter(0, 4), '01 / 04');
  assert.equal(formatSlideCounter(3, 4), '04 / 04');
  assert.equal(formatSlideCounter(0, 0), '00 / 00');
});
