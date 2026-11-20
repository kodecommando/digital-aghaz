import { isValidEmail, sanitizeText } from './validation.ts';

export const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'MEETING',
  'PROPOSAL_SENT',
  'NEGOTIATION',
  'WON',
  'LOST',
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface LeadRecord {
  id: string;
  fullName: string;
  email: string;
  company: string;
  country: string;
  services: string[];
  description: string;
  budget: string;
  timeline: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  referrer: string;
  status: LeadStatus;
  notes: string;
  emailStatus: 'sent' | 'skipped_unconfigured' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface InquiryPayload {
  fullName?: unknown;
  email?: unknown;
  company?: unknown;
  country?: unknown;
  services?: unknown;
  description?: unknown;
  budget?: unknown;
  timeline?: unknown;
  website_hp?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  referrer?: unknown;
}

export interface ValidatedInquiry {
  ok: boolean;
  errors: Record<string, string>;
  honeypotTriggered: boolean;
  data?: Omit<LeadRecord, 'id' | 'status' | 'notes' | 'emailStatus' | 'createdAt' | 'updatedAt'>;
}

export function validateInquiryPayload(payload: InquiryPayload): ValidatedInquiry {
  const hp = sanitizeText(payload.website_hp, 120);
  if (hp.length > 0) {
    return { ok: false, errors: {}, honeypotTriggered: true };
  }

  const errors: Record<string, string> = {};
  const fullName = sanitizeText(payload.fullName, 120);
  const email = sanitizeText(payload.email, 254).toLowerCase();
  const company = sanitizeText(payload.company, 140);
  const country = sanitizeText(payload.country, 100);
  const description = sanitizeText(payload.description, 3000);
  const budget = sanitizeText(payload.budget, 100) || 'Not decided yet';
  const timeline = sanitizeText(payload.timeline, 100) || 'Flexible';

  const rawServices = Array.isArray(payload.services) ? payload.services : [];
  const services = rawServices
    .map((s) => sanitizeText(s, 80))
    .filter((s) => s.length > 0)
    .slice(0, 10);

  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }
  if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid business email address.';
  }
  if (country.length < 2) {
    errors.country = 'Please specify your country or region.';
  }
  if (services.length === 0) {
    errors.services = 'Please select at least one service area.';
  }
  if (description.length < 15) {
    errors.description = 'Please describe your project goals (at least 15 characters).';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, honeypotTriggered: false };
  }

  return {
    ok: true,
    errors: {},
    honeypotTriggered: false,
    data: {
      fullName,
      email,
      company: company || 'Independent / Not specified',
      country,
      services,
      description,
      budget,
      timeline,
      utmSource: sanitizeText(payload.utmSource, 80),
      utmMedium: sanitizeText(payload.utmMedium, 80),
      utmCampaign: sanitizeText(payload.utmCampaign, 80),
      referrer: sanitizeText(payload.referrer, 240),
    },
  };
}

export function filterLeads(
  leads: LeadRecord[],
  query: string,
  statusFilter: string
): LeadRecord[] {
  const q = query.trim().toLowerCase();
  return leads.filter((lead) => {
    const matchesStatus = !statusFilter || statusFilter === 'ALL' || lead.status === statusFilter;
    if (!matchesStatus) return false;
    if (!q) return true;
    return (
      lead.fullName.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.company.toLowerCase().includes(q) ||
      lead.country.toLowerCase().includes(q) ||
      lead.services.some((s) => s.toLowerCase().includes(q))
    );
  });
}

export function isValidLeadStatus(value: string): value is LeadStatus {
  return (LEAD_STATUSES as readonly string[]).includes(value);
}
