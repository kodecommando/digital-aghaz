import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InquiryForm } from './InquiryForm';

export function InquiryModal() {
  const { inquiryModalOpen, closeInquiryModal, preselectedService, t } = useApp();

  useEffect(() => {
    if (!inquiryModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeInquiryModal();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [inquiryModalOpen, closeInquiryModal]);

  if (!inquiryModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeInquiryModal();
      }}
    >
      <div className="w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0F] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 id="inquiry-modal-title" className="da-h2 text-slate-900 dark:text-white">
              {t.form.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-400 mt-1">
              {t.form.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={closeInquiryModal}
            aria-label="Close inquiry modal"
            className="p-2 rounded-md border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <InquiryForm initialService={preselectedService} />
      </div>
    </div>
  );
}
