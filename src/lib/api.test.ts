import test from 'node:test';
import assert from 'node:assert/strict';
import { apiFetchJson, isRetryableStatus, parseSafeJson } from './api';

test('parseSafeJson returns parsed object for valid JSON and null for HTML/invalid payloads', () => {
  assert.deepEqual(parseSafeJson<{ ok: boolean }>('{"ok":true}'), { ok: true });
  assert.equal(parseSafeJson('<html>502 Bad Gateway</html>'), null);
  assert.equal(parseSafeJson(''), null);
});

test('isRetryableStatus flags only transient gateway/service errors', () => {
  assert.equal(isRetryableStatus(502), true);
  assert.equal(isRetryableStatus(503), true);
  assert.equal(isRetryableStatus(504), true);
  assert.equal(isRetryableStatus(401), false);
  assert.equal(isRetryableStatus(400), false);
  assert.equal(isRetryableStatus(200), false);
});

test('apiFetchJson sends Bearer header and returns parsed JSON cleanly', async () => {
  let capturedAuth = '';
  const fakeFetch: typeof fetch = async (_input, init) => {
    const hdrs = (init?.headers ?? {}) as Record<string, string>;
    capturedAuth = hdrs.Authorization || '';
    return new Response(JSON.stringify({ ok: true, value: 42 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const result = await apiFetchJson<{ ok: boolean; value: number; error?: string }>('/api/test', {
    method: 'POST',
    body: { hello: 'world' },
    bearerToken: 'tok_123',
    fetchImpl: fakeFetch,
  });

  assert.equal(result.ok, true);
  assert.equal(result.data?.value, 42);
  assert.equal(capturedAuth, 'Bearer tok_123');
});

test('apiFetchJson retries once on transient 503 and recovers cleanly', async () => {
  let attempts = 0;
  const fakeFetch: typeof fetch = async () => {
    attempts += 1;
    if (attempts === 1) {
      return new Response('<html>Temporarily Unavailable</html>', { status: 503 });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };

  const result = await apiFetchJson<{ ok: boolean; error?: string }>('/api/chat', {
    method: 'POST',
    body: { message: 'hi' },
    retries: 1,
    retryDelayMs: 5,
    fetchImpl: fakeFetch,
  });

  assert.equal(attempts, 2);
  assert.equal(result.ok, true);
});

test('apiFetchJson handles non-JSON 500 error body without throwing SyntaxError', async () => {
  const fakeFetch: typeof fetch = async () =>
    new Response('<html>Internal Proxy Error</html>', { status: 500 });

  const result = await apiFetchJson<{ error?: string }>('/api/chat', {
    method: 'POST',
    retries: 0,
    fetchImpl: fakeFetch,
  });

  assert.equal(result.ok, false);
  assert.equal(result.status, 500);
  assert.ok(result.error && result.error.includes('temporarily unavailable'));
});
