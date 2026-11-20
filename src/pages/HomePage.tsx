import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, ChevronDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ENGINE_NODES } from '../lib/engineNodes';
import { GrowthChart } from '../components/GrowthChart';
import { TrustIndicators } from '../components/TrustIndicators';
import { FAQAccordion } from '../components/FAQAccordion';
import { Testimonials } from '../components/Testimonials';
import { FinalCTA } from '../components/FinalCTA';
import { MotionReveal } from '../components/MotionReveal';
import { ServiceTiltCard } from '../components/ServiceTiltCard';
import { ServiceToolsMarquee } from '../components/ServiceToolsMarquee';
import { CaseStudyFolders } from '../components/CaseStudyFolders';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { GlowCard } from '@/components/ui/spotlight-card';
import { RotatingServiceText } from '@/components/ui/rotating-service-text';
import { SERVICES_CATALOG } from '../data/agencyContent';
import { applyPageMeta } from '../lib/seo';
import { fetchCachedPublicJson } from '../lib/api';
import type { PortfolioItem, InsightItem } from '../types/agency';

export function HomePage() {
  const { language, t, activeEngineNode, setActiveEngineNode, openInquiryModal, openChatbot } =
    useApp();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const rotatingServiceNames = React.useMemo(
    () => SERVICES_CATALOG.map((svc) => svc.title[language]),
    [language]
  );

  useEffect(() => {
    applyPageMeta({
      title: 'Digital Aghaz — Full-Service Digital Agency',
    });
  }, []);

  useEffect(() => {
    const el = heroCopyRef.current;
    if (!el) return;
    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let active = true;
    fetchCachedPublicJson<{ items?: PortfolioItem[]; error?: string }>('/api/portfolio').then(
      (d) => {
        if (active && Array.isArray(d?.items)) setPortfolio(d.items.slice(0, 4));
      }
    );

    fetchCachedPublicJson<{ items?: InsightItem[]; error?: string }>('/api/insights').then((d) => {
      if (active && Array.isArray(d?.items)) setInsights(d.items.slice(0, 3));
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bg-transparent text-[#0F172A] dark:text-white">
      {/* SECTION B: FULL-BLEED BACKGROUND VIDEO OVER LAZY SITE-WIDE 3D ENGINE BEHIND HERO TEXT */}
      <section className="relative min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] flex flex-col justify-between overflow-hidden border-b border-slate-200 dark:border-neutral-900 bg-transparent">
        {/* Atmospheric Looping Background Video at subtle opacity so the global 3D engine shines through */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          data-testid="hero-bg-video"
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-22 dark:opacity-35 pointer-events-none"
          src="/assets/hero-backdrop.mp4"
        />

        {/* Measured Contrast Scrim keeping foreground crisp in both Light & Dark mode */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] bg-gradient-to-b from-[#F8FAFC]/74 via-[#F8FAFC]/48 to-[#F8FAFC]/82 dark:from-black/68 dark:via-black/40 dark:to-black/82 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-0 z-[2] bg-gradient-to-r rtl:bg-gradient-to-l from-[#F8FAFC]/72 via-[#F8FAFC]/24 to-transparent dark:from-black/70 dark:via-black/22 dark:to-transparent pointer-events-none"
        />

        {/* Foreground Hero Typography & Animated Actions */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 flex-1 flex items-center">
          <div ref={heroCopyRef} className="max-w-3xl space-y-6">
            <p className="hero-stagger text-xs font-medium text-slate-700 dark:text-neutral-300">
              {t.hero.kicker}
            </p>

            <h1 className="hero-stagger da-h1 text-slate-950 dark:text-white">
              {t.hero.headlineStart}
              <RotatingServiceText items={rotatingServiceNames} intervalMs={5000} />
              {t.hero.headlineEnd}
            </h1>

            <p className="hero-stagger da-body text-slate-700 dark:text-neutral-200 max-w-2xl">
              {t.hero.subheadline}
            </p>

            <div className="hero-stagger flex flex-wrap items-center gap-3 pt-2">
              <InteractiveHoverButton
                onClick={() => openInquiryModal()}
                text={t.hero.primaryCta}
                data-testid="hero-primary-cta"
                className="min-w-[12.5rem] py-3 text-sm"
              />
              <Link
                to="/work"
                className="btn-secondary-motion inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 dark:border-neutral-700 bg-white/88 dark:bg-black/70 text-slate-900 dark:text-white text-sm font-medium hover:border-[#EA0400] hover:text-[#EA0400] whitespace-nowrap"
              >
                {t.hero.secondaryCta}
              </Link>
            </div>

            <div className="hero-stagger pt-4 flex flex-wrap items-center gap-5 text-xs text-slate-600 dark:text-neutral-300">
              <a
                href="#brand-intro"
                className="inline-flex items-center gap-1.5 hover:text-[#EA0400] transition-colors"
              >
                <ChevronDown className="w-4 h-4 text-[#EA0400]" />
                <span>{t.hero.scrollHint}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Dock: Ergonomic 3D Engine Node Controls */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 flex flex-wrap items-center justify-start gap-3">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Service focus controls">
            {ENGINE_NODES.map((node) => {
              const isActive = activeEngineNode === node.key;
              return (
                <button
                  key={node.key}
                  type="button"
                  onClick={() => setActiveEngineNode(node.key)}
                  className={`btn-secondary-motion px-3 py-1.5 text-xs font-medium rounded-md border whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#EA0400] text-white border-[#EA0400]'
                      : 'bg-white/92 dark:bg-[#0D0D0F]/90 text-slate-700 dark:text-neutral-200 border-slate-200 dark:border-neutral-800 hover:border-[#EA0400]/70'
                  }`}
                >
                  {node.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CREDIBILITY & ECOSYSTEM STACK: TRUST INDICATORS */}
      <TrustIndicators />

      {/* OPPOSING BI-DIRECTIONAL TOOLS & METHODS SHOWCASE */}
      <ServiceToolsMarquee />

      {/* SECTION C: BRAND INTRODUCTION (FOUR PILLARS) */}
      <section
        id="brand-intro"
        className="py-16 sm:py-20 bg-white/78 dark:bg-[#070708]/78 border-b border-slate-200 dark:border-neutral-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal className="max-w-3xl space-y-3 mb-12">
            <p className="text-xs font-medium text-[#EA0400]">{t.intro.kicker}</p>
            <h2 className="da-h2 text-slate-900 dark:text-white">{t.intro.headline}</h2>
            <p className="da-body text-slate-600 dark:text-neutral-400">{t.intro.body}</p>
          </MotionReveal>

          <MotionReveal staggerSelector=".pillar-card" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.intro.pillars.map((pillar) => (
              <GlowCard
                key={pillar.num}
                customSize
                glowColor="red"
                className="pillar-card p-6"
              >
                <div className="space-y-3">
                  <span className="font-mono-label text-xs font-semibold text-[#EA0400]">
                    {pillar.num}
                  </span>
                  <h3 className="da-h3 text-slate-900 dark:text-white">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
                    {pillar.desc}
                  </p>
                </div>
              </GlowCard>
            ))}
          </MotionReveal>
        </div>
      </section>

      {/* SECTION D: EIGHT SERVICES OVERVIEW */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]/68 dark:bg-black/68 border-b border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <MotionReveal className="max-w-2xl space-y-3">
              <p className="text-xs font-medium text-[#EA0400]">{t.servicesSection.kicker}</p>
              <h2 className="da-h2 text-slate-900 dark:text-white">
                {t.servicesSection.headline}
              </h2>
              <p className="da-body text-slate-600 dark:text-neutral-400">
                {t.servicesSection.subheadline}
              </p>
            </MotionReveal>
            <Link
              to="/services"
              className="btn-secondary-motion inline-flex items-center gap-1.5 text-sm font-medium text-[#EA0400] hover:underline shrink-0"
            >
              <span>{t.servicesSection.viewAll}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <MotionReveal staggerSelector=".service-card" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES_CATALOG.map((svc) => (
              <ServiceTiltCard key={svc.slug} className="service-card h-full">
                <Link
                  to={`/services/${svc.slug}`}
                  onMouseEnter={() => {
                    if (
                      svc.theme3d === 'web' ||
                      svc.theme3d === 'mobile' ||
                      svc.theme3d === 'ai' ||
                      svc.theme3d === 'branding' ||
                      svc.theme3d === 'seo' ||
                      svc.theme3d === 'video'
                    ) {
                      setActiveEngineNode(svc.theme3d);
                    }
                  }}
                  className="group h-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#111111]/95 overflow-hidden flex flex-col hover:border-[#EA0400] hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/50 transition-colors"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                    <img
                      src={svc.image}
                      alt={svc.title[language]}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <span className="font-mono-label text-xs text-[#EA0400]">
                        {svc.number}
                      </span>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-[#EA0400] transition-colors">
                        {svc.title[language]}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-neutral-400">
                        {svc.shortDesc[language]}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-neutral-200 group-hover:text-[#EA0400]">
                      <span>{t.servicesSection.exploreLink}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 btn-arrow" />
                    </span>
                  </div>
                </Link>
              </ServiceTiltCard>
            ))}
          </MotionReveal>
        </div>
      </section>

      {/* SECTION E: WHY DIGITAL AGHAZ */}
      <section className="py-16 sm:py-20 bg-white/78 dark:bg-[#070708]/78">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <MotionReveal className="lg:col-span-5 space-y-4">
              <p className="text-xs font-medium text-[#EA0400]">{t.whySection.kicker}</p>
              <h2 className="da-h2 text-slate-900 dark:text-white">{t.whySection.headline}</h2>
              <p className="da-body text-slate-600 dark:text-neutral-400">
                {t.whySection.subheadline}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openChatbot()}
                  className="btn-secondary-motion inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-slate-300 dark:border-neutral-700 bg-white/90 dark:bg-black/70 text-xs font-medium text-slate-800 dark:text-neutral-200 hover:border-[#EA0400] hover:text-[#EA0400] cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#EA0400]" />
                  <span>{t.whySection.askAiCta}</span>
                </button>
              </div>
            </MotionReveal>

            <MotionReveal staggerSelector=".why-card" className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {t.whySection.points.map((pt, idx) => (
                <GlowCard
                  key={pt.title}
                  customSize
                  glowColor="red"
                  className="why-card p-6"
                >
                  <div className="space-y-2">
                    <span className="font-mono-label text-xs text-slate-500 dark:text-neutral-400">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {pt.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
                      {pt.desc}
                    </p>
                  </div>
                </GlowCard>
              ))}
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* ANIMATED ILLUSTRATIVE WORKFLOW CHART */}
      <GrowthChart />

      {/* SECTION F: SELECTED WORK (CONCEPTUAL DEMOS) */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]/68 dark:bg-black/68 border-t border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <MotionReveal className="max-w-2xl space-y-3">
              <p className="text-xs font-medium text-[#EA0400]">{t.workSection.kicker}</p>
              <h2 className="da-h2 text-slate-900 dark:text-white">{t.workSection.headline}</h2>
              <p className="da-body text-slate-600 dark:text-neutral-400">
                {t.workSection.subheadline}
              </p>
            </MotionReveal>
            <Link
              to="/work"
              className="btn-secondary-motion inline-flex items-center gap-1.5 text-sm font-medium text-[#EA0400] hover:underline shrink-0"
            >
              <span>{t.workSection.allWork}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <CaseStudyFolders items={portfolio} maxItems={3} />

          <MotionReveal staggerSelector=".work-card" refreshKey={portfolio.length} className="grid md:grid-cols-2 gap-6">
            {portfolio.map((item) => (
              <Link
                key={item.id}
                to={`/work/${item.slug}`}
                className="work-card da-card-lift group rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#111111]/95 overflow-hidden flex flex-col hover:border-[#EA0400]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
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
                    <h3 className="da-h3 text-slate-900 dark:text-white group-hover:text-[#EA0400] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-neutral-400 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-neutral-200 group-hover:text-[#EA0400]">
                    <span>{t.workSection.viewCase}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 btn-arrow" />
                  </span>
                </div>
              </Link>
            ))}
          </MotionReveal>
        </div>
      </section>

      {/* SECTION G: FIVE-STAGE DIGITAL PROCESS */}
      <section className="py-16 sm:py-20 bg-white/78 dark:bg-[#070708]/78 border-t border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal className="max-w-2xl space-y-3 mb-12">
            <p className="text-xs font-medium text-[#EA0400]">{t.processSection.kicker}</p>
            <h2 className="da-h2 text-slate-900 dark:text-white">{t.processSection.headline}</h2>
            <p className="da-body text-slate-600 dark:text-neutral-400">
              {t.processSection.subheadline}
            </p>
          </MotionReveal>

          <MotionReveal staggerSelector=".step-card" className="grid md:grid-cols-5 gap-4">
            {t.processSection.steps.map((step) => (
              <GlowCard
                key={step.num}
                customSize
                glowColor="red"
                className="step-card p-5"
              >
                <div className="space-y-2.5">
                  <span className="font-mono-label text-xs font-semibold text-[#EA0400]">
                    {step.num}
                  </span>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-neutral-400">
                    {step.desc}
                  </p>
                </div>
              </GlowCard>
            ))}
          </MotionReveal>
        </div>
      </section>

      {/* SECTION H: INDUSTRIES WE WORK WITH */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]/68 dark:bg-black/68 border-t border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal className="max-w-2xl space-y-3 mb-10">
            <p className="text-xs font-medium text-[#EA0400]">{t.industriesSection.kicker}</p>
            <h2 className="da-h2 text-slate-900 dark:text-white">
              {t.industriesSection.headline}
            </h2>
          </MotionReveal>

          <MotionReveal staggerSelector=".industry-card" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.industriesSection.items.map((ind) => (
              <GlowCard
                key={ind.name}
                customSize
                glowColor="red"
                className="industry-card p-6"
              >
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {ind.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-neutral-400">{ind.offers}</p>
                </div>
              </GlowCard>
            ))}
          </MotionReveal>
        </div>
      </section>

      {/* SECTION I: INSIGHTS PREVIEW */}
      <section className="py-16 sm:py-20 bg-white/78 dark:bg-[#070708]/78 border-t border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <MotionReveal className="max-w-2xl space-y-3">
              <p className="text-xs font-medium text-[#EA0400]">{t.insightsSection.kicker}</p>
              <h2 className="da-h2 text-slate-900 dark:text-white">
                {t.insightsSection.headline}
              </h2>
              <p className="da-body text-slate-600 dark:text-neutral-400">
                {t.insightsSection.subheadline}
              </p>
            </MotionReveal>
            <Link
              to="/insights"
              className="btn-secondary-motion inline-flex items-center gap-1.5 text-sm font-medium text-[#EA0400] hover:underline shrink-0"
            >
              <span>{t.insightsSection.exploreInsights}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <MotionReveal staggerSelector=".insight-card" refreshKey={insights.length} className="grid md:grid-cols-3 gap-6">
            {insights.map((article) => (
              <Link
                key={article.id}
                to={`/insights/${article.slug}`}
                className="insight-card da-card-lift group rounded-xl border border-slate-200 dark:border-neutral-800 bg-[#F8FAFC]/92 dark:bg-[#111111]/92 p-6 flex flex-col justify-between gap-4 hover:border-[#EA0400]"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readMinutes} min read</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-[#EA0400] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-neutral-400 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-neutral-200 group-hover:text-[#EA0400]">
                  <span>{t.insightsSection.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 btn-arrow" />
                </span>
              </Link>
            ))}
          </MotionReveal>
        </div>
      </section>

      {/* SECTION J: FAQ */}
      <FAQAccordion />

      {/* SECTION K: CLIENT STORIES & OUTCOMES CAROUSEL */}
      <Testimonials />

      {/* SECTION L: FINAL CTA */}
      <FinalCTA />
    </div>
  );
}
