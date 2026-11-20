import test from 'node:test';
import assert from 'node:assert/strict';
import { ensureWritableFetch, isThirdPartyExtensionError } from './extensionGuard';

test('isThirdPartyExtensionError detects chrome-extension fetch interceptor errors', () => {
  assert.equal(
    isThirdPartyExtensionError({
      filename: 'chrome-extension://eppiocemhmnlbhjplcgkofciiegomcon/libs/requests.js',
      message: 'Uncaught TypeError: Cannot set property fetch of #<Window> which has only a getter',
    }),
    true
  );

  assert.equal(
    isThirdPartyExtensionError({
      message: 'TypeError: Cannot set property fetch of #<Window> which has only a getter',
      error: {
        stack: 'TypeError: ...\n at chrome-extension://eppiocemhmnlbhjplcgkofciiegomcon/executors/200.js:1:1090',
      },
    }),
    true
  );
});

test('isThirdPartyExtensionError never suppresses genuine application errors', () => {
  assert.equal(
    isThirdPartyExtensionError({
      filename: 'http://localhost:3000/src/pages/HomePage.tsx',
      message: 'TypeError: Cannot read properties of undefined',
      error: { stack: 'at HomePage (http://localhost:3000/src/pages/HomePage.tsx:42:11)' },
    }),
    false
  );
});

test('ensureWritableFetch adds a safe setter to configurable getter-only fetch descriptors', () => {
  const originalFetch = () => 'original';
  const mockWin: Record<string, unknown> = {};
  Object.defineProperty(mockWin, 'fetch', {
    configurable: true,
    enumerable: true,
    get: () => originalFetch,
  });

  // Before guard, assigning fetch throws in strict mode
  assert.throws(() => {
    mockWin.fetch = () => 'wrapped';
  }, TypeError);

  assert.equal(ensureWritableFetch(mockWin), true);
  assert.equal(mockWin.fetch, originalFetch);

  const wrappedFetch = () => 'wrapped';
  assert.doesNotThrow(() => {
    mockWin.fetch = wrappedFetch;
  });
  assert.equal(mockWin.fetch, wrappedFetch);
});

test('ensureWritableFetch safely no-ops on non-configurable or already writable fetch', () => {
  const normalWin: Record<string, unknown> = { fetch: () => 'ok' };
  assert.equal(ensureWritableFetch(normalWin), false);

  const lockedWin: Record<string, unknown> = {};
  Object.defineProperty(lockedWin, 'fetch', {
    configurable: false,
    get: () => () => 'locked',
  });
  assert.equal(ensureWritableFetch(lockedWin), false);
});
