import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { SERVICES_CATALOG } from '../data/agencyContent';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

export function Navbar() {
  const {
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    t,
    openInquiryModal,
  } = useApp();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#0A0A0A]/95 border-b border-slate-200 dark:border-neutral-800 shadow-xs'
          : 'bg-[#F8FAFC]/90 dark:bg-black/90 border-b border-slate-200/70 dark:border-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Official Logo */}
        <Link
          to="/"
          aria-label="Digital Aghaz Home"
          className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#EA0400] rounded-md"
        >
          <BrandLogo size="sm" />
        </Link>

        {/* Zone 2: Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`whitespace-nowrap shrink-0 transition-colors ${
              isActive('/')
                ? 'text-[#EA0400]'
                : 'text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {t.nav.home}
          </Link>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive('/services')
                  ? 'text-[#EA0400]'
                  : 'text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <span>{t.nav.services}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {servicesOpen && (
              <div
                role="menu"
                className="absolute top-full start-0 mt-3 w-[540px] rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] shadow-xl p-4 grid grid-cols-2 gap-2 z-50"
              >
                <Link
                  to="/services"
                  role="menuitem"
                  className="col-span-2 flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-neutral-900 text-xs font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <span>{t.nav.allServices}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EA0400]" />
                </Link>
                {SERVICES_CATALOG.map((svc) => (
                  <Link
                    key={svc.slug}
                    to={`/services/${svc.slug}`}
                    role="menuitem"
                    className="flex flex-col gap-0.5 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-neutral-900 transition-colors"
                  >
                    <span className="text-xs font-medium text-slate-900 dark:text-white">
                      {svc.number}. {svc.title[language]}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-1">
                      {svc.shortDesc[language]}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/work"
            className={`whitespace-nowrap shrink-0 transition-colors ${
              isActive('/work')
                ? 'text-[#EA0400]'
                : 'text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {t.nav.work}
          </Link>

          <Link
            to="/about"
            className={`whitespace-nowrap shrink-0 transition-colors ${
              isActive('/about')
                ? 'text-[#EA0400]'
                : 'text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {t.nav.about}
          </Link>

          <Link
            to="/insights"
            className={`whitespace-nowrap shrink-0 transition-colors ${
              isActive('/insights')
                ? 'text-[#EA0400]'
                : 'text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {t.nav.insights}
          </Link>

          <Link
            to="/contact"
            className={`whitespace-nowrap shrink-0 transition-colors ${
              isActive('/contact')
                ? 'text-[#EA0400]'
                : 'text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {t.nav.contact}
          </Link>
        </nav>

        {/* Zone 3: Language, Theme, AI Advisor & Primary CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            role="switch"
            dir="ltr"
            aria-checked={language === 'ur'}
            onClick={toggleLanguage}
            data-testid="lang-toggle"
            aria-label={language === 'en' ? 'Switch language to Urdu (RTL)' : 'Switch language to English (LTR)'}
            className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold rounded-md border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] text-slate-700 dark:text-neutral-200 hover:border-[#EA0400] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span
              className={
                language === 'en'
                  ? 'text-[#EA0400]'
                  : 'text-slate-400 dark:text-neutral-500'
              }
            >
              EN
            </span>
            <span
              aria-hidden="true"
              className="relative inline-flex h-4 w-7 shrink-0 items-center rounded-sm bg-slate-200 dark:bg-neutral-800 p-0.5 transition-colors"
            >
              <span
                className={`h-3 w-3 rounded-[2px] bg-[#EA0400] shadow-xs transition-transform duration-200 ${
                  language === 'ur' ? 'translate-x-3' : 'translate-x-0'
                }`}
              />
            </span>
            <span
              className={
                language === 'ur'
                  ? 'text-[#EA0400] font-sans'
                  : 'text-slate-400 dark:text-neutral-500 font-sans'
              }
            >
              اردو
            </span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            data-testid="theme-toggle"
            aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
            className="p-2 rounded-md border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-200 hover:border-[#EA0400] transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <InteractiveHoverButton
            onClick={() => openInquiryModal()}
            text={t.nav.startProject}
            data-testid="nav-start-project-btn"
            className="hidden sm:inline-flex min-w-[8.75rem] px-4 py-1.5 text-xs"
          />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={mobileOpen}
            className="lg:hidden p-2 rounded-md border border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-white cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0A0A0A] px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <Link to="/" className="py-2 text-slate-900 dark:text-white">
              {t.nav.home}
            </Link>
            <Link to="/services" className="py-2 text-slate-900 dark:text-white">
              {t.nav.services}
            </Link>
            <div className="ps-3 border-s border-slate-200 dark:border-neutral-800 grid grid-cols-1 gap-1.5 pb-1">
              {SERVICES_CATALOG.map((svc) => (
                <Link
                  key={svc.slug}
                  to={`/services/${svc.slug}`}
                  className="py-1 text-xs text-slate-600 dark:text-neutral-400 hover:text-[#EA0400]"
                >
                  {svc.number}. {svc.title[language]}
                </Link>
              ))}
            </div>
            <Link to="/work" className="py-2 text-slate-900 dark:text-white">
              {t.nav.work}
            </Link>
            <Link to="/about" className="py-2 text-slate-900 dark:text-white">
              {t.nav.about}
            </Link>
            <Link to="/insights" className="py-2 text-slate-900 dark:text-white">
              {t.nav.insights}
            </Link>
            <Link to="/contact" className="py-2 text-slate-900 dark:text-white">
              {t.nav.contact}
            </Link>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openInquiryModal();
              }}
              className="w-full py-2.5 px-4 rounded-md bg-[#EA0400] text-white text-sm font-semibold"
            >
              {t.nav.startProject}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
