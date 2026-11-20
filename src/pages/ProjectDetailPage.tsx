import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { PortfolioItem } from '../types/agency';
import { FinalCTA } from '../components/FinalCTA';
import { applyPageMeta } from '../lib/seo';
import { fetchCachedPublicJson } from '../lib/api';
import { NotFoundPage } from './NotFoundPage';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, openInquiryModal } = useApp();
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchCachedPublicJson<{ items?: PortfolioItem[]; error?: string }>('/api/portfolio')
      .then((d) => {
        if (!active) return;
        const found = d?.items?.find((p) => p.slug === slug) ?? null;
        setItem(found);
        if (found) {
          applyPageMeta({
            title: `${found.title} — Digital Aghaz`,
            description: found.summary,
            ogImage: found.coverImage,
          });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-sm text-slate-500">
        Loading project details...
      </div>
    );
  }

  if (!item) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-transparent text-[#0F172A] dark:text-white">
      <section className="py-14 sm:py-20 bg-[#F8FAFC]/72 dark:bg-black/72 border-b border-slate-200 dark:border-neutral-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400">
            <Link to="/work" className="hover:text-[#EA0400]">
              {t.nav.work}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{item.category}</span>
            {item.isConceptDemo && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#EA0400] font-medium">{t.workSection.conceptLabel}</span>
              </>
            )}
          </div>

          <h1 className="da-h1 text-slate-900 dark:text-white">{item.title}</h1>
          <p className="da-body text-slate-600 dark:text-neutral-300">{item.summary}</p>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-neutral-900">
            <img
              src={item.coverImage}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/78 dark:bg-[#070708]/78">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-8">
            <div className="space-y-2">
              <h2 className="da-h3 text-slate-900 dark:text-white">The Goal</h2>
              <p className="da-body text-slate-600 dark:text-neutral-400">{item.objective}</p>
            </div>
            <div className="space-y-2">
              <h2 className="da-h3 text-slate-900 dark:text-white">The Problem</h2>
              <p className="da-body text-slate-600 dark:text-neutral-400">{item.challenge}</p>
            </div>
            <div className="space-y-2">
              <h2 className="da-h3 text-slate-900 dark:text-white">Our Plan</h2>
              <p className="da-body text-slate-600 dark:text-neutral-400">{item.strategy}</p>
            </div>
            <div className="space-y-2">
              <h2 className="da-h3 text-slate-900 dark:text-white">What We Built</h2>
              <p className="da-body text-slate-600 dark:text-neutral-400">{item.execution}</p>
            </div>
          </div>

          <aside className="md:col-span-4 space-y-6">
            <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                What Came in the Kit
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-neutral-300">
                {item.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#EA0400] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-slate-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => openInquiryModal()}
                  className="btn-primary-motion group w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-md bg-[#EA0400] text-white text-xs font-semibold hover:bg-[#c80400] cursor-pointer"
                >
                  <span>Build Something Like This</span>
                  <ArrowRight className="btn-arrow w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
