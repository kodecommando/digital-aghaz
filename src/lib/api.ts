export interface ApiFetchOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  bearerToken?: string | null;
  retries?: number;
  retryDelayMs?: number;
  keepalive?: boolean;
  fetchImpl?: typeof fetch;
}

export interface ApiFetchResult<T> {
  ok: boolean;
  status: number;
  data: T | null;
  error: string | null;
}

const ADMIN_SESSION_STORAGE_KEY = 'da_admin_session_token';

export function getAdminSessionToken(): string | null {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) return null;
    const token = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    return token && token.trim().length > 0 ? token.trim() : null;
  } catch {
    return null;
  }
}

export function setAdminSessionToken(token: string | null): void {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) return;
    if (!token) {
      window.sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    } else {
      window.sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, token);
    }
  } catch {
    // Ignore storage unavailability in restricted sandbox frames
  }
}

export function clearAdminSessionToken(): void {
  setAdminSessionToken(null);
}

export function parseSafeJson<T>(rawText: string): T | null {
  if (!rawText || !rawText.trim()) return null;
  try {
    return JSON.parse(rawText) as T;
  } catch {
    return null;
  }
}

export function isRetryableStatus(status: number): boolean {
  return status === 502 || status === 503 || status === 504;
}

export async function apiFetchJson<T extends { error?: string }>(
  url: string,
  options: ApiFetchOptions = {}
): Promise<ApiFetchResult<T>> {
  const {
    method = 'GET',
    body,
    bearerToken,
    retries = 1,
    retryDelayMs = 350,
    keepalive = false,
    fetchImpl = globalThis.fetch,
  } = options;

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken}`;
  }

  let attempt = 0;
  while (attempt <= retries) {
    try {
      const response = await fetchImpl(url, {
        method,
        headers,
        credentials: 'include',
        keepalive,
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      });

      const rawText = await response.text();
      const parsed = parseSafeJson<T>(rawText);

      if (!response.ok) {
        if (isRetryableStatus(response.status) && attempt < retries) {
          attempt += 1;
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs * attempt));
          continue;
        }
        const message =
          parsed?.error ||
          (response.status === 401
            ? 'Session expired. Please sign in again.'
            : response.status === 404
              ? 'Requested endpoint was not found.'
              : response.status === 429
                ? 'Too many requests. Please wait a moment and try again.'
                : response.status >= 500
                  ? 'The server is temporarily unavailable. Please try again in a moment.'
                  : `Request failed (HTTP ${response.status}).`);
        return { ok: false, status: response.status, data: parsed, error: message };
      }

      if (parsed === null) {
        return {
          ok: false,
          status: response.status,
          data: null,
          error: 'Received an unexpected response from the server. Please refresh and try again.',
        };
      }

      return { ok: true, status: response.status, data: parsed, error: null };
    } catch {
      if (attempt < retries) {
        attempt += 1;
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs * attempt));
        continue;
      }
      return {
        ok: false,
        status: 0,
        data: null,
        error: 'Could not connect to the server. Please check your connection and try again.',
      };
    }
  }

  return {
    ok: false,
    status: 0,
    data: null,
    error: 'Could not connect to the server. Please try again.',
  };
}

// Lightweight in-memory GET cache for instant page transitions on public endpoints
const publicCache = new Map<string, { expiresAt: number; data: unknown }>();

export async function fetchCachedPublicJson<T extends { error?: string }>(
  url: string,
  ttlMs = 60_000
): Promise<T | null> {
  const now = Date.now();
  const cached = publicCache.get(url);
  if (cached && cached.expiresAt > now) {
    return cached.data as T;
  }
  const result = await apiFetchJson<T>(url, { method: 'GET', retries: 1 });
  if (result.ok && result.data) {
    publicCache.set(url, { expiresAt: now + ttlMs, data: result.data });
    return result.data;
  }
  return null;
}

export function invalidatePublicCache(urlPrefix?: string): void {
  if (!urlPrefix) {
    publicCache.clear();
    return;
  }
  for (const key of publicCache.keys()) {
    if (key.startsWith(urlPrefix)) {
      publicCache.delete(key);
    }
  }
}
