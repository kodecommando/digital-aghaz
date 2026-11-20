import React, { useEffect } from 'react';
import { applyPageMeta } from '../lib/seo';

export function PrivacyPage() {
  useEffect(() => {
    applyPageMeta({
      title: 'Privacy Policy — Digital Aghaz',
      description:
        'Read how Digital Aghaz handles client inquiry data, protects stored briefs, and maintains transparent privacy standards.',
    });
  }, []);

  return (
    <div className="bg-[#F8FAFC] dark:bg-black text-[#0F172A] dark:text-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <h1 className="da-h1">Privacy Policy</h1>
        <p className="da-body text-slate-600 dark:text-neutral-300">
          Digital Aghaz collects project inquiry details (such as your name, business email, company name, country, and project brief) solely to review your request and respond regarding potential work.
        </p>
        <h2 className="da-h3">How We Handle Your Information</h2>
        <ul className="list-disc ps-5 space-y-2 text-sm text-slate-600 dark:text-neutral-400">
          <li>We do not sell, rent, or publicly display customer inquiry data.</li>
          <li>Browser storage is used only for your theme (dark/light) and language (English/Urdu) preferences.</li>
          <li>Inquiry submissions are protected with input validation and server-side access controls.</li>
          <li>You may request deletion or update of your inquiry record by contacting the agency directly.</li>
        </ul>
      </div>
    </div>
  );
}

export function TermsPage() {
  useEffect(() => {
    applyPageMeta({
      title: 'Terms & Conditions — Digital Aghaz',
      description:
        'Review Digital Aghaz written scope rules, revision limits, licensed media standards, and AI delivery terms.',
    });
  }, []);

  return (
    <div className="bg-[#F8FAFC] dark:bg-black text-[#0F172A] dark:text-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <h1 className="da-h1">Terms & Conditions</h1>
        <p className="da-body text-slate-600 dark:text-neutral-300">
          Information published on this website—including service scopes and clearly marked conceptual demonstrations—is for informational purposes and does not constitute a binding contract until a written agreement is approved.
        </p>
        <ul className="list-disc ps-5 space-y-2 text-sm text-slate-600 dark:text-neutral-400">
          <li>All paid engagements begin only after written scope, pricing, revision limits, and deposit terms are confirmed.</li>
          <li>AI and automation deliverables include clear testing boundaries and human-review requirements; no automated system is represented as 100% infallible.</li>
          <li>Digital Aghaz uses only licensed media, official software subscriptions, and authorized tools.</li>
        </ul>
      </div>
    </div>
  );
}
