import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BrandLogo({ size = 'md', className = '' }: BrandLogoProps) {
  const heightClass =
    size === 'sm' ? 'h-9 sm:h-10' : size === 'lg' ? 'h-12' : 'h-10';

  return (
    <span
      data-testid="brand-logo"
      className={`da-logo-motion inline-flex items-center rounded-md bg-transparent dark:bg-white dark:px-2.5 dark:py-1 dark:ring-1 dark:ring-white/10 shrink-0 ${className}`}
    >
      <img
        src="/assets/aistudio/Digitak_Aghaz-01_c98303a5.png"
        alt="Digital Aghaz"
        fetchPriority="high"
        decoding="async"
        className={`${heightClass} w-auto object-contain select-none`}
        draggable={false}
      />
    </span>
  );
}

export function BrandMonogram({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md bg-black text-white font-display font-bold text-sm tracking-tight border border-white/15 shrink-0 ${className}`}
    >
      D<span className="text-[#EA0400]">.</span>
    </span>
  );
}
