import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeText,
  isValidEmail,
  redactEmail,
  redactPIIForLog,
  signSessionToken,
  verifySessionToken,
  generateMagicToken,
  hashToken,
  checkSlidingWindowLimit,
  stripDangerousKeys,
  sanitizeSafeAssetUrl,
  escapeXml,
  isSafeHostHeader,
  isTrustedRequestOrigin,
  createTokenRevocationStore,
} from './security';

test('sanitizeText strips angle brackets and control characters and enforces length', () => {
  assert.equal(sanitizeText('<script>alert(1)</script>Hello\u0000'), 'scriptalert(1)/scriptHello');
  assert.equal(sanitizeText('  clean text  '), 'clean text');
  assert.equal(sanitizeText('abcdef', 3), 'abc');
});

test('isValidEmail validates standard email addresses', () => {
  assert.equal(isValidEmail('founder@digitalaghaz.example'), true);
  assert.equal(isValidEmail('not-an-email'), false);
  assert.equal(isValidEmail('missing@tld'), false);
});

test('redactEmail and redactPIIForLog mask sensitive fields', () => {
  assert.equal(redactEmail('salman@example.com'), 'sa***@example.com');
  const redacted = redactPIIForLog({
    email: 'client@example.com',
    token: 'secret-token-123',
    status: 'NEW',
  });
  assert.equal(redacted.email, 'cl***@example.com');
  assert.equal(redacted.token, '[REDACTED]');
  assert.equal(redacted.status, 'NEW');
});

test('HMAC session tokens sign, verify, and reject tampered or expired tokens', () => {
  const secret = 'test-signing-secret-at-least-32-chars';
  const now = 1_700_000_000_000;
  const token = signSessionToken({ email: 'admin@example.com', role: 'admin', exp: now + 60_000 }, secret);

  const valid = verifySessionToken(token, secret, now + 1000);
  assert.equal(valid?.email, 'admin@example.com');
  assert.equal(valid?.role, 'admin');

  const expired = verifySessionToken(token, secret, now + 120_000);
  assert.equal(expired, null);

  const tampered = verifySessionToken(token + 'x', secret, now + 1000);
  assert.equal(tampered, null);
});

test('magic token generation produces unique values and deterministic SHA-256 hashes', () => {
  const t1 = generateMagicToken();
  const t2 = generateMagicToken();
  assert.notEqual(t1, t2);
  assert.equal(hashToken(t1).length, 64);
  assert.equal(hashToken(t1), hashToken(t1));
});

test('sliding window rate limiter enforces caps and resets after window expires', () => {
  const store = new Map();
  const now = 10_000;
  assert.equal(checkSlidingWindowLimit(store, 'ip1', 2, 1000, now).allowed, true);
  assert.equal(checkSlidingWindowLimit(store, 'ip1', 2, 1000, now + 100).allowed, true);
  assert.equal(checkSlidingWindowLimit(store, 'ip1', 2, 1000, now + 200).allowed, false);
  assert.equal(checkSlidingWindowLimit(store, 'ip1', 2, 1000, now + 1100).allowed, true);
});

test('stripDangerousKeys removes prototype pollution keys recursively', () => {
  const payload = JSON.parse('{"name":"ok","__proto__":{"polluted":true},"nested":{"constructor":"bad","safe":1}}');
  const cleaned = stripDangerousKeys(payload) as Record<string, unknown>;
  assert.equal(cleaned.name, 'ok');
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned, '__proto__'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned.nested as object, 'constructor'), false);
  assert.equal((cleaned.nested as { safe: number }).safe, 1);
});

test('sanitizeSafeAssetUrl blocks javascript:, data:, traversal, and allows trusted asset/https URLs', () => {
  const fallback = '/src/assets/images/default.jpg';
  assert.equal(sanitizeSafeAssetUrl('javascript:alert(1)', fallback), fallback);
  assert.equal(sanitizeSafeAssetUrl('data:text/html,<script>x</script>', fallback), fallback);
  assert.equal(sanitizeSafeAssetUrl('/assets/../../etc/passwd', fallback), fallback);
  assert.equal(sanitizeSafeAssetUrl('//evil.example/img.png', fallback), fallback);
  assert.equal(
    sanitizeSafeAssetUrl('/src/assets/images/case_nordic_craft_1794997819400.jpg', fallback),
    '/src/assets/images/case_nordic_craft_1794997819400.jpg'
  );
  assert.equal(
    sanitizeSafeAssetUrl('https://cdn.example.com/banner.jpg', fallback),
    'https://cdn.example.com/banner.jpg'
  );
});

test('escapeXml and isSafeHostHeader neutralize XML and Host header injection', () => {
  assert.equal(escapeXml('https://a.com/?x=1&y=<tag>'), 'https://a.com/?x=1&amp;y=&lt;tag&gt;');
  assert.equal(isSafeHostHeader('localhost:3000'), true);
  assert.equal(isSafeHostHeader('digitalaghaz.com'), true);
  assert.equal(isSafeHostHeader('evil.com/path?x=1'), false);
  assert.equal(isSafeHostHeader('evil.com\r\nX-Injected: 1'), false);
});

test('isTrustedRequestOrigin permits same-host and configured origins while rejecting untrusted sites', () => {
  assert.equal(isTrustedRequestOrigin('http://localhost:3000', 'localhost:3000', []), true);
  assert.equal(isTrustedRequestOrigin('https://evil-phishing.example', 'localhost:3000', []), false);
  assert.equal(
    isTrustedRequestOrigin('https://custom.agency.com', 'localhost:3000', ['https://custom.agency.com']),
    true
  );
});

test('createTokenRevocationStore immediately blocks logged-out tokens and prunes expired ones', () => {
  const store = createTokenRevocationStore();
  const now = 1_700_000_000_000;
  assert.equal(store.isRevoked('tok-abc', now), false);
  store.revoke('tok-abc', now + 5000);
  assert.equal(store.isRevoked('tok-abc', now + 1000), true);
  assert.equal(store.isRevoked('tok-other', now + 1000), false);
  assert.equal(store.isRevoked('tok-abc', now + 6000), false);
});

