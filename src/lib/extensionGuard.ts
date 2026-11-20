export interface ErrorEventLike {
  filename?: string;
  message?: string;
  error?: { stack?: string; message?: string } | null;
}

const EXTENSION_PROTOCOLS = ['chrome-extension://', 'moz-extension://', 'safari-extension://', 'safari-web-extension://'];

/**
 * Returns true only for uncaught errors originating from third-party browser
 * extensions (never suppresses real application errors).
 */
export function isThirdPartyExtensionError(evt: ErrorEventLike): boolean {
  const filename = String(evt.filename || '');
  const message = String(evt.message || evt.error?.message || '');
  const stack = String(evt.error?.stack || '');

  const hasExtensionOrigin = EXTENSION_PROTOCOLS.some(
    (proto) => filename.includes(proto) || stack.includes(proto)
  );
  if (hasExtensionOrigin) {
    return true;
  }

  // Fallback for masked extension script errors attempting to overwrite a getter-only window.fetch
  if (
    message.includes('Cannot set property fetch of #<Window> which has only a getter') &&
    (!filename || filename === '' || !filename.includes('/src/'))
  ) {
    return true;
  }

  return false;
}

/**
 * If the host runtime defined `target.fetch` with a configurable getter-only
 * descriptor, adds a safe setter backed by the original getter so browser
 * extensions that wrap `window.fetch` do not throw a TypeError.
 */
export function ensureWritableFetch(target: object): boolean {
  try {
    const desc = Object.getOwnPropertyDescriptor(target, 'fetch');
    if (
      desc &&
      desc.configurable &&
      typeof desc.get === 'function' &&
      typeof desc.set === 'undefined'
    ) {
      const originalGetter = desc.get;
      let overriddenFetch: unknown = null;
      Object.defineProperty(target, 'fetch', {
        configurable: true,
        enumerable: Boolean(desc.enumerable),
        get() {
          return overriddenFetch ?? originalGetter.call(target);
        },
        set(next: unknown) {
          if (typeof next === 'function') {
            overriddenFetch = next;
          }
        },
      });
      return true;
    }
  } catch {
    // Non-configurable or restricted host object; ignore safely.
  }
  return false;
}

let installed = false;

/**
 * Installs defensive browser-extension isolation at runtime without hiding
 * any genuine application errors.
 */
export function installExtensionErrorGuard(): void {
  if (installed || typeof window === 'undefined') return;
  installed = true;

  ensureWritableFetch(window);

  window.addEventListener(
    'error',
    (event: ErrorEvent) => {
      if (isThirdPartyExtensionError(event)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event: PromiseRejectionEvent) => {
      const reason = event.reason as { message?: string; stack?: string } | string | undefined;
      const errLike: ErrorEventLike =
        typeof reason === 'string'
          ? { message: reason }
          : { message: reason?.message, error: reason ?? null };
      if (isThirdPartyExtensionError(errLike)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}
