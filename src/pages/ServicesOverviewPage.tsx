import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES_CATALOG } from '../data/agencyContent';
import { applyPageMeta } from '../lib/seo';
import { FinalCTA } from '../components/FinalCTA';

export function ServicesOverviewPage() {
  const { language, t, openInquiryModal } = useApp();

  useEffect(() => {
    applyPageMeta({
      title: 'Services Overview — Digital Aghaz',
      description:
        'Explore branding, websites, mobile UI/UX, video production, SEO & AI automation built by Digital Aghaz. Compare deliverables and start your project today.',
      ogImage: '/assets/og/web-development.jpg',
      ogImageAlt: 'Digital Aghaz — All 8 Digital Agency Services Overview',
    });
  }, []);

  return (
    <div className="bg-transparent text-[#0F172A] dark:text-white">
      <section className="py-16 sm:py-20 bg-[#F8FAFC]/72 dark:bg-black/72 border-b border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <p className="text-xs font-medium text-[#EA0400]">{t.servicesSection.kicker}</p>
          <h1 className="da-h1 max-w-3xl text-slate-900 dark:text-white">
            {t.servicesSection.headline}
          </h1>
          <p className="da-body max-w-2xl text-slate-600 dark:text-neutral-400">
            {t.servicesSection.subheadline}
          </p>

          <div className="pt-4 flex flex-wrap gap-2">
            {SERVICES_CATALOG.map((svc) => (
              <a
                key={svc.slug}
                href={`#${svc.slug}`}
                className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-neutral-800 bg-white/92 dark:bg-[#111111]/92 text-xs font-medium hover:border-[#EA0400] transition-colors"
              >
                {svc.number}. {svc.title[language]}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 space-y-10 bg-[#F8FAFC]/68 dark:bg-black/68">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {SERVICES_CATALOG.map((svc) => (
            <article
              key={svc.slug}
              id={svc.slug}
              className="da-card-lift rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#111111]/95 overflow-hidden grid lg:grid-cols-12"
            >
              <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto bg-neutral-900">
                <img
                  src={svc.image}
                  alt={svc.title[language]}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400">
                    <span className="font-mono-label text-[#EA0400]">{svc.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>Digital Aghaz Service</span>
                  </div>
                  <h2 className="da-h2 text-slate-900 dark:text-white">{svc.title[language]}</h2>
                  <p className="da-body text-slate-600 dark:text-neutral-300">
                    {svc.heroSubheadline[language]}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-neutral-400">
                    {svc.problemSolved[language]}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
                        What is included
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-neutral-400">
                        {svc.includes[language].slice(0, 4).map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#EA0400] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
                        What you receive
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-neutral-400">
                        {svc.deliverables[language].map((del) => (
                          <li key={del} className="flex items-start gap-2">
                            <span className="text-[#EA0400]">·</span>
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-neutral-800">
                  <Link
                    to={`/services/${svc.slug}`}
                    className="btn-primary-motion group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-semibold hover:bg-[#EA0400] dark:hover:bg-[#EA0400] dark:hover:text-white"
                  >
                    <span>{svc.ctaLabel[language]}</span>
                    <ArrowRight className="btn-arrow w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => openInquiryModal(svc.slug)}
                    className="btn-secondary-motion px-4 py-2.5 rounded-md border border-slate-300 dark:border-neutral-700 text-xs font-medium hover:border-[#EA0400] cursor-pointer"
                  >
                    {t.nav.startProject}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
