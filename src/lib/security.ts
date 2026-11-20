import crypto from 'node:crypto';
export { sanitizeText, isValidEmail } from './validation.ts';

export function redactEmail(email: string): string {
  const parts = email.split('@');
  if (parts.length !== 2) return '[REDACTED]';
  const [local, domain] = parts;
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}***@${domain}`;
}

export function redactPIIForLog(record: Record<string, unknown>): Record<string, unknown> {
  const sensitiveKeys = new Set([
    'email',
    'phone',
    'password',
    'token',
    'secret',
    'apikey',
    'authorization',
    'cookie',
  ]);
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (sensitiveKeys.has(key.toLowerCase())) {
      out[key] =
        typeof value === 'string' && key.toLowerCase() === 'email'
          ? redactEmail(value)
          : '[REDACTED]';
    } else {
      out[key] = value;
    }
  }
  return out;
}

export function createCorrelationId(): string {
  return `da_${crypto.randomBytes(6).toString('hex')}`;
}

export function signSessionToken(
  payload: { email: string; role: 'admin'; exp: number },
  secret: string
): string {
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${sig}`;
}

export function verifySessionToken(
  token: string | undefined,
  secret: string,
  nowMs = Date.now()
): { email: string; role: 'admin'; exp: number } | null {
  if (!token || !secret) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [encoded, sig] = parts;
  if (!encoded || !sig) return null;

  const expectedSig = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as {
      email?: string;
      role?: string;
      exp?: number;
    };
    if (
      parsed.role !== 'admin' ||
      typeof parsed.email !== 'string' ||
      typeof parsed.exp !== 'number' ||
      parsed.exp <= nowMs
    ) {
      return null;
    }
    return { email: parsed.email, role: 'admin', exp: parsed.exp };
  } catch {
    return null;
  }
}

export function generateMagicToken(): string {
  return crypto.randomBytes(32).toString('base64url');
}

export function hashToken(rawToken: string): string {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

export interface RateWindow {
  count: number;
  resetAt: number;
}

export function checkSlidingWindowLimit(
  store: Map<string, RateWindow>,
  key: string,
  limit: number,
  windowMs: number,
  nowMs = Date.now()
): { allowed: boolean; remaining: number; resetAt: number } {
  const existing = store.get(key);
  if (!existing || existing.resetAt <= nowMs) {
    const next: RateWindow = { count: 1, resetAt: nowMs + windowMs };
    store.set(key, next);
    return { allowed: true, remaining: Math.max(0, limit - 1), resetAt: next.resetAt };
  }
  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }
  existing.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}

/**
 * Strips prototype-pollution keys (__proto__, constructor, prototype)
 * recursively from parsed JSON bodies or query objects.
 */
const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

export function stripDangerousKeys<T>(input: T, depth = 0): T {
  if (depth > 8 || input === null || typeof input !== 'object') {
    return input;
  }
  if (Array.isArray(input)) {
    return input.map((item) => stripDangerousKeys(item, depth + 1)) as unknown as T;
  }
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (DANGEROUS_KEYS.has(key)) continue;
    clean[key] = stripDangerousKeys(value, depth + 1);
  }
  return clean as T;
}

/**
 * Validates stored asset/image URLs against XSS schemes (javascript:, data:,
 * vbscript:, protocol-relative //, or path traversal ..).
 */
export function sanitizeSafeAssetUrl(raw: unknown, fallback: string): string {
  if (typeof raw !== 'string') return fallback;
  const trimmed = raw.trim().slice(0, 300);
  if (!trimmed) return fallback;
  if (trimmed.includes('..') || trimmed.includes('\\') || /[\u0000-\u001F\u007F]/.test(trimmed)) {
    return fallback;
  }
  if (trimmed.startsWith('/assets/') || trimmed.startsWith('/src/assets/')) {
    return trimmed;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    // Reject invalid URLs
  }
  return fallback;
}

/**
 * Escapes XML special characters to prevent XML injection in sitemap responses.
 */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Validates HTTP Host headers against safe hostname[:port] syntax to block
 * Host header injection / cache poisoning in robots.txt and sitemap.xml.
 */
export function isSafeHostHeader(host: string | undefined): boolean {
  if (!host) return false;
  return /^[a-zA-Z0-9.-]{1,253}(:\d{1,5})?$/.test(host.trim());
}

/**
 * Checks whether an Origin header belongs to a trusted same-site or configured
 * deployment origin (used for both CORS and CSRF protection on mutating routes).
 */
export function isTrustedRequestOrigin(
  origin: string | undefined,
  reqHost: string,
  allowedOrigins: readonly string[],
  appUrl?: string
): boolean {
  if (!origin) return true;
  try {
    const parsed = new URL(origin);
    const host = parsed.host.toLowerCase();
    const hostname = parsed.hostname.toLowerCase();
    const normalizedReqHost = reqHost.toLowerCase();

    if (host === normalizedReqHost) return true;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
    if (appUrl && origin === appUrl) return true;
    if (allowedOrigins.includes(origin)) return true;
    if (
      parsed.protocol === 'https:' &&
      (hostname.endsWith('.run.app') ||
        hostname.endsWith('.aistudio.google.com') ||
        hostname.endsWith('.googleusercontent.com') ||
        hostname.endsWith('.web.app'))
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export interface TokenRevocationStore {
  revoke: (rawToken: string, expiresAtMs: number) => void;
  isRevoked: (rawToken: string | undefined, nowMs?: number) => boolean;
  prune: (nowMs?: number) => void;
}

/**
 * Tracks SHA-256 hashes of explicitly logged-out session tokens until their
 * natural expiry so stolen cookies or Bearer tokens cannot be replayed after logout.
 */
export function createTokenRevocationStore(): TokenRevocationStore {
  const revoked = new Map<string, number>();

  const prune = (nowMs = Date.now()) => {
    for (const [digest, exp] of revoked.entries()) {
      if (exp <= nowMs) {
        revoked.delete(digest);
      }
    }
  };

  return {
    revoke(rawToken: string, expiresAtMs: number) {
      if (!rawToken) return;
      prune();
      revoked.set(hashToken(rawToken), expiresAtMs);
    },
    isRevoked(rawToken: string | undefined, nowMs = Date.now()) {
      if (!rawToken) return false;
      const digest = hashToken(rawToken);
      const exp = revoked.get(digest);
      if (exp === undefined) return false;
      if (exp <= nowMs) {
        revoked.delete(digest);
        return false;
      }
      return true;
    },
    prune,
  };
}

