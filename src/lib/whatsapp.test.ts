import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatInquiryWhatsAppMessage,
  buildWhatsAppInquiryUrl,
  OWNER_WHATSAPP_NUMBER,
} from './whatsapp';

test('formatInquiryWhatsAppMessage formats all inquiry fields in structured order', () => {
  const msg = formatInquiryWhatsAppMessage({
    leadId: 'DA-AB12CD',
    fullName: 'Ayesha Tariq',
    email: 'ayesha@example.com',
    company: 'Khyber Studio',
    country: 'Pakistan',
    services: ['Website & E-Commerce Development', 'SEO & Digital Marketing'],
    budget: 'Standard Business Package',
    timeline: 'Within 2–4 weeks',
    description: 'Need a fast bilingual storefront and structured SEO setup.',
  });

  assert.match(msg, /\*DIGITAL AGHAZ — NEW PROJECT INQUIRY\*/);
  assert.match(msg, /\*Reference ID:\* DA-AB12CD/);
  assert.match(msg, /• \*Full Name:\* Ayesha Tariq/);
  assert.match(msg, /• \*Email:\* ayesha@example\.com/);
  assert.match(msg, /• \*Company \/ Brand:\* Khyber Studio/);
  assert.match(msg, /• Website & E-Commerce Development/);
  assert.match(msg, /• SEO & Digital Marketing/);
  assert.match(msg, /Need a fast bilingual storefront and structured SEO setup\./);
});

test('formatInquiryWhatsAppMessage omits reference line cleanly when absent and fills optional company default', () => {
  const msg = formatInquiryWhatsAppMessage({
    fullName: 'Bilal',
    email: 'bilal@example.com',
    company: '',
    country: 'UAE',
    services: ['Graphic Design & Branding'],
    budget: 'Not decided yet',
    timeline: 'Flexible',
    description: 'Logo and packaging kit for specialty coffee brand.',
  });

  assert.equal(msg.includes('Reference ID'), false);
  assert.match(msg, /• \*Company \/ Brand:\* Independent \/ Not specified/);
  assert.equal(msg.includes('\n\n\n'), false);
});

test('buildWhatsAppInquiryUrl encodes formatted message against owner WhatsApp number', () => {
  const url = buildWhatsAppInquiryUrl(
    {
      fullName: 'Salman Test',
      email: 'salman@example.com',
      country: 'Pakistan',
      services: ['AI, Software & Automation'],
      budget: 'Custom / Full-Scale Build',
      timeline: '1–2 months',
      description: 'Looking for an internal RAG assistant.',
    },
    '+92 331 2427903'
  );

  assert.ok(url.startsWith(`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=`));
  const query = url.split('?text=')[1] ?? '';
  const decoded = decodeURIComponent(query);
  assert.match(decoded, /\*Full Name:\* Salman Test/);
  assert.match(decoded, /Looking for an internal RAG assistant\./);
});
