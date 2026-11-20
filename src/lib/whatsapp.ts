export const OWNER_WHATSAPP_NUMBER = '923312427903';

export interface WhatsAppInquiryInput {
  leadId?: string;
  fullName: string;
  email: string;
  company?: string;
  country: string;
  services: string[];
  budget: string;
  timeline: string;
  description: string;
}

function cleanLine(value: string | undefined, fallback = 'Not specified'): string {
  const trimmed = (value ?? '').replace(/\s+/g, ' ').trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function formatInquiryWhatsAppMessage(input: WhatsAppInquiryInput): string {
  const servicesList =
    input.services.length > 0
      ? input.services.map((svc) => `• ${cleanLine(svc)}`).join('\n')
      : '• Not selected';

  const referenceLine = input.leadId ? `*Reference ID:* ${cleanLine(input.leadId)}\n` : '';
  const descriptionBlock = (input.description ?? '').trim() || 'Not provided';

  return [
    '*DIGITAL AGHAZ — NEW PROJECT INQUIRY*',
    referenceLine.trimEnd(),
    '',
    '*1. Client Details*',
    `• *Full Name:* ${cleanLine(input.fullName)}`,
    `• *Email:* ${cleanLine(input.email)}`,
    `• *Company / Brand:* ${cleanLine(input.company, 'Independent / Not specified')}`,
    `• *Country / Region:* ${cleanLine(input.country)}`,
    '',
    '*2. Requested Services*',
    servicesList,
    '',
    '*3. Scope & Timeline*',
    `• *Estimated Budget:* ${cleanLine(input.budget, 'Not decided yet')}`,
    `• *Expected Timeline:* ${cleanLine(input.timeline, 'Flexible')}`,
    '',
    '*4. Project Goals & Requirements*',
    descriptionBlock,
  ]
    .filter((line, idx, arr) => {
      // Collapse consecutive empty lines cleanly when referenceLine is empty
      if (line === '' && (idx === 0 || arr[idx - 1] === '')) return false;
      return true;
    })
    .join('\n');
}

export function buildWhatsAppInquiryUrl(
  input: WhatsAppInquiryInput,
  phone: string = OWNER_WHATSAPP_NUMBER
): string {
  const digits = phone.replace(/\D/g, '') || OWNER_WHATSAPP_NUMBER;
  const text = formatInquiryWhatsAppMessage(input);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
