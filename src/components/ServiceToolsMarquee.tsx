import React from 'react';
import { useApp } from '@/context/AppContext';
import { MotionReveal } from './MotionReveal';

interface ToolMethodItem {
  id: string;
  name: string;
  service: { en: string; ur: string };
  method: { en: string; ur: string };
  accent: string;
  badgeBg: string;
  logo: React.ReactNode;
}

const ROW_ONE_TOOLS: ToolMethodItem[] = [
  {
    id: 'android-studio',
    name: 'Android Studio',
    service: { en: 'Mobile App Development', ur: 'موبائل ایپ ڈیولپمنٹ' },
    method: {
      en: 'Native Kotlin builds, device testing & Play Store release',
      ur: 'اینڈرائیڈ ایپ کوڈنگ، فون ٹیسٹنگ اور پلے اسٹور لانچ',
    },
    accent: '#3DDC84',
    badgeBg: 'bg-[#3DDC84]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#111827" />
        <path
          d="M11 23L18 9L25 23"
          stroke="#3DDC84"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13.5 19H22.5" stroke="#3DDC84" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="18" cy="26" r="2.2" fill="#4285F4" />
      </svg>
    ),
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    service: { en: 'Graphic Design & Visuals', ur: 'گرافک ڈیزائن اور پوسٹس' },
    method: {
      en: 'High-click thumbnails, ad creatives & clean photo retouching',
      ur: 'تھمب نیلز، اشتہاری ڈیزائن اور صاف فوٹو ایڈیٹنگ',
    },
    accent: '#31A8FF',
    badgeBg: 'bg-[#31A8FF]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#001E36" stroke="#31A8FF" strokeWidth="1.5" />
        <text x="18" y="23" textAnchor="middle" fill="#31A8FF" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">
          Ps
        </text>
      </svg>
    ),
  },
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    service: { en: 'Logos & Brand Identity', ur: 'لوگو اور برانڈنگ' },
    method: {
      en: 'Crisp vector logos, print packaging & scalable brand icons',
      ur: 'ویکٹر لوگو، پرنٹ پیکجنگ اور صاف برانڈ آئیکنز',
    },
    accent: '#FF9A00',
    badgeBg: 'bg-[#FF9A00]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#330000" stroke="#FF9A00" strokeWidth="1.5" />
        <text x="18" y="23" textAnchor="middle" fill="#FF9A00" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">
          Ai
        </text>
      </svg>
    ),
  },
  {
    id: 'figma',
    name: 'Figma',
    service: { en: 'UI/UX & App Prototypes', ur: 'UI/UX اور ایپ ڈیزائن' },
    method: {
      en: 'Clickable phone & web screens tested before writing code',
      ur: 'کوڈنگ سے پہلے کلک ایبل فون اور ویب اسکرین ڈیزائن',
    },
    accent: '#A259FF',
    badgeBg: 'bg-[#A259FF]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#18181B" />
        <circle cx="15" cy="11.5" r="3.5" fill="#F24E1E" />
        <circle cx="21" cy="11.5" r="3.5" fill="#FF7262" />
        <circle cx="15" cy="18" r="3.5" fill="#A259FF" />
        <circle cx="21" cy="18" r="3.5" fill="#1ABCFE" />
        <circle cx="15" cy="24.5" r="3.5" fill="#0ACF83" />
      </svg>
    ),
  },
  {
    id: 'premiere-pro',
    name: 'Premiere Pro',
    service: { en: 'Video Editing & Reels', ur: 'ویڈیو ایڈیٹنگ اور ریلز' },
    method: {
      en: 'Tight hooks, balanced sound, captions & fast social cuts',
      ur: 'جاندار شروعات، صاف آواز، سب ٹائٹلز اور تیز ایڈیٹنگ',
    },
    accent: '#9999FF',
    badgeBg: 'bg-[#9999FF]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#00005B" stroke="#9999FF" strokeWidth="1.5" />
        <text x="18" y="23" textAnchor="middle" fill="#9999FF" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">
          Pr
        </text>
      </svg>
    ),
  },
  {
    id: 'after-effects',
    name: 'After Effects',
    service: { en: 'Motion Graphics & Intros', ur: 'موشن گرافکس اور اینیمیشن' },
    method: {
      en: 'Animated logos, kinetic captions & smooth explainer visuals',
      ur: 'اینیمیٹڈ لوگو، متحرک تحریر اور ایکسپلینر ویڈیوز',
    },
    accent: '#C49BFF',
    badgeBg: 'bg-[#C49BFF]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#00005B" stroke="#C49BFF" strokeWidth="1.5" />
        <text x="18" y="23" textAnchor="middle" fill="#C49BFF" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">
          Ae
        </text>
      </svg>
    ),
  },
  {
    id: 'flutter',
    name: 'Flutter',
    service: { en: 'Android & iOS Apps', ur: 'اینڈرائیڈ اور آئی او ایس ایپس' },
    method: {
      en: 'Single smooth codebase shipped for both Android & iPhone',
      ur: 'ایک ہی تیز کوڈ سے اینڈرائیڈ اور آئی فون دونوں ایپس',
    },
    accent: '#54C5F8',
    badgeBg: 'bg-[#54C5F8]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#0B192C" />
        <path d="M19.5 8L10 17.5L13.5 21L26.5 8H19.5Z" fill="#54C5F8" />
        <path d="M19.5 18L14.5 23L19.5 28H26.5L21.5 23L26.5 18H19.5Z" fill="#01579B" />
      </svg>
    ),
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    service: { en: 'Editable Social Kits', ur: 'ایڈٹ ہونے والے سوشل کٹس' },
    method: {
      en: 'Ready-to-reuse brand post packs your own team can edit fast',
      ur: 'ایسی سوشل میڈیا پوسٹس جنہیں آپ کی ٹیم خود آسانی سے ایڈٹ کرے',
    },
    accent: '#00C4CC',
    badgeBg: 'bg-[#00C4CC]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#00C4CC" />
        <text x="18" y="23" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800" fontFamily="Inter, sans-serif">
          Cn
        </text>
      </svg>
    ),
  },
];

const ROW_TWO_TOOLS: ToolMethodItem[] = [
  {
    id: 'react-ts',
    name: 'React & TypeScript',
    service: { en: 'Custom Web Apps', ur: 'کسٹم ویب ایپس' },
    method: {
      en: 'Ultra-fast responsive websites, portals & interactive dashboards',
      ur: 'تیز رفتار ویب سائٹس، پورٹلز اور انٹرایکٹو ڈیش بورڈز',
    },
    accent: '#38BDF8',
    badgeBg: 'bg-[#38BDF8]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#0F172A" />
        <ellipse cx="18" cy="18" rx="10" ry="4" stroke="#38BDF8" strokeWidth="1.6" />
        <ellipse cx="18" cy="18" rx="10" ry="4" transform="rotate(60 18 18)" stroke="#38BDF8" strokeWidth="1.6" />
        <ellipse cx="18" cy="18" rx="10" ry="4" transform="rotate(120 18 18)" stroke="#38BDF8" strokeWidth="1.6" />
        <circle cx="18" cy="18" r="2" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    id: 'shopify',
    name: 'Shopify',
    service: { en: 'Online Stores', ur: 'آن لائن اسٹورز' },
    method: {
      en: 'Clean product storefronts, checkout setup & WhatsApp orders',
      ur: 'مکمل شاپائف اسٹور، تیز چیک آؤٹ اور واٹس ایپ آرڈرز',
    },
    accent: '#95BF47',
    badgeBg: 'bg-[#95BF47]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#12210E" />
        <path d="M11 13H25L26.5 27H9.5L11 13Z" stroke="#95BF47" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14.5 13V11C14.5 9.1 16 7.8 18 7.8C20 7.8 21.5 9.1 21.5 11V13" stroke="#95BF47" strokeWidth="2" />
        <circle cx="18" cy="20" r="2.2" fill="#95BF47" />
      </svg>
    ),
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    service: { en: 'Business Websites', ur: 'بزنس ویب سائٹس' },
    method: {
      en: 'Easy-to-update company sites, blogs & WooCommerce shops',
      ur: 'آسانی سے اپڈیٹ ہونے والی بزنس سائٹس اور ووکامرس اسٹورز',
    },
    accent: '#21759B',
    badgeBg: 'bg-[#21759B]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#0B2230" />
        <circle cx="18" cy="18" r="10" stroke="#38BDF8" strokeWidth="1.8" />
        <path d="M12.5 14L15.4 22.5L18 15.2L20.6 22.5L23.5 14" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'gemini-ai',
    name: 'Gemini AI & RAG',
    service: { en: 'AI Agents & Automation', ur: 'AI بوٹس اور آٹومیشن' },
    method: {
      en: 'Private company Q&A bots grounded only on your approved docs',
      ur: 'آپ کی اپنی فائلوں پر مبنی محفوظ بزنس چیٹ بوٹس',
    },
    accent: '#EA0400',
    badgeBg: 'bg-[#EA0400]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#18080A" />
        <path d="M18 8C18.7 13.8 22.2 17.3 28 18C22.2 18.7 18.7 22.2 18 28C17.3 22.2 13.8 18.7 8 18C13.8 17.3 17.3 13.8 18 8Z" fill="#EA0400" />
      </svg>
    ),
  },
  {
    id: 'nodejs',
    name: 'Node.js & APIs',
    service: { en: 'Backend & Admin Systems', ur: 'بیک اینڈ اور ڈیش بورڈز' },
    method: {
      en: 'Secure server routes, lead CRM portals & encrypted auth',
      ur: 'محفوظ سرور APIs، ایڈمن پورٹلز اور ڈیٹا پروٹیکشن',
    },
    accent: '#68A063',
    badgeBg: 'bg-[#68A063]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#101D12" />
        <polygon points="18,8 27,13 27,23 18,28 9,23 9,13" stroke="#68A063" strokeWidth="2" fill="none" />
        <circle cx="18" cy="18" r="2.8" fill="#68A063" />
      </svg>
    ),
  },
  {
    id: 'google-seo',
    name: 'Google Ads & SEO',
    service: { en: 'Search & Traffic Growth', ur: 'گوگل سرچ اور SEO' },
    method: {
      en: 'Keyword mapping, clean sitemaps & high-intent search ads',
      ur: 'درست کی ورڈز، گوگل رینکنگ اور ہدف شدہ اشتہارات',
    },
    accent: '#FBBC05',
    badgeBg: 'bg-[#FBBC05]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#171717" />
        <circle cx="17" cy="17" r="6.5" stroke="#FBBC05" strokeWidth="2.3" />
        <path d="M22 22L27 27" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads Suite',
    service: { en: 'Social Media Marketing', ur: 'سوشل میڈیا مارکیٹنگ' },
    method: {
      en: 'Targeted Instagram & Facebook campaigns built for real leads',
      ur: 'انسٹاگرام اور فیس بک اشتہارات جو حقیقی گاہک لائیں',
    },
    accent: '#0866FF',
    badgeBg: 'bg-[#0866FF]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#0B1933" />
        <path
          d="M12.5 22.5C10 22.5 8.5 20.6 8.5 18C8.5 15.2 10.2 13 12.5 13C15 13 16.6 15.8 18 18C19.4 20.2 21 23 23.5 23C25.8 23 27.5 20.8 27.5 18C27.5 15.4 26 13.5 23.5 13.5C21.4 13.5 19.8 15.1 18.8 16.6"
          stroke="#3B82F6"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'firebase-cloud',
    name: 'Firebase & Cloud',
    service: { en: 'Fast Hosting & Data', ur: 'تیز ہوسٹنگ اور کلاؤڈ' },
    method: {
      en: 'Always-on hosting, real-time sync & automated daily backups',
      ur: 'تیز کلاؤڈ ہوسٹنگ، محفوظ ڈیٹا اور روزانہ بیک اپ',
    },
    accent: '#FFA000',
    badgeBg: 'bg-[#FFA000]/12',
    logo: (
      <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#1F160A" />
        <path d="M12 24L15 11L19.5 17.5L23 13.5L25 24L18.5 27.5L12 24Z" stroke="#FFA000" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function ToolCard({ item, language }: { item: ToolMethodItem; language: 'en' | 'ur' }) {
  return (
    <div
      data-motion-managed="true"
      className="da-marquee-card group w-[300px] sm:w-[325px] shrink-0 rounded-2xl border border-slate-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#111113]/95 p-4 shadow-xs hover:border-[#EA0400]/70 transition-all duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`shrink-0 rounded-xl p-1.5 ${item.badgeBg} ring-1 ring-inset ring-black/5 dark:ring-white/10 transition-transform duration-300 group-hover:scale-105`}
        >
          {item.logo}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-950 dark:text-white truncate">
              {item.name}
            </h3>
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: item.accent }}
              aria-hidden="true"
            />
          </div>
          <p className="text-[11px] font-medium text-[#EA0400] truncate">
            {item.service[language]}
          </p>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-neutral-400 line-clamp-2">
            {item.method[language]}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ServiceToolsMarquee() {
  const { language } = useApp();

  const heading =
    language === 'ur'
      ? 'ہر سروس کے لیے اصل پروفیشنل ٹولز اور ہمارا طریقہ کار۔'
      : 'Real industry tools & how we apply them for every service.';
  const kicker =
    language === 'ur' ? 'ہمارے ٹولز اور کام کا طریقہ' : 'Tools & Craft Behind Every Service';
  const subtitle =
    language === 'ur'
      ? 'اینڈرائیڈ اسٹوڈیو سے موبائل ایپس، فوٹوشاپ اور السٹریٹر سے ڈیزائن، اور ری ایکٹ و Gemini AI سے تیز ویب سسٹمز۔'
      : 'From Android Studio for mobile apps and Photoshop & Illustrator for graphic design, to Premiere Pro, Shopify, React, and Gemini AI—see the exact toolkit powering your project.';

  return (
    <section
      data-testid="tools-marquee-section"
      className="py-14 sm:py-20 bg-white/82 dark:bg-[#060608]/82 border-b border-slate-200 dark:border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <MotionReveal className="max-w-3xl space-y-2.5">
          <p className="text-xs font-medium text-[#EA0400]">{kicker}</p>
          <h2 className="da-h2 text-slate-900 dark:text-white">{heading}</h2>
          <p className="da-body text-slate-600 dark:text-neutral-400">{subtitle}</p>
        </MotionReveal>
      </div>

      {/* Dual Opposing Conveyor Rows — Row 1 flows left, Row 2 enters from the opposite side */}
      <div className="space-y-4 select-none" dir="ltr">
        {/* Row 1: Right -> Left */}
        <div className="da-marquee-viewport relative overflow-hidden">
          <div className="da-marquee-track da-marquee-left flex w-max gap-4 py-1">
            {[...ROW_ONE_TOOLS, ...ROW_ONE_TOOLS].map((item, idx) => (
              <ToolCard key={`r1-${item.id}-${idx}`} item={item} language={language} />
            ))}
          </div>
        </div>

        {/* Row 2: Left -> Right (Opposite Direction) */}
        <div className="da-marquee-viewport relative overflow-hidden">
          <div className="da-marquee-track da-marquee-right flex w-max gap-4 py-1">
            {[...ROW_TWO_TOOLS, ...ROW_TWO_TOOLS].map((item, idx) => (
              <ToolCard key={`r2-${item.id}-${idx}`} item={item} language={language} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
