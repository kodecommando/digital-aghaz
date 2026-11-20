import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { PortfolioItem } from '../types/agency';
import { applyPageMeta } from '../lib/seo';
import { fetchCachedPublicJson } from '../lib/api';
import { FinalCTA } from '../components/FinalCTA';
import { CaseStudyFolders } from '../components/CaseStudyFolders';

const CATEGORIES = [
  'All',
  'Branding',
  'Web Design',
  'Applications',
  'Video',
  'Marketing',
  'AI Solutions',
] as const;

export function WorkPage() {
  const { t } = useApp();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    applyPageMeta({
      title: 'Our Work & Concept Demonstrations — Digital Aghaz',
      description:
        'Browse Digital Aghaz branding, web, mobile app, video & AI concept demos—crafted for measurable speed, clarity, and growth. Request a similar scope.',
    });
    fetchCachedPublicJson<{ items?: PortfolioItem[]; error?: string }>('/api/portfolio')
      .then((d) => {
        if (active && Array.isArray(d?.items)) setItems(d.items);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-transparent text-[#0F172A] dark:text-white">
      <section className="py-16 sm:py-20 bg-[#F8FAFC]/72 dark:bg-black/72 border-b border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <p className="text-xs font-medium text-[#EA0400]">{t.workSection.kicker}</p>
          <h1 className="da-h1 max-w-3xl text-slate-900 dark:text-white">
            {t.workSection.headline}
          </h1>
          <p className="da-body max-w-2xl text-slate-600 dark:text-neutral-400">
            {t.workSection.subheadline}
          </p>

          {/* Interactive Filter Controls */}
          <div className="pt-3 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn-secondary-motion px-3.5 py-1.5 rounded-md text-xs font-medium border cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#EA0400] text-white border-[#EA0400]'
                      : 'bg-white/92 dark:bg-[#111111]/92 text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-neutral-800 hover:border-[#EA0400]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#F8FAFC]/68 dark:bg-black/68">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-sm text-slate-500">Loading sample work...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-slate-500">No projects in this category yet.</p>
          ) : (
            <>
              <CaseStudyFolders items={filtered} maxItems={3} />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  to={`/work/${item.slug}`}
                  className="da-card-lift group rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#111111]/95 overflow-hidden flex flex-col hover:border-[#EA0400]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400">
                        <span>{item.category}</span>
                        {item.isConceptDemo && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#EA0400] font-medium">
                              {t.workSection.conceptLabel}
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-[#EA0400] transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-neutral-400">
                        {item.summary}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-neutral-200 group-hover:text-[#EA0400]">
                      <span>{t.workSection.viewCase}</span>
                      <ArrowRight className="btn-arrow w-3.5 h-3.5 rtl:rotate-180" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            </>
          )}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
