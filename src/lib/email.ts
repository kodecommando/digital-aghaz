import nodemailer from 'nodemailer';
import type { LeadRecord } from './crm.ts';
import { redactEmail } from './security.ts';

export const DEFAULT_OWNER_EMAIL = 'salmancreatorlabs@gmail.com';
export const DEFAULT_OWNER_PHONE = '+923312427903';

export interface EmailSendResult {
  status: 'sent' | 'skipped_unconfigured' | 'failed';
  detail: string;
}

export function getAdminNotificationTarget(): string {
  return (process.env.ADMIN_EMAIL || DEFAULT_OWNER_EMAIL).trim();
}

export function isLiveEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY ||
      (process.env.SMTP_USER && process.env.SMTP_PASS) ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  );
}

async function sendViaSmtp(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<EmailSendResult | null> {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!user || !pass) return null;

  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;
  const from = process.env.EMAIL_FROM || `Digital Aghaz <${user}>`;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to: params.to,
      replyTo: params.replyTo,
      subject: params.subject,
      html: params.html,
      text: params.text,
    });

    return { status: 'sent', detail: `Delivered via SMTP (${host}).` };
  } catch (err) {
    return {
      status: 'failed',
      detail: err instanceof Error ? err.message : 'SMTP delivery failed.',
    };
  }
}

async function sendViaResend(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<EmailSendResult> {
  const smtpResult = await sendViaSmtp(params);
  if (smtpResult) return smtpResult;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'Digital Aghaz <onboarding@resend.dev>';

  if (!apiKey) {
    return {
      status: 'skipped_unconfigured',
      detail: 'Email provider key not configured; project brief saved in private Admin Dashboard.',
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        ...(params.replyTo ? { reply_to: params.replyTo } : {}),
        subject: params.subject,
        html: params.html,
        text: params.text,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => 'Unknown error');
      return {
        status: 'failed',
        detail: `Resend API error (${response.status}): ${errBody.slice(0, 180)}`,
      };
    }

    return { status: 'sent', detail: 'Delivered via Resend.' };
  } catch (err) {
    return {
      status: 'failed',
      detail: err instanceof Error ? err.message : 'Network error sending email.',
    };
  }
}

export async function sendAdminMagicLinkEmail(params: {
  to: string;
  magicUrl: string;
}): Promise<EmailSendResult> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111111;">
      <h2 style="margin: 0 0 12px; color: #000000;">Digital Aghaz Admin Sign-In</h2>
      <p style="font-size: 14px; line-height: 1.6; color: #333333;">
        Use the single-use secure sign-in link below to open the Digital Aghaz Lead & Content Portal. This link expires in 15 minutes.
      </p>
      <p style="margin: 24px 0;">
        <a href="${params.magicUrl}" style="display: inline-block; background: #EA0400; color: #ffffff; text-decoration: none; padding: 12px 22px; border-radius: 6px; font-weight: 600;">
          Open Admin Portal
        </a>
      </p>
      <p style="font-size: 12px; color: #666666;">
        If you did not request this link, you can safely ignore this message.
      </p>
    </div>
  `;
  const text = `Digital Aghaz Admin Sign-In\n\nOpen the portal (valid 15 minutes, single use):\n${params.magicUrl}\n`;

  const result = await sendViaResend({
    to: params.to,
    subject: 'Digital Aghaz — Admin Portal Sign-In Link',
    html,
    text,
  });

  if (result.status !== 'sent') {
    console.info(`[email] Magic link delivery status for ${redactEmail(params.to)}: ${result.status}`);
  }
  return result;
}

function escapeHtml(value: string): string {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendInquiryNotifications(lead: LeadRecord): Promise<{
  adminNotification: EmailSendResult;
  customerConfirmation: EmailSendResult;
}> {
  const adminEmail = getAdminNotificationTarget();
  const safeId = escapeHtml(lead.id);
  const safeName = escapeHtml(lead.fullName);
  const safeEmail = escapeHtml(lead.email);
  const safeCompany = escapeHtml(lead.company);
  const safeCountry = escapeHtml(lead.country);
  const safeServices = escapeHtml(lead.services.join(', '));
  const safeBudget = escapeHtml(lead.budget);
  const safeTimeline = escapeHtml(lead.timeline);
  const safeDescription = escapeHtml(lead.description).replace(/\n/g, '<br/>');
  const safeAdminEmail = escapeHtml(adminEmail);

  const adminNotification = await sendViaResend({
    to: adminEmail,
    replyTo: lead.email,
    subject: `New Project Brief (${lead.id}) — ${lead.company} (${lead.fullName})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; color: #111111;">
        <h2 style="color: #EA0400; margin-bottom: 12px;">New Client Project Brief</h2>
        <p><strong>Reference ID:</strong> ${safeId}</p>
        <p><strong>Client Name:</strong> ${safeName}</p>
        <p><strong>Client Email:</strong> ${safeEmail}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Country:</strong> ${safeCountry}</p>
        <p><strong>Selected Services:</strong> ${safeServices}</p>
        <p><strong>Budget Tier:</strong> ${safeBudget}</p>
        <p><strong>Timeline:</strong> ${safeTimeline}</p>
        <p style="margin-top: 16px;"><strong>Project Details:</strong><br/>${safeDescription}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666666;">Saved in your private Digital Aghaz Admin Dashboard (/admin).</p>
      </div>
    `,
    text: `New Project Inquiry (${lead.id})\nName: ${lead.fullName}\nClient Email: ${lead.email}\nCompany: ${lead.company}\nCountry: ${lead.country}\nServices: ${lead.services.join(', ')}\nBudget: ${lead.budget}\nTimeline: ${lead.timeline}\n\n${lead.description}`,
  });

  const customerConfirmation = await sendViaResend({
    to: lead.email,
    subject: 'We received your project inquiry — Digital Aghaz',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; padding: 24px; color: #111111;">
        <h2 style="margin: 0 0 12px;">Thank you, ${safeName}.</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #333333;">
          Your project inquiry has been recorded by Digital Aghaz (Reference: <strong>${safeId}</strong>).
          Our team will review your requirements across ${safeServices} and reply directly from ${safeAdminEmail}.
        </p>
        <p style="font-size: 13px; color: #666666; margin-top: 20px;">
          Digital Aghaz · ${safeAdminEmail} · ${DEFAULT_OWNER_PHONE}
        </p>
      </div>
    `,
    text: `Thank you, ${lead.fullName}.\n\nYour project inquiry has been recorded by Digital Aghaz (Reference: ${lead.id}).\nServices requested: ${lead.services.join(', ')}.\n\nDigital Aghaz — ${adminEmail} · ${DEFAULT_OWNER_PHONE}`,
  });

  return { adminNotification, customerConfirmation };
}
