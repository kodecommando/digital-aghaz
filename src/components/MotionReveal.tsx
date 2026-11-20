import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  staggerSelector?: string;
  staggerDelay?: number;
  refreshKey?: number;
}

export function MotionReveal({
  children,
  className = '',
  delay = 0,
  y = 22,
  staggerSelector,
  staggerDelay = 0.07,
  refreshKey = 0,
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const targets = staggerSelector
      ? Array.from(el.querySelectorAll(staggerSelector))
      : [el];
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        scale: staggerSelector ? 0.98 : 0.99,
        opacity: 0,
        duration: 0.48,
        delay,
        stagger: staggerSelector ? staggerDelay : 0,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          once: true,
        },
      });
    }, el);

    const refreshRaf = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshRaf);
      ctx.revert();
    };
  }, [delay, y, staggerSelector, staggerDelay, refreshKey]);

  return (
    <div ref={ref} data-motion-managed="true" className={className}>
      {children}
    </div>
  );
}
