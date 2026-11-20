import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function FAQAccordion() {
  const { t } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 bg-[#F8FAFC]/68 dark:bg-black/68 border-t border-slate-200 dark:border-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-medium text-[#EA0400] mb-2">
            {t.faqSection.kicker}
          </p>
          <h2 className="da-h2 text-slate-900 dark:text-white">
            {t.faqSection.headline}
          </h2>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-neutral-800 border-y border-slate-200 dark:border-neutral-800">
          {t.faqSection.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full py-5 flex items-center justify-between gap-4 text-start cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EA0400]"
                >
                  <span className="text-base font-medium text-slate-900 dark:text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 dark:text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#EA0400]' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="da-body text-slate-600 dark:text-neutral-400">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
