import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  SERVICES_CATALOG,
  DIGITAL_PRODUCTS_SHOWCASE,
} from '../data/agencyContent';
import { FinalCTA } from '../components/FinalCTA';
import { ServiceTiltCard } from '../components/ServiceTiltCard';
import { applyPageMeta, SERVICE_OG_METADATA } from '../lib/seo';
import { NotFoundPage } from './NotFoundPage';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t, openInquiryModal, openChatbot } = useApp();

  const service = SERVICES_CATALOG.find((s) => s.slug === slug);

  useEffect(() => {
    if (service) {
      const ogMeta = SERVICE_OG_METADATA[service.slug];
      applyPageMeta({
        title: ogMeta?.title ?? `${service.title.en} — Digital Aghaz`,
        description: ogMeta?.description ?? service.heroSubheadline.en,
        ogImage: ogMeta?.ogImage ?? service.image,
        ogImageAlt: ogMeta?.ogImageAlt ?? `${service.title.en} — Digital Aghaz`,
      });
    }
  }, [service]);

  if (!service) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-transparent text-[#0F172A] dark:text-white">
      {/* Service Hero with Clean Showcase Photography */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC]/72 dark:bg-black/72 border-b border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400">
            <Link to="/services" className="hover:text-[#EA0400]">
              {t.nav.services}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 dark:text-white">{service.title[language]}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="font-mono-label text-xs text-[#EA0400]">
                {service.number} · {service.title[language]}
              </span>
              <h1 className="da-h1 text-slate-900 dark:text-white">
                {service.heroHeadline[language]}
              </h1>
              <p className="da-body text-slate-600 dark:text-neutral-300">
                {service.heroSubheadline[language]}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openInquiryModal(service.slug)}
                  className="btn-primary-motion group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#EA0400] text-white text-sm font-semibold hover:bg-[#c80400] cursor-pointer"
                >
                  <span>{service.ctaLabel[language]}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 btn-arrow" />
                </button>
                <Link
                  to="/work"
                  className="btn-secondary-motion px-5 py-3 rounded-md border border-slate-300 dark:border-neutral-700 bg-white/90 dark:bg-black/70 text-sm font-medium hover:border-[#EA0400]"
                >
                  {t.hero.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-neutral-900">
                <img
                  src={service.image}
                  alt={service.title[language]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem, Scope & Deliverables */}
      <section className="py-16 bg-white/78 dark:bg-[#070708]/78 border-b border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#EA0400]">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Quality Check</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
                {service.readinessGate[language]}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h2 className="da-h2 text-slate-900 dark:text-white">
                How this helps your business
              </h2>
              <p className="da-body text-slate-600 dark:text-neutral-400">
                {service.problemSolved[language]}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="da-card-lift rounded-xl border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 p-6 space-y-4">
                <h3 className="da-h3 text-slate-900 dark:text-white">What We Do</h3>
                <ul className="space-y-2.5 text-sm text-slate-600 dark:text-neutral-300">
                  {service.includes[language].map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#EA0400] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="da-card-lift rounded-xl border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 p-6 space-y-4">
                <h3 className="da-h3 text-slate-900 dark:text-white">What You Get</h3>
                <ul className="space-y-2.5 text-sm text-slate-600 dark:text-neutral-300">
                  {service.deliverables[language].map((del) => (
                    <li key={del} className="flex items-start gap-2.5">
                      <span className="font-mono-label text-[#EA0400]">·</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {service.slug === 'ai-automation' && (
              <div className="rounded-xl border border-[#EA0400]/30 bg-[#EA0400]/5 p-6 space-y-3">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Safe, Honest AI Built Around Your Files
                </h3>
                <p className="text-sm text-slate-600 dark:text-neutral-300">
                  We confirm you own the source files, lock answers to authorized users, test against real customer questions, and keep a quick handoff to a human. Try our AI Helper right now to ask about custom automation for your business.
                </p>
                <button
                  type="button"
                  onClick={() => openChatbot()}
                  className="btn-primary-motion inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#EA0400] text-white text-xs font-semibold cursor-pointer"
                >
                  Open AI Helper
                </button>
              </div>
            )}

            {service.slug === 'digital-products' && (
              <div className="space-y-4">
                <h3 className="da-h3 text-slate-900 dark:text-white">
                  Ready-Made Digital Kits (Preview)
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {DIGITAL_PRODUCTS_SHOWCASE.map((prod) => (
                    <div
                      key={prod.id}
                      className="da-card-lift rounded-xl border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 p-4 space-y-2"
                    >
                      <span className="text-[11px] font-medium text-[#EA0400]">
                        {prod.category} · {prod.format}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {prod.title[language]}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-neutral-400">
                        {prod.desc[language]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Connected Services Navigation */}
      <section className="py-12 bg-[#F8FAFC]/68 dark:bg-black/68 border-b border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Other Services You Can Add
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SERVICES_CATALOG.filter((s) => s.slug !== service.slug).map((other) => (
              <ServiceTiltCard key={other.slug} maxTilt={4}>
                <Link
                  to={`/services/${other.slug}`}
                  className="block h-full rounded-lg border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#111111]/95 p-3.5 hover:border-[#EA0400] transition-colors"
                >
                  <span className="font-mono-label text-[11px] text-[#EA0400]">{other.number}</span>
                  <div className="text-xs font-medium text-slate-900 dark:text-white mt-0.5">
                    {other.title[language]}
                  </div>
                </Link>
              </ServiceTiltCard>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
