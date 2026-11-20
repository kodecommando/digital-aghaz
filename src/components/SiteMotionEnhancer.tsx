import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Globally orchestrates crisp, GPU-composited scroll-reveal animations for every
 * heading, paragraph, and box/card across all pages without ever leaving visible
 * content stuck hidden.
 */
export function SiteMotionEnhancer() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const root = document.getElementById('da-app-shell');
    if (!root) return;

    const observed = new WeakSet<HTMLElement>();

    const revealEl = (el: HTMLElement) => {
      if (!el.classList.contains('da-in-view')) {
        el.classList.add('da-in-view');
      }
      observer.unobserve(el);
    };

    const isElementRendered = (el: HTMLElement): boolean => {
      if (!el.isConnected) return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    const isNearViewport = (el: HTMLElement): boolean => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;
      const vh = window.innerHeight || document.documentElement.clientHeight || 900;
      return rect.top <= vh + 72 && rect.bottom >= -72;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top <= (window.innerHeight || 900) + 72) {
            revealEl(entry.target as HTMLElement);
          }
        }
      },
      {
        rootMargin: '80px 0px 80px 0px',
        threshold: 0,
      }
    );

    const revealVisibleTargets = () => {
      const pending = root.querySelectorAll<HTMLElement>('.da-anim-target:not(.da-in-view)');
      pending.forEach((el) => {
        if (isNearViewport(el)) {
          revealEl(el);
        }
      });
    };

    const classifyAndObserve = () => {
      const scopeNodes = root.querySelectorAll('main, footer');
      let staggerIndex = 0;

      scopeNodes.forEach((scope) => {
        const candidates = scope.querySelectorAll<HTMLElement>(
          'h1, h2, h3, h4, p, article, blockquote, [class*="rounded-xl"], [class*="rounded-2xl"]'
        );

        candidates.forEach((el) => {
          if (el.classList.contains('da-in-view')) return;
          if (
            el.closest('[role="dialog"]') ||
            el.closest('[data-motion-managed="true"]') ||
            el.closest('.gf-root') ||
            el.classList.contains('hero-stagger') ||
            el.closest('.hero-stagger')
          ) {
            return;
          }

          if (!isElementRendered(el)) return;

          const alreadyTagged = el.classList.contains('da-anim-target');
          if (!alreadyTagged) {
            const parentBox = el.parentElement?.closest<HTMLElement>(
              'article, [class*="rounded-xl"], [class*="rounded-2xl"]'
            );
            const tag = el.tagName;
            const isHeading = tag === 'H1' || tag === 'H2' || tag === 'H3' || tag === 'H4';
            const isParagraph = tag === 'P';

            let animClass = 'da-anim-box';
            if (isHeading) {
              animClass = 'da-anim-heading';
            } else if (isParagraph) {
              animClass = 'da-anim-paragraph';
            } else {
              const rect = el.getBoundingClientRect();
              if (rect.height < 36) return;
            }

            if (parentBox && (isHeading || isParagraph)) {
              el.style.setProperty('--da-delay', isHeading ? '40ms' : '70ms');
            } else {
              const delayMs = Math.min((staggerIndex % 4) * 35, 105);
              el.style.setProperty('--da-delay', `${delayMs}ms`);
              staggerIndex += 1;
            }

            el.classList.add('da-anim-target', animClass);
          }

          if (isNearViewport(el)) {
            window.requestAnimationFrame(() => revealEl(el));
          } else if (!observed.has(el)) {
            observed.add(el);
            observer.observe(el);
          }
        });
      });

      revealVisibleTargets();
    };

    const rafId = window.requestAnimationFrame(classifyAndObserve);
    const postTransitionTimer = window.setTimeout(classifyAndObserve, 300);

    // Watch for dynamically loaded cards/sections across main & footer
    let mutationScheduled = false;
    const mutationObserver = new MutationObserver(() => {
      if (mutationScheduled) return;
      mutationScheduled = true;
      window.requestAnimationFrame(() => {
        mutationScheduled = false;
        classifyAndObserve();
      });
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    let scrollRaf = 0;
    const onScrollOrResize = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0;
        revealVisibleTargets();
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    document.addEventListener('scroll', onScrollOrResize, { passive: true, capture: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Lightweight periodic sweep guarantees smooth scrolls / lazy image reflows never orphan a visible element
    const sweepInterval = window.setInterval(() => {
      const pending = root.querySelectorAll<HTMLElement>('.da-anim-target:not(.da-in-view)');
      if (pending.length === 0) return;
      pending.forEach((el) => {
        if (isNearViewport(el)) {
          revealEl(el);
        }
      });
    }, 300);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(postTransitionTimer);
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
      window.clearInterval(sweepInterval);
      mutationObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      document.removeEventListener('scroll', onScrollOrResize, { capture: true });
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [pathname]);

  return null;
}
