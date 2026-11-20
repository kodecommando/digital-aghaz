import React, { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 160 },
  purple: { base: 280, spread: 200 },
  green: { base: 140, spread: 160 },
  red: { base: 356, spread: 24 },
  orange: { base: 24, spread: 120 },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

// Share a single RAF-throttled pointer listener across all mounted GlowCards
const activeCards = new Set<HTMLDivElement>();
let pointerBound = false;
let pointerRaf = 0;
let lastPointerX = -9999;
let lastPointerY = -9999;

function flushPointerPositions() {
  pointerRaf = 0;
  const vw = Math.max(1, window.innerWidth);
  const xp = Math.min(1, Math.max(0, lastPointerX / vw)).toFixed(2);

  activeCards.forEach((node) => {
    const rect = node.getBoundingClientRect();
    // Skip cards far off-screen to avoid unnecessary style writes
    if (rect.bottom < -320 || rect.top > window.innerHeight + 320) return;
    const lx = (lastPointerX - rect.left).toFixed(1);
    const ly = (lastPointerY - rect.top).toFixed(1);
    node.style.setProperty('--lx', lx);
    node.style.setProperty('--ly', ly);
    node.style.setProperty('--xp', xp);
  });
}

function handleGlobalPointerMove(e: PointerEvent) {
  if (e.pointerType === 'touch') return;
  lastPointerX = e.clientX;
  lastPointerY = e.clientY;
  if (!pointerRaf) {
    pointerRaf = window.requestAnimationFrame(flushPointerPositions);
  }
}

function registerCard(node: HTMLDivElement) {
  activeCards.add(node);
  if (!pointerBound && typeof document !== 'undefined') {
    document.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    pointerBound = true;
  }
}

function unregisterCard(node: HTMLDivElement) {
  activeCards.delete(node);
  if (activeCards.size === 0 && pointerBound && typeof document !== 'undefined') {
    document.removeEventListener('pointermove', handleGlobalPointerMove);
    if (pointerRaf) {
      window.cancelAnimationFrame(pointerRaf);
      pointerRaf = 0;
    }
    pointerBound = false;
  }
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'red',
  size = 'md',
  width,
  height,
  customSize = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    registerCard(node);
    return () => unregisterCard(node);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const inlineStyles: React.CSSProperties & Record<string, string | number> = {
    '--base': base,
    '--spread': spread,
    '--radius': '16',
    '--border': '2',
    '--size': '220',
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 220) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    position: 'relative',
    touchAction: 'pan-y',
  };

  if (width !== undefined) {
    inlineStyles.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    inlineStyles.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <div
      ref={cardRef}
      data-glow=""
      style={inlineStyles}
      className={cn(
        !customSize && sizeMap[size],
        !customSize && 'aspect-[3/4]',
        'da-spotlight-card relative rounded-2xl',
        className
      )}
    >
      <div className="relative z-[1] h-full w-full">{children}</div>
    </div>
  );
};

export { GlowCard };
