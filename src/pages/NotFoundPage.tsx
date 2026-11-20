import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applyPageMeta } from '../lib/seo';

export function NotFoundPage() {
  useEffect(() => {
    applyPageMeta({
      title: 'Page Not Found — Digital Aghaz',
      description: 'The requested page could not be found. Explore Digital Aghaz services or start a project brief.',
      noindex: true,
    });
  }, []);

  return (
    <div className="min-h-[65vh] bg-[#F8FAFC] dark:bg-black text-[#0F172A] dark:text-white flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-md">
        <p className="font-mono-label text-xs text-[#EA0400]">404 · Page Not Found</p>
        <h1 className="da-h2">We could not find that page.</h1>
        <p className="text-sm text-slate-600 dark:text-neutral-400">
          The page you requested may have moved or does not exist. Explore our services or return to the homepage.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-md bg-[#EA0400] text-white text-xs font-semibold"
          >
            Back to Home
          </Link>
          <Link
            to="/services"
            className="px-5 py-2.5 rounded-md border border-slate-300 dark:border-neutral-700 text-xs font-medium"
          >
            View Services
          </Link>
        </div>
      </div>
    </div>
  );
}
