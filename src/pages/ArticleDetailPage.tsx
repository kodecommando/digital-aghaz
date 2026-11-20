import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { InsightItem } from '../types/agency';
import { FinalCTA } from '../components/FinalCTA';
import { applyPageMeta } from '../lib/seo';
import { fetchCachedPublicJson } from '../lib/api';
import { NotFoundPage } from './NotFoundPage';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useApp();
  const [article, setArticle] = useState<InsightItem | null>(null);
  const [related, setRelated] = useState<InsightItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchCachedPublicJson<{ items?: InsightItem[]; error?: string }>('/api/insights')
      .then((d) => {
        if (!active) return;
        const items = d?.items ?? [];
        const found = items.find((a) => a.slug === slug) ?? null;
        setArticle(found);
        setRelated(items.filter((a) => a.slug !== slug).slice(0, 2));
        if (found) {
          applyPageMeta({
            title: `${found.title} — Digital Aghaz`,
            description: found.excerpt,
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
      <div className="max-w-3xl mx-auto px-4 py-20 text-sm text-slate-500">
        Loading article...
      </div>
    );
  }

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-transparent text-[#0F172A] dark:text-white">
      <article className="py-14 sm:py-20 bg-[#F8FAFC]/76 dark:bg-black/76">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400">
            <Link to="/insights" className="hover:text-[#EA0400]">
              {t.nav.insights}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readMinutes} min read</span>
          </div>

          <h1 className="da-h1 text-slate-900 dark:text-white">{article.title}</h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400">
            By {article.author}
          </p>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-neutral-900">
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5 pt-4">
            {article.content.map((para, idx) => (
              <p
                key={idx}
                className="da-body text-slate-700 dark:text-neutral-300 leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          {related.length > 0 && (
            <div className="pt-10 mt-10 border-t border-slate-200 dark:border-neutral-800 space-y-4">
              <h2 className="da-h3 text-slate-900 dark:text-white">More Helpful Guides</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/insights/${rel.slug}`}
                    className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#111111]/95 p-4 hover:border-[#EA0400] transition-colors space-y-1.5"
                  >
                    <span className="text-[11px] text-[#EA0400] font-medium">
                      {rel.category}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {rel.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <FinalCTA />
    </div>
  );
}
