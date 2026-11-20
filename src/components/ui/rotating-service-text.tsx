import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { nextRotatingIndex, resolveRotatingItem } from '@/lib/textRotation';
import { cn } from '@/lib/utils';

export interface RotatingServiceTextProps {
  items: readonly string[];
  intervalMs?: number;
  className?: string;
}

/**
 * Smoothly rotates a single highlighted service phrase into the next one
 * every 5 seconds with a crisp vertical slide + opacity transition (zero clipping).
 */
export function RotatingServiceText({
  items,
  intervalMs = 5000,
  className,
}: RotatingServiceTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [items]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => nextRotatingIndex(prev, items.length));
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [items.length, intervalMs]);

  const current = resolveRotatingItem(items, index) ?? '';

  return (
    <span
      data-testid="rotating-service-text"
      data-motion-managed="true"
      aria-live="polite"
      className={cn(
        'relative inline-block align-baseline py-0.5 -my-0.5',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${index}-${current}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-[#EA0400]"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
