import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiryPayload, filterLeads, isValidLeadStatus, type LeadRecord } from './crm';

test('validateInquiryPayload rejects missing fields and honeypot triggers', () => {
  const bot = validateInquiryPayload({
    fullName: 'Bot User',
    email: 'bot@example.com',
    country: 'Pakistan',
    services: ['Web Development'],
    description: 'Automated spam message trying to submit.',
    website_hp: 'http://spam.example',
  });
  assert.equal(bot.ok, false);
  assert.equal(bot.honeypotTriggered, true);

  const missing = validateInquiryPayload({
    fullName: 'A',
    email: 'bad',
    country: '',
    services: [],
    description: 'short',
  });
  assert.equal(missing.ok, false);
  assert.ok(missing.errors.fullName);
  assert.ok(missing.errors.email);
  assert.ok(missing.errors.country);
  assert.ok(missing.errors.services);
  assert.ok(missing.errors.description);
});

test('validateInquiryPayload accepts valid inquiries and preserves optional defaults', () => {
  const valid = validateInquiryPayload({
    fullName: 'Ayesha Tariq',
    email: 'Ayesha@Studio.PK',
    company: 'Khyber Studio',
    country: 'Pakistan',
    services: ['Graphic Design & Branding', 'Website & E-commerce Development'],
    description: 'We need a complete brand identity and e-commerce storefront.',
  });
  assert.equal(valid.ok, true);
  assert.equal(valid.data?.email, 'ayesha@studio.pk');
  assert.equal(valid.data?.budget, 'Not decided yet');
  assert.equal(valid.data?.services.length, 2);
});

test('filterLeads filters by query and CRM status accurately', () => {
  const leads: LeadRecord[] = [
    {
      id: 'l1',
      fullName: 'Bilal Ahmed',
      email: 'bilal@food.pk',
      company: 'Lahore Grill',
      country: 'Pakistan',
      services: ['Video Editing & Production'],
      description: 'Need reels for restaurant launch.',
      budget: 'Flexible',
      timeline: 'This month',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      referrer: '',
      status: 'NEW',
      notes: '',
      emailStatus: 'skipped_unconfigured',
      createdAt: '2026-11-18T00:00:00Z',
      updatedAt: '2026-11-18T00:00:00Z',
    },
    {
      id: 'l2',
      fullName: 'Sarah Jenkins',
      email: 'sarah@retail.co.uk',
      company: 'Bristol Goods',
      country: 'United Kingdom',
      services: ['AI, Software & Automation'],
      description: 'Need internal RAG workflow.',
      budget: '$2k-$5k',
      timeline: 'Q1',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      referrer: '',
      status: 'QUALIFIED',
      notes: '',
      emailStatus: 'sent',
      createdAt: '2026-11-18T01:00:00Z',
      updatedAt: '2026-11-18T01:00:00Z',
    },
  ];

  assert.equal(filterLeads(leads, '', 'ALL').length, 2);
  assert.equal(filterLeads(leads, 'lahore', 'ALL').length, 1);
  assert.equal(filterLeads(leads, '', 'QUALIFIED')[0].id, 'l2');
  assert.equal(isValidLeadStatus('PROPOSAL_SENT'), true);
  assert.equal(isValidLeadStatus('INVALID_STAGE'), false);
});
