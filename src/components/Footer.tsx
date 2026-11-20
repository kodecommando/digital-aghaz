import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { SERVICES_CATALOG } from '../data/agencyContent';

export function Footer() {
  const { language, t } = useApp();

  return (
    <footer className="bg-white/88 dark:bg-[#050506]/88 border-t border-slate-200 dark:border-neutral-900 text-slate-600 dark:text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3 space-y-4">
          <Link to="/" aria-label="Digital Aghaz Home" className="inline-block">
            <BrandLogo size="md" />
          </Link>
          <p className="text-sm leading-relaxed max-w-sm">
            {t.footer.tagline}
          </p>
          <p className="text-xs font-medium text-slate-800 dark:text-neutral-300">
            {t.footer.locationLabel}
          </p>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            {t.footer.servicesTitle}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
            {SERVICES_CATALOG.map((svc) => (
              <li key={svc.slug}>
                <Link
                  to={`/services/${svc.slug}`}
                  className="hover:text-[#EA0400] transition-colors"
                >
                  {svc.title[language]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            {t.footer.companyTitle}
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/services" className="hover:text-[#EA0400] transition-colors">
                {t.nav.services}
              </Link>
            </li>
            <li>
              <Link to="/work" className="hover:text-[#EA0400] transition-colors">
                {t.nav.work}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#EA0400] transition-colors">
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link to="/insights" className="hover:text-[#EA0400] transition-colors">
                {t.nav.insights}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#EA0400] transition-colors">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-3 text-sm">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            {t.footer.contactTitle}
          </h3>
          <a
            href="mailto:salmancreatorlabs@gmail.com"
            className="flex items-center gap-2 text-xs text-slate-700 dark:text-neutral-300 hover:text-[#EA0400] transition-colors whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5 text-[#EA0400] shrink-0" />
            <span>{t.footer.emailPlaceholder}</span>
          </a>
          <a
            href="tel:+923312427903"
            dir="ltr"
            className="flex items-center gap-2 text-xs text-slate-700 dark:text-neutral-300 hover:text-[#EA0400] transition-colors tabular-nums"
          >
            <Phone className="w-3.5 h-3.5 text-[#EA0400] shrink-0" />
            <span>{t.footer.whatsappPlaceholder}</span>
          </a>
          <p className="text-[11px] text-slate-400 dark:text-neutral-500 pt-1">
            {t.footer.contactNote}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <span>{t.footer.rights}</span>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-[#EA0400] transition-colors">
              {t.footer.privacy}
            </Link>
            <Link to="/terms" className="hover:text-[#EA0400] transition-colors">
              {t.footer.terms}
            </Link>
            <Link to="/admin" className="hover:text-[#EA0400] transition-colors">
              {t.footer.adminPortal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
