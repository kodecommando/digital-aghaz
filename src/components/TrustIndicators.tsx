import React from 'react';
import { Award, FileCheck2, Globe2, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MotionReveal } from './MotionReveal';
import { GlowCard } from '@/components/ui/spotlight-card';

interface PlatformLogoItem {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
}

const PLATFORM_LOGOS: PlatformLogoItem[] = [
  {
    id: 'shopify',
    name: 'Shopify',
    role: 'Online Stores',
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="w-6 h-6 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 9.5L24 9.5L26 26.5H6L8 9.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 9.5V7.5C12 5.29086 13.7909 3.5 16 3.5C18.2091 3.5 20 5.29086 20 7.5V9.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M18.2 15.2C17.6 14.7 16.8 14.5 16 14.5C14.7 14.5 13.8 15.2 13.8 16.2C13.8 18.4 18.4 17.6 18.4 20.1C18.4 21.3 17.3 22 15.8 22C14.8 22 13.9 21.7 13.2 21.1"
          stroke="#EA0400"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    role: 'Business Sites',
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="w-6 h-6 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8.5 12L12.3 22.5L16 13.2L19.7 22.5L23.5 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23.5" cy="12" r="1.4" fill="#EA0400" />
      </svg>
    ),
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    role: 'Search & Hosting',
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="w-6 h-6 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10.5 24H22.2C25.1 24 27.5 21.7 27.5 18.9C27.5 16.4 25.6 14.3 23.1 13.9C22.4 9.9 18.9 7 14.7 7C10.1 7 6.3 10.7 6.3 15.3C6.3 15.7 6.3 16.1 6.4 16.4C4.9 17.2 4 18.7 4 20.4C4 22.4 5.6 24 7.7 24H10.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="15.5" cy="16" r="2.2" fill="#EA0400" />
      </svg>
    ),
  },
  {
    id: 'meta-suite',
    name: 'Meta Suite',
    role: 'Ads & Social',
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="w-6 h-6 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9.8 21.5C6.8 21.5 5 19.2 5 16C5 12.6 7.1 10 9.8 10C12.7 10 14.6 13.2 16 16C17.4 18.8 19.3 22 22.2 22C24.9 22 27 19.4 27 16C27 12.8 25.2 10.5 22.2 10.5C19.8 10.5 18 12.4 16.9 14.2"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="1.7" fill="#EA0400" />
      </svg>
    ),
  },
  {
    id: 'react-ts',
    name: 'React & TS',
    role: 'Fast Web Apps',
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="w-6 h-6 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <ellipse
          cx="16"
          cy="16"
          rx="11.5"
          ry="4.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="11.5"
          ry="4.5"
          transform="rotate(60 16 16)"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="11.5"
          ry="4.5"
          transform="rotate(120 16 16)"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="16" cy="16" r="2.2" fill="#EA0400" />
      </svg>
    ),
  },
  {
    id: 'gemini-ai',
    name: 'Gemini AI',
    role: 'Smart Tools',
    icon: (
      <svg
        viewBox="0 0 32 32"
        className="w-6 h-6 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 4C16.7 10.8 21.2 15.3 28 16C21.2 16.7 16.7 21.2 16 28C15.3 21.2 10.8 16.7 4 16C10.8 15.3 15.3 10.8 16 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16" r="2" fill="#EA0400" />
      </svg>
    ),
  },
];

const BADGE_ICONS: Record<string, React.ReactNode> = {
  'speed-quality': <Smartphone className="w-4 h-4 text-[#EA0400] shrink-0" />,
  'written-plan': <FileCheck2 className="w-4 h-4 text-[#EA0400] shrink-0" />,
  'official-licenses': <Award className="w-4 h-4 text-[#EA0400] shrink-0" />,
  'bilingual-delivery': <Globe2 className="w-4 h-4 text-[#EA0400] shrink-0" />,
};

export function TrustIndicators() {
  const { t } = useApp();

  return (
    <section
      data-testid="trust-indicators-section"
      className="scroll-mt-20 py-12 sm:py-14 bg-[#F8FAFC]/82 dark:bg-[#050506]/82 border-b border-slate-200 dark:border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <MotionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-[#EA0400]">
              {t.trustIndicators.kicker}
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {t.trustIndicators.headline}
            </h2>
          </div>
          <p className="text-xs font-medium text-slate-500 dark:text-neutral-400">
            {t.trustIndicators.partnersLabel}
          </p>
        </MotionReveal>

        {/* Partner Platform Logos */}
        <MotionReveal
          staggerSelector=".partner-logo-card"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {PLATFORM_LOGOS.map((partner) => (
            <div
              key={partner.id}
              data-testid={`partner-logo-${partner.id}`}
              className="partner-logo-card group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#101012]/95 px-4 py-3.5 text-slate-700 dark:text-neutral-200 hover:border-[#EA0400]/60 transition-colors"
            >
              <span className="text-slate-700 dark:text-neutral-200 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                {partner.icon}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {partner.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-neutral-400 truncate">
                  {partner.role}
                </div>
              </div>
            </div>
          ))}
        </MotionReveal>

        {/* Industry & Credibility Badges */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
            {t.trustIndicators.badgesLabel}
          </p>
          <MotionReveal
            staggerSelector=".credibility-badge"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {t.trustIndicators.badges.map((badge) => (
              <GlowCard
                key={badge.id}
                customSize
                glowColor="red"
                className="credibility-badge px-4 py-3.5"
              >
                <div
                  data-testid={`credibility-badge-${badge.id}`}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 rounded-md bg-[#EA0400]/10 p-1.5 shrink-0">
                    {BADGE_ICONS[badge.id] ?? (
                      <Smartphone className="w-4 h-4 text-[#EA0400]" />
                    )}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      {badge.title}
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600 dark:text-neutral-400">
                      {badge.detail}
                    </p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
