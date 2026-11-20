import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { GlowCard } from '@/components/ui/spotlight-card';

const STAGE_VALUES = [32, 54, 72, 88, 96];

export function GrowthChart() {
  const { t } = useApp();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activated, setActivated] = useState(false);
  const [counts, setCounts] = useState<number[]>(() =>
    t.chartSection.metrics.map(() => 0)
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setActivated(true);
      setCounts(t.chartSection.metrics.map((m) => m.value));
      return;
    }

    const checkNow = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= (window.innerHeight || 900) + 40 && rect.bottom >= 0) {
        setActivated(true);
        return true;
      }
      return false;
    };

    if (checkNow()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting || checkNow()) {
          setActivated(true);
          observer.disconnect();
        }
      },
      { rootMargin: '60px 0px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [t.chartSection.metrics]);

  useEffect(() => {
    if (!activated) return;
    const targets = t.chartSection.metrics.map((m) => m.value);
    const start = performance.now();
    const duration = 850;
    let rafId = 0;

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map((val) => Math.round(val * eased)));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [activated, t.chartSection.metrics]);

  // Compute SVG polyline points cleanly inside viewBox 500x200
  const points = STAGE_VALUES.map((val, idx) => {
    const x = 45 + idx * 102;
    const y = 175 - (val / 100) * 140;
    return { x, y, val };
  });
  const pathD = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');
  const lineLength = 620;

  return (
    <section
      ref={containerRef}
      data-testid="growth-chart-section"
      className="py-16 sm:py-20 border-t border-slate-200 dark:border-neutral-900 bg-white/78 dark:bg-[#070708]/78"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-medium text-[#EA0400] tracking-wide">
              {t.chartSection.kicker}
            </p>
            <h2 className="da-h2 text-slate-900 dark:text-white">
              {t.chartSection.headline}
            </h2>
            <p className="da-body text-slate-600 dark:text-neutral-400">
              {t.chartSection.subheadline}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {t.chartSection.metrics.map((metric, idx) => (
                <GlowCard
                  key={metric.label}
                  customSize
                  glowColor="red"
                  className="p-4"
                >
                  <div className="font-mono text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">
                    {counts[idx]}
                    {metric.suffix}
                  </div>
                  <div className="text-xs font-medium text-slate-800 dark:text-neutral-200 mt-1">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                    {metric.note}
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <span className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                  {t.chartSection.badge}
                </span>
                <span className="font-mono-label text-[11px] text-slate-500 dark:text-neutral-400">
                  Step 1 → Step 5 · Smooth Launch
                </span>
              </div>

              <div className="w-full overflow-hidden">
                <svg
                  viewBox="0 0 500 210"
                  role="img"
                  aria-label="Simple 5-step project launch chart"
                  className="w-full h-auto"
                >
                  {/* Subtle horizontal grid */}
                  {[40, 85, 130, 175].map((yPos) => (
                    <line
                      key={yPos}
                      x1="24"
                      y1={yPos}
                      x2="476"
                      y2={yPos}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-neutral-800"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  ))}

                  {/* Animated Bars */}
                  {points.map((pt, idx) => {
                    const barHeight = 175 - pt.y;
                    return (
                      <rect
                        key={idx}
                        x={pt.x - 16}
                        y={activated ? pt.y : 175}
                        width="32"
                        height={activated ? barHeight : 0}
                        rx="4"
                        fill={idx === points.length - 1 ? '#EA0400' : 'currentColor'}
                        className={
                          idx === points.length - 1
                            ? 'transition-all duration-700 ease-out'
                            : 'text-slate-300 dark:text-neutral-700 transition-all duration-700 ease-out'
                        }
                        style={{ transitionDelay: `${idx * 90}ms` }}
                      />
                    );
                  })}

                  {/* Animated Trajectory Line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#EA0400"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={lineLength}
                    strokeDashoffset={activated ? 0 : lineLength}
                    style={{ transition: 'stroke-dashoffset 950ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />

                  {/* Nodes & Stage Labels */}
                  {points.map((pt, idx) => (
                    <g key={idx}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={activated ? 4.5 : 0}
                        fill="#FFFFFF"
                        stroke="#EA0400"
                        strokeWidth="2"
                        className="transition-all duration-500"
                        style={{ transitionDelay: `${250 + idx * 90}ms` }}
                      />
                      <text
                        x={pt.x}
                        y="196"
                        textAnchor="middle"
                        className="fill-slate-600 dark:fill-neutral-400 text-[11px]"
                      >
                        {t.chartSection.stages[idx]}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-4">
                {t.chartSection.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
