import React, { useEffect, useMemo, useState } from 'react';
import { Check, ArrowRight, ArrowLeft, ShieldCheck, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES_CATALOG } from '../data/agencyContent';
import { buildWhatsAppInquiryUrl, type WhatsAppInquiryInput } from '../lib/whatsapp';
import { apiFetchJson } from '../lib/api';
import type { ServiceSlug } from '../types/agency';

interface InquiryFormProps {
  initialService?: ServiceSlug | null;
  onSuccess?: (leadId: string) => void;
}

export function InquiryForm({ initialService = null, onSuccess }: InquiryFormProps) {
  const { language, t, addToast } = useApp();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    if (!initialService) return [];
    const found = SERVICES_CATALOG.find((s) => s.slug === initialService);
    return found ? [found.title.en] : [];
  });
  const [description, setDescription] = useState('');
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [timelineIdx, setTimelineIdx] = useState(0);
  const [websiteHp, setWebsiteHp] = useState('');
  const [submittedSnapshot, setSubmittedSnapshot] = useState<WhatsAppInquiryInput | null>(null);

  const budget = t.form.budgetOptions[budgetIdx] ?? t.form.budgetOptions[0];
  const timeline = t.form.timelineOptions[timelineIdx] ?? t.form.timelineOptions[0];

  useEffect(() => {
    if (initialService) {
      const found = SERVICES_CATALOG.find((s) => s.slug === initialService);
      if (found && !selectedServices.includes(found.title.en)) {
        setSelectedServices((prev) => [...prev, found.title.en]);
      }
    }
  }, [initialService]);

  const currentInquiryDraft: WhatsAppInquiryInput = useMemo(
    () => ({
      fullName: fullName.trim(),
      email: email.trim(),
      company: company.trim(),
      country: country.trim(),
      services: selectedServices,
      budget,
      timeline,
      description: description.trim(),
    }),
    [fullName, email, company, country, selectedServices, budget, timeline, description]
  );

  const step5WhatsappUrl = useMemo(
    () => buildWhatsAppInquiryUrl(currentInquiryDraft),
    [currentInquiryDraft]
  );

  const confirmedWhatsappUrl = useMemo(
    () =>
      submittedSnapshot
        ? buildWhatsAppInquiryUrl(submittedSnapshot)
        : step5WhatsappUrl,
    [submittedSnapshot, step5WhatsappUrl]
  );

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((item) => item !== serviceName)
        : [...prev, serviceName]
    );
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.services;
      return next;
    });
  };

  const validateStep = (targetStep: number): boolean => {
    const errs: Record<string, string> = {};
    if (targetStep === 0) {
      if (fullName.trim().length < 2) errs.fullName = t.form.errors.fullName;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
        errs.email = t.form.errors.email;
      }
      if (country.trim().length < 2) errs.country = t.form.errors.country;
    }
    if (targetStep === 1) {
      if (selectedServices.length === 0) errs.services = t.form.errors.services;
    }
    if (targetStep === 2) {
      if (description.trim().length < 15) errs.description = t.form.errors.description;
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(4, s + 1));
    }
  };

  const buildRequestPayload = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      fullName: fullName.trim(),
      email: email.trim(),
      company: company.trim(),
      country: country.trim(),
      services: selectedServices,
      description: description.trim(),
      budget,
      timeline,
      website_hp: websiteHp,
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
      referrer: document.referrer || '',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (step < 4) {
      handleNext();
      return;
    }

    if (!validateStep(0)) {
      setStep(0);
      return;
    }
    if (!validateStep(1)) {
      setStep(1);
      return;
    }
    if (!validateStep(2)) {
      setStep(2);
      return;
    }

    setSubmitting(true);
    try {
      const result = await apiFetchJson<{
        ok?: boolean;
        leadId?: string;
        error?: string;
        fieldErrors?: Record<string, string>;
      }>('/api/inquiries', {
        method: 'POST',
        retries: 1,
        body: buildRequestPayload(),
      });

      if (!result.ok || !result.data?.ok) {
        if (result.data?.fieldErrors) setFieldErrors(result.data.fieldErrors);
        const msg = result.error || 'Could not submit inquiry. Please check your details.';
        setServerError(msg);
        addToast('error', msg);
        return;
      }

      const refId = result.data.leadId || 'DA-RECORDED';
      setSubmittedSnapshot({ ...currentInquiryDraft, leadId: refId });
      setSubmittedId(refId);
      addToast('success', t.form.successTitle);
      onSuccess?.(refId);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppHandoff = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateStep(0)) {
      e.preventDefault();
      setStep(0);
      return;
    }
    if (!validateStep(1)) {
      e.preventDefault();
      setStep(1);
      return;
    }
    if (!validateStep(2)) {
      e.preventDefault();
      setStep(2);
      return;
    }

    const snapshot = { ...currentInquiryDraft };
    if (!submittedId) {
      apiFetchJson<{ ok?: boolean; leadId?: string; error?: string }>('/api/inquiries', {
        method: 'POST',
        keepalive: true,
        retries: 0,
        body: buildRequestPayload(),
      }).then((res) => {
        if (res.ok && res.data?.ok && res.data.leadId) {
          setSubmittedSnapshot({ ...snapshot, leadId: res.data.leadId });
          setSubmittedId(res.data.leadId);
          onSuccess?.(res.data.leadId);
        }
      });
    }
  };

  const resetForm = () => {
    setSubmittedId(null);
    setSubmittedSnapshot(null);
    setStep(0);
    setFullName('');
    setEmail('');
    setCompany('');
    setCountry('');
    setDescription('');
    setBudgetIdx(0);
    setTimelineIdx(0);
    setSelectedServices([]);
    setFieldErrors({});
    setServerError(null);
  };

  if (submittedId) {
    return (
      <div
        data-testid="inquiry-success"
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8 space-y-4"
      >
        <div className="w-11 h-11 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
          <Check className="w-5 h-5" />
        </div>
        <h3 className="da-h3 text-slate-900 dark:text-white">{t.form.successTitle}</h3>
        <p className="da-body text-slate-600 dark:text-neutral-300">{t.form.successBody}</p>
        <div className="p-3 rounded-lg bg-white dark:bg-[#111111] border border-slate-200 dark:border-neutral-800 inline-flex items-center gap-3 text-xs">
          <span className="text-slate-500 dark:text-neutral-400">{t.form.referenceLabel}:</span>
          <span className="font-mono-label font-semibold text-slate-900 dark:text-white">
            {submittedId}
          </span>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href={confirmedWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="inquiry-success-whatsapp-btn"
            className="btn-primary-motion inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.form.whatsappSuccessBtn}</span>
          </a>
          <button
            type="button"
            onClick={resetForm}
            className="px-3 py-2 text-xs font-medium text-[#EA0400] hover:underline cursor-pointer"
          >
            {t.form.sendAnother}
          </button>
        </div>

        <p className="text-[11px] text-slate-500 dark:text-neutral-400">
          {t.form.whatsappNote}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot field hidden from human users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Website</label>
        <input
          id="website_hp"
          name="website_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={websiteHp}
          onChange={(e) => setWebsiteHp(e.target.value)}
        />
      </div>

      {/* Step Indicator */}
      <div className="grid grid-cols-5 gap-2" aria-label="Form progress">
        {t.form.stepLabels.map((label, idx) => {
          const active = idx === step;
          const completed = idx < step;
          return (
            <button
              key={label}
              type="button"
              onClick={() => {
                if (idx < step) setStep(idx);
              }}
              className={`text-start pb-2 border-b-2 transition-colors ${
                active
                  ? 'border-[#EA0400] text-slate-900 dark:text-white'
                  : completed
                    ? 'border-slate-900 dark:border-white text-slate-700 dark:text-neutral-300 cursor-pointer'
                    : 'border-slate-200 dark:border-neutral-800 text-slate-400 dark:text-neutral-500'
              }`}
            >
              <span className="block font-mono-label text-[11px]">0{idx + 1}</span>
              <span className="block text-[11px] font-medium truncate">{label}</span>
            </button>
          );
        })}
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-3 rounded-lg border border-[#EA0400]/50 bg-[#EA0400]/10 text-xs text-slate-900 dark:text-white"
        >
          {serverError}
        </div>
      )}

      {/* Step 1: Business Info */}
      {step === 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="inquiry-fullName"
              className="block text-xs font-medium text-slate-800 dark:text-neutral-200"
            >
              {t.form.fullName} *
            </label>
            <input
              id="inquiry-fullName"
              name="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.form.fullNamePlaceholder}
              className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#EA0400] focus:outline-none"
            />
            {fieldErrors.fullName && (
              <p className="text-xs text-[#EA0400]">{fieldErrors.fullName}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="inquiry-email"
              className="block text-xs font-medium text-slate-800 dark:text-neutral-200"
            >
              {t.form.email} *
            </label>
            <input
              id="inquiry-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.form.emailPlaceholder}
              className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#EA0400] focus:outline-none"
            />
            {fieldErrors.email && (
              <p className="text-xs text-[#EA0400]">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="inquiry-company"
              className="block text-xs font-medium text-slate-800 dark:text-neutral-200"
            >
              {t.form.company}
            </label>
            <input
              id="inquiry-company"
              name="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={t.form.companyPlaceholder}
              className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#EA0400] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="inquiry-country"
              className="block text-xs font-medium text-slate-800 dark:text-neutral-200"
            >
              {t.form.country} *
            </label>
            <input
              id="inquiry-country"
              name="country"
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={t.form.countryPlaceholder}
              className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#EA0400] focus:outline-none"
            />
            {fieldErrors.country && (
              <p className="text-xs text-[#EA0400]">{fieldErrors.country}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Services Multi-Select */}
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-800 dark:text-neutral-200">
            {t.form.servicesLabel} *
          </p>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {SERVICES_CATALOG.map((svc) => {
              const checked = selectedServices.includes(svc.title.en);
              return (
                <button
                  key={svc.slug}
                  type="button"
                  onClick={() => toggleService(svc.title.en)}
                  aria-pressed={checked}
                  className={`flex items-center justify-between gap-2 rounded-lg border px-3.5 py-3 text-start text-xs font-medium transition-colors cursor-pointer ${
                    checked
                      ? 'border-[#EA0400] bg-[#EA0400]/10 text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0F] text-slate-700 dark:text-neutral-300 hover:border-slate-400'
                  }`}
                >
                  <span>
                    {svc.number}. {svc.title[language]}
                  </span>
                  {checked && <Check className="w-4 h-4 text-[#EA0400] shrink-0" />}
                </button>
              );
            })}
          </div>
          {fieldErrors.services && (
            <p className="text-xs text-[#EA0400]">{fieldErrors.services}</p>
          )}
        </div>
      )}

      {/* Step 3: Project Description */}
      {step === 2 && (
        <div className="space-y-2">
          <label
            htmlFor="inquiry-description"
            className="block text-xs font-medium text-slate-800 dark:text-neutral-200"
          >
            {t.form.description} *
          </label>
          <textarea
            id="inquiry-description"
            name="description"
            rows={5}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.form.descriptionPlaceholder}
            className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#EA0400] focus:outline-none"
          />
          {fieldErrors.description && (
            <p className="text-xs text-[#EA0400]">{fieldErrors.description}</p>
          )}
        </div>
      )}

      {/* Step 4: Optional Budget & Timeline */}
      {step === 3 && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="inquiry-budget"
              className="block text-xs font-medium text-slate-800 dark:text-neutral-200"
            >
              {t.form.budget}
            </label>
            <select
              id="inquiry-budget"
              value={budgetIdx}
              onChange={(e) => setBudgetIdx(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#EA0400] focus:outline-none"
            >
              {t.form.budgetOptions.map((opt, idx) => (
                <option key={opt} value={idx}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="inquiry-timeline"
              className="block text-xs font-medium text-slate-800 dark:text-neutral-200"
            >
              {t.form.timeline}
            </label>
            <select
              id="inquiry-timeline"
              value={timelineIdx}
              onChange={(e) => setTimelineIdx(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0F] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#EA0400] focus:outline-none"
            >
              {t.form.timelineOptions.map((opt, idx) => (
                <option key={opt} value={idx}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step 5: Review & Submit */}
      {step === 4 && (
        <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-[#111111] p-5 space-y-3 text-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-[#EA0400]">
            <ShieldCheck className="w-4 h-4" />
            <span>Summary before submission</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 dark:text-neutral-400">{t.form.fullName}: </span>
              <span className="font-medium text-slate-900 dark:text-white">{fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-neutral-400">{t.form.email}: </span>
              <span className="font-medium text-slate-900 dark:text-white">{email}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-neutral-400">{t.form.country}: </span>
              <span className="font-medium text-slate-900 dark:text-white">{country}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-neutral-400">{t.form.budget}: </span>
              <span className="font-medium text-slate-900 dark:text-white">{budget}</span>
            </div>
          </div>
          <div className="text-xs">
            <span className="text-slate-500 dark:text-neutral-400">{t.form.servicesLabel}: </span>
            <span className="font-medium text-slate-900 dark:text-white">
              {selectedServices.join(' · ')}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-neutral-300 border-t border-slate-200 dark:border-neutral-800 pt-2">
            {description}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-neutral-400">
            {t.form.whatsappNote}
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="btn-secondary-motion inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-slate-300 dark:border-neutral-700 text-xs font-medium text-slate-800 dark:text-neutral-200 hover:border-slate-900 dark:hover:border-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{t.form.backBtn}</span>
          </button>
        ) : (
          <span className="text-[11px] text-slate-500 dark:text-neutral-400">
            * {t.form.requiredHint}
          </span>
        )}

        {step < 4 ? (
          <button
            type="submit"
            data-testid="inquiry-next-btn"
            className="btn-secondary-motion group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-semibold hover:bg-[#EA0400] dark:hover:bg-[#EA0400] dark:hover:text-white cursor-pointer"
          >
            <span>{t.form.nextBtn}</span>
            <ArrowRight className="btn-arrow w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2.5 justify-end">
            <a
              href={step5WhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppHandoff}
              data-testid="inquiry-whatsapp-btn"
              className="btn-secondary-motion inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.form.sendWhatsappBtn}</span>
            </a>
            <button
              type="submit"
              disabled={submitting}
              data-testid="inquiry-submit-btn"
              className="btn-primary-motion group inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#EA0400] text-white text-xs font-semibold hover:bg-[#c80400] disabled:opacity-60 cursor-pointer"
            >
              <span>{submitting ? t.form.submittingBtn : t.form.submitBtn}</span>
              <ArrowRight className="btn-arrow w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
