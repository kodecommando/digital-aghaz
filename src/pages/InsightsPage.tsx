import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { InsightItem } from '../types/agency';
import { applyPageMeta } from '../lib/seo';
import { fetchCachedPublicJson } from '../lib/api';
import { FinalCTA } from '../components/FinalCTA';

const INSIGHT_CATEGORIES = [
  'All',
  'AI',
  'Technology',
  'Digital Marketing',
  'Web Development',
  'Branding',
  'Business Growth',
  'Tutorials',
] as const;

export function InsightsPage() {
  const { t } = useApp();
  const [articles, setArticles] = useState<InsightItem[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    let active = true;
    applyPageMeta({
      title: 'Insights & Practical Guides — Digital Aghaz',
      description:
        'Actionable guides on web security, UX clarity, conversion architecture & practical AI workflows from Digital Aghaz—built for founders and teams.',
    });
    fetchCachedPublicJson<{ items?: InsightItem[]; error?: string }>('/api/insights').then(
      (d) => {
        if (active && Array.isArray(d?.items)) setArticles(d.items);
      }
    );
    return () => {
      active = false;
    };
  }, []);

  const filtered = articles.filter((art) => {
    const matchCat = category === 'All' || art.category === category;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div className="bg-transparent text-[#0F172A] dark:text-white">
      <section className="py-16 sm:py-20 bg-[#F8FAFC]/72 dark:bg-black/72 border-b border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <p className="text-xs font-medium text-[#EA0400]">{t.insightsSection.kicker}</p>
          <h1 className="da-h1 max-w-3xl text-slate-900 dark:text-white">
            {t.insightsSection.headline}
          </h1>
          <p className="da-body max-w-2xl text-slate-600 dark:text-neutral-400">
            {t.insightsSection.subheadline}
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between pt-2">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                aria-label="Search articles"
                className="w-full rounded-lg border border-slate-300 dark:border-neutral-800 bg-white/95 dark:bg-[#111111]/95 ps-9 pe-3 py-2 text-xs text-slate-900 dark:text-white focus:border-[#EA0400] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {INSIGHT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border cursor-pointer whitespace-nowrap ${
                    category === cat
                      ? 'bg-[#EA0400] text-white border-[#EA0400]'
                      : 'bg-white/92 dark:bg-[#111111]/92 text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#F8FAFC]/68 dark:bg-black/68">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-sm text-slate-500">No articles match your search yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((article) => (
                <Link
                  key={article.id}
                  to={`/insights/${article.slug}`}
                  className="da-card-lift group rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#111111]/95 overflow-hidden flex flex-col hover:border-[#EA0400]"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400">
                        <span>{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.publishedAt}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.readMinutes} min read</span>
                      </div>
                      <h2 className="da-h3 text-slate-900 dark:text-white group-hover:text-[#EA0400] transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-neutral-400">
                        {article.excerpt}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-neutral-200 group-hover:text-[#EA0400]">
                      <span>{t.insightsSection.readArticle}</span>
                      <ArrowRight className="btn-arrow w-3.5 h-3.5 rtl:rotate-180" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
