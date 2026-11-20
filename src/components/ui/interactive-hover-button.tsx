import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = 'Button', className, type = 'button', ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'group relative inline-flex min-w-[9.5rem] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-slate-300 bg-white px-6 py-2.5 text-center text-sm font-semibold text-slate-950 shadow-xs transition-colors duration-300 hover:border-[#EA0400] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA0400] disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-[#111111] dark:text-white dark:hover:border-[#EA0400]',
        className
      )}
      {...props}
    >
      {/* Expanding crimson fill starting from the left indicator dot (mirrors cleanly in RTL) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-full bg-[#EA0400] [clip-path:circle(4px_at_22px_50%)] transition-[clip-path] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[clip-path:circle(160%_at_22px_50%)] rtl:[clip-path:circle(4px_at_calc(100%-22px)_50%)] rtl:group-hover:[clip-path:circle(160%_at_calc(100%-22px)_50%)]"
      />

      {/* Rest label — nudged past the dot and slides out on hover */}
      <span className="relative z-10 inline-block ps-3.5 transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0 rtl:group-hover:-translate-x-10 whitespace-nowrap">
        {text}
      </span>

      {/* Hover label + arrow — slides into center over the filled crimson pill */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 flex h-full w-full translate-x-10 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 rtl:-translate-x-10 rtl:group-hover:translate-x-0"
      >
        <span className="whitespace-nowrap">{text}</span>
        <ArrowRight className="h-4 w-4 shrink-0 rtl:rotate-180" />
      </span>
    </button>
  );
});

InteractiveHoverButton.displayName = 'InteractiveHoverButton';

export { InteractiveHoverButton };
