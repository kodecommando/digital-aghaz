import React, { Suspense, lazy, useEffect, useState } from 'react';
import type { EngineNodeKey } from '../lib/engineNodes';

const LazyHero3D = lazy(() => import('./Hero3D'));

interface LazySite3DProps {
  activeNode: EngineNodeKey;
  scrollProgress: number;
  theme: 'dark' | 'light';
  isHomeHero?: boolean;
}

export function LazySite3D({
  activeNode,
  scrollProgress,
  theme,
  isHomeHero = false,
}: LazySite3DProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled) {
        setShouldLoad(true);
      }
    };

    // Defer loading Three.js + WebGL bundle until initial main content is interactive
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      const idleId = win.requestIdleCallback(enable, { timeout: 240 });
      return () => {
        cancelled = true;
        win.cancelIdleCallback?.(idleId);
      };
    }

    const timer = window.setTimeout(enable, 90);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      data-testid="sitewide-3d-backdrop"
      data-3d-deferred={shouldLoad ? 'loaded' : 'pending'}
      aria-hidden="true"
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700 ${
        isHomeHero
          ? 'opacity-95 dark:opacity-100'
          : 'opacity-45 dark:opacity-55'
      }`}
    >
      {shouldLoad ? (
        <Suspense fallback={null}>
          <LazyHero3D
            backgroundMode
            showDock={false}
            activeNode={activeNode}
            scrollProgress={scrollProgress}
            theme={theme}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
