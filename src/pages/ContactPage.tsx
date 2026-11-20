import React, { useEffect } from 'react';
import { ShieldCheck, MessageSquare, Clock, Mail, Phone, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InquiryForm } from '../components/InquiryForm';
import { applyPageMeta } from '../lib/seo';

export function ContactPage() {
  const { t, openChatbot } = useApp();

  useEffect(() => {
    applyPageMeta({
      title: 'Start a Project — Digital Aghaz',
      description:
        'Share your project brief in 2 minutes or send details directly on WhatsApp (+92 331 2427903). Get a written scope and discovery call with Digital Aghaz.',
    });
  }, []);

  return (
    <div className="bg-transparent text-[#0F172A] dark:text-white">
      <section className="py-14 sm:py-20 bg-[#F8FAFC]/72 dark:bg-black/72">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-medium text-[#EA0400]">{t.nav.contact}</p>
            <h1 className="da-h1 text-slate-900 dark:text-white">
              Tell us what you want to build next.
            </h1>
            <p className="da-body text-slate-600 dark:text-neutral-300">
              Share a quick note about your business and goals. Every form message lands straight in our private inbox so we can reply quickly with clear next steps.
            </p>

            <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#111111]/95 p-6 space-y-4">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Reach Us Directly
              </h2>
              <div className="space-y-3 text-xs text-slate-600 dark:text-neutral-400">
                <a
                  href="mailto:salmancreatorlabs@gmail.com"
                  className="flex items-center gap-2.5 text-slate-900 dark:text-white hover:text-[#EA0400] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#EA0400] shrink-0" />
                  <span className="font-medium break-all">{t.footer.emailPlaceholder}</span>
                </a>
                <a
                  href="tel:+923312427903"
                  dir="ltr"
                  className="flex items-center gap-2.5 text-slate-900 dark:text-white hover:text-[#EA0400] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#EA0400] shrink-0" />
                  <span className="font-medium">{t.footer.whatsappPlaceholder}</span>
                </a>
                <div className="pt-1">
                  <a
                    href="https://wa.me/923312427903"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-motion inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-slate-300 dark:border-neutral-700 text-xs font-semibold text-slate-900 dark:text-white hover:border-[#EA0400] hover:text-[#EA0400]"
                  >
                    <span>Message on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-neutral-500">
                  {t.footer.contactNote}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-neutral-400">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#EA0400] shrink-0 mt-0.5" />
                <span>
                  Your details stay private on our server and are never shared or sold.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#EA0400] shrink-0 mt-0.5" />
                <span>
                  Still deciding on budget or timeline? Leave them open and we will guide you.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#EA0400] shrink-0 mt-0.5" />
                <button
                  type="button"
                  onClick={() => openChatbot()}
                  className="text-start underline hover:text-[#EA0400] cursor-pointer"
                >
                  Got a quick question first? Ask our Digital Aghaz Helper.
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-[#111111]/95 p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="da-h2 text-slate-900 dark:text-white">{t.form.title}</h2>
                <p className="text-sm text-slate-600 dark:text-neutral-400 mt-1">
                  {t.form.subtitle}
                </p>
              </div>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
