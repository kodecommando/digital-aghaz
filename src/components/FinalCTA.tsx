import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { GlowCard } from '@/components/ui/spotlight-card';

export function FinalCTA() {
  const { t, openInquiryModal } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-[#111111]/86 text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlowCard
          customSize
          glowColor="red"
          className="!bg-gradient-to-br !from-[#161618] !via-[#0d0d0f] !to-[#1a0505] p-8 sm:p-14"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <h2 className="da-h2 text-white">{t.finalCta.headline}</h2>
              <p className="da-body text-neutral-300">{t.finalCta.subheadline}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <InteractiveHoverButton
                onClick={() => openInquiryModal()}
                text={t.finalCta.primaryBtn}
                className="min-w-[11.5rem] py-3 border-neutral-700 bg-white text-slate-950 dark:bg-white dark:text-slate-950"
              />
              <Link
                to="/contact"
                className="btn-secondary-motion inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-700 text-white text-sm font-medium hover:border-white whitespace-nowrap"
              >
                {t.finalCta.secondaryBtn}
              </Link>
            </div>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
