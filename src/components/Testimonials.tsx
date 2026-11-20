import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { wrapCarouselIndex, formatSlideCounter } from '../lib/carousel';
import { GlassFolder, type ArtPreset, type FolderFile } from '@/components/ui/glass-folder-cards';
import { GlowCard } from '@/components/ui/spotlight-card';

const CLIENT_STORY_VISUALS: Record<
  string,
  { cover: string; art: ArtPreset; files: FolderFile[] }
> = {
  'khyber-roast': {
    cover: '/src/assets/images/case_khyber_roast_1794997817138.jpg',
    art: 'ember',
    files: [
      {
        name: 'Logo & Pouch Print',
        meta: 'AI · Vector',
        image: '/src/assets/images/case_khyber_roast_1794997817138.jpg',
      },
      { name: '18 Social Templates', meta: 'Canva · PSD', art: 'dusk' },
      { name: 'Brand Guide.pdf', meta: 'Colors & Fonts' },
    ],
  },
  'nordic-craft': {
    cover: '/src/assets/images/case_nordic_craft_1794997819400.jpg',
    art: 'aurora',
    files: [
      {
        name: 'Storefront Live',
        meta: 'Shopify · Fast',
        image: '/src/assets/images/case_nordic_craft_1794997819400.jpg',
      },
      { name: 'SEO & Sitemap', meta: 'Google Ready', art: 'glacier' },
      { name: 'Handover Guide.pdf', meta: 'Owner Docs' },
    ],
  },
  'fieldflow-ui': {
    cover: '/src/assets/images/case_fieldflow_mobile_1794997820131.jpg',
    art: 'dusk',
    files: [
      {
        name: '24 App Screens',
        meta: 'Figma · Clickable',
        image: '/src/assets/images/case_fieldflow_mobile_1794997820131.jpg',
      },
      { name: 'Android Studio Build', meta: 'Kotlin · QA', art: 'verdant' },
      { name: 'Release Plan.pdf', meta: 'Store Checklist' },
    ],
  },
  'sop-rag': {
    cover: '/src/assets/images/case_sop_assistant_1794997821456.jpg',
    art: 'verdant',
    files: [
      {
        name: 'Handbook AI Helper',
        meta: 'Gemini · RAG',
        image: '/src/assets/images/case_sop_assistant_1794997821456.jpg',
      },
      { name: 'Private Access Control', meta: 'Team Permissions', art: 'ember' },
      { name: 'Staff Prompts.pdf', meta: 'Verified Q&A' },
    ],
  },
};

export function Testimonials() {
  const { language, theme, t } = useApp();
  const navigate = useNavigate();
  const {
    kicker,
    headline,
    subheadline,
    prevLabel,
    nextLabel,
    outcomeLabel,
    exploreService,
    disclaimer,
    items,
  } = t.testimonialsSection;

  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;
  const activeItem = items[wrapCarouselIndex(activeIndex, 0, total)];

  const stepSlide = (delta: number) => {
    setActiveIndex((prev) => wrapCarouselIndex(prev, delta, total));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const isRtl = language === 'ur';
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      stepSlide(isRtl ? -1 : 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stepSlide(isRtl ? 1 : -1);
    }
  };

  if (!activeItem) return null;

  const folderTone = theme === 'dark' ? 'dark' : 'light';

  return (
    <section
      aria-roledescription="carousel"
      aria-label={headline}
      onKeyDown={handleKeyDown}
      data-testid="testimonials-carousel"
      className="py-16 sm:py-24 bg-white/78 dark:bg-[#070708]/78 border-t border-slate-200 dark:border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-medium text-[#EA0400]">{kicker}</p>
            <h2 className="da-h2 text-slate-900 dark:text-white">{headline}</h2>
            <p className="da-body text-slate-600 dark:text-neutral-400">{subheadline}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span
              aria-live="polite"
              data-testid="testimonial-counter"
              className="font-mono-label text-xs text-slate-500 dark:text-neutral-400 me-1"
            >
              {formatSlideCounter(activeIndex, total)}
            </span>
            <button
              type="button"
              onClick={() => stepSlide(-1)}
              aria-label={prevLabel}
              data-testid="testimonial-prev"
              className="btn-secondary-motion p-2.5 rounded-md border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 text-slate-700 dark:text-neutral-200 hover:border-[#EA0400] hover:text-[#EA0400] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => stepSlide(1)}
              aria-label={nextLabel}
              data-testid="testimonial-next"
              className="btn-secondary-motion p-2.5 rounded-md border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 text-slate-700 dark:text-neutral-200 hover:border-[#EA0400] hover:text-[#EA0400] cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Interactive Glass Folder Cards — How Clients Use Our Work */}
        <div
          data-testid="client-work-folders"
          className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center items-end pt-2 pb-4"
        >
          {items.map((item, idx) => {
            const visual = CLIENT_STORY_VISUALS[item.id] ?? {
              cover: '/src/assets/images/case_khyber_roast_1794997817138.jpg',
              art: 'ember' as ArtPreset,
              files: [
                { name: item.outcomeHeadline, meta: item.shortLabel, art: 'aurora' as ArtPreset },
                { name: 'Project Brief.pdf', meta: item.serviceLine },
              ],
            };
            const isSelected = idx === activeIndex;

            return (
              <div
                key={item.id}
                className="flex flex-col items-center gap-3"
              >
                <GlassFolder
                  label={item.shortLabel}
                  meta={item.author}
                  tone={folderTone}
                  image={visual.cover}
                  art={visual.art}
                  seed={idx * 9 + 5}
                  width={265}
                  appearDelay={idx * 90}
                  action="more"
                  files={visual.files}
                  onOpenChange={(isOpen) => {
                    if (isOpen) setActiveIndex(idx);
                  }}
                  menu={[
                    {
                      label: language === 'ur' ? 'کہانی دیکھیں' : 'Read Client Story',
                      onSelect: () => setActiveIndex(idx),
                    },
                    {
                      label: exploreService,
                      onSelect: () => navigate(`/services/${item.serviceSlug}`),
                    },
                  ]}
                  onFileSelect={() => navigate(`/services/${item.serviceSlug}`)}
                />
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#EA0400] bg-[#EA0400] text-white'
                      : 'border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:border-[#EA0400]'
                  }`}
                >
                  0{idx + 1} · {item.shortLabel}
                </button>
              </div>
            );
          })}
        </div>

        {/* Active Story Card wrapped in Spotlight GlowCard */}
        <div data-motion-managed="true">
          <GlowCard
            customSize
            glowColor="red"
            className="p-6 sm:p-10"
          >
            <div
              key={activeItem.id}
              role="tabpanel"
              id={`testimonial-panel-${activeItem.id}`}
              aria-labelledby={`testimonial-tab-${activeItem.id}`}
              className="da-page-enter"
            >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Quote Column */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-5">
                  <Quote className="w-7 h-7 text-[#EA0400] opacity-85" aria-hidden="true" />
                  <blockquote className="text-lg sm:text-2xl font-medium leading-relaxed rtl:leading-loose text-slate-900 dark:text-white">
                    “{activeItem.quote}”
                  </blockquote>
                </div>

                <div className="pt-5 border-t border-slate-200 dark:border-neutral-800 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {activeItem.author}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-neutral-400 mt-0.5">
                      {activeItem.role}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#EA0400]">
                    {activeItem.serviceLine}
                  </span>
                </div>
              </div>

              {/* Project Outcome Column */}
              <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#0B0B0D]/95 p-6 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <p className="font-mono-label text-[11px] uppercase tracking-wider rtl:normal-case rtl:tracking-normal rtl:font-sans rtl:text-xs text-[#EA0400]">
                    {outcomeLabel}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white leading-snug rtl:leading-loose">
                    {activeItem.outcomeHeadline}
                  </h3>
                  <p className="text-sm leading-relaxed rtl:leading-loose text-slate-600 dark:text-neutral-400">
                    {activeItem.outcomeDetail}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-neutral-800">
                  <Link
                    to={`/services/${activeItem.serviceSlug}`}
                    className="group inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-neutral-100 hover:text-[#EA0400] transition-colors"
                  >
                    <span>{exploreService}</span>
                    <ArrowRight className="btn-arrow w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </GlowCard>
        </div>

        {/* Slide Tabs + Honest Sample Note */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label={kicker}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1"
          >
            {items.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  id={`testimonial-tab-${item.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={`testimonial-panel-${item.id}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3.5 py-2.5 rounded-md border text-start transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#EA0400] bg-[#EA0400]/5 dark:bg-[#EA0400]/10 text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-neutral-800 bg-[#F8FAFC] dark:bg-[#111111] text-slate-600 dark:text-neutral-400 hover:border-slate-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <span className="font-mono-label text-[10px] text-[#EA0400] block">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-medium block truncate mt-0.5 rtl:py-0.5">
                    {item.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-[11px] text-slate-500 dark:text-neutral-500">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
