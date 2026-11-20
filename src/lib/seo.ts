export const DEFAULT_SEO_TITLE = 'Digital Aghaz — Full-Service Digital Agency';
export const DEFAULT_SEO_DESCRIPTION =
  'Turn ideas into revenue-ready websites, standout brands, viral videos & AI automation. Launch faster with Digital Aghaz—start your project brief today.';
export const DEFAULT_OG_IMAGE = '/assets/aistudio/Digitak_Aghaz-01_c98303a5.png';
export const DEFAULT_OG_IMAGE_ALT =
  'Digital Aghaz — Web Development, Branding, Video Production & AI Automation Agency';

export interface RouteSeoMeta {
  title: string;
  description: string;
  ogImage: string;
  ogImageAlt: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

/**
 * Dedicated Open Graph & Twitter social preview metadata for every primary
 * service page and key landing route so shared links render rich service cards.
 */
export const SERVICE_OG_METADATA: Record<string, RouteSeoMeta> = {
  'graphic-design': {
    title: 'Graphic Design & Branding — Digital Aghaz',
    description:
      'Custom logos, brand colors, packaging, pitch decks, and clickable thumbnails designed to make your business look sharp and trustworthy.',
    ogImage: '/assets/og/graphic-design.jpg',
    ogImageAlt: 'Digital Aghaz Graphic Design & Branding Showcase Preview',
    ogType: 'website',
  },
  'web-development': {
    title: 'Website & E-Commerce Development — Digital Aghaz',
    description:
      'Fast, mobile-friendly business websites, landing pages, Shopify stores, and custom web apps engineered to convert visitors into customers.',
    ogImage: '/assets/og/web-development.jpg',
    ogImageAlt: 'Digital Aghaz Website & E-Commerce Development Showcase Preview',
    ogType: 'website',
  },
  'mobile-apps': {
    title: 'Mobile Apps & UI/UX Design — Digital Aghaz',
    description:
      'User-friendly Android and iOS apps with clickable mobile prototypes tested on real phones before development starts.',
    ogImage: '/assets/og/mobile-apps.jpg',
    ogImageAlt: 'Digital Aghaz Mobile Apps & UI/UX Design Showcase Preview',
    ogType: 'website',
  },
  'video-production': {
    title: 'Video Editing & Production — Digital Aghaz',
    description:
      'Scroll-stopping Reels, YouTube edits, animated explainers, and clear English & Urdu captions built to keep viewers watching.',
    ogImage: '/assets/og/video-production.jpg',
    ogImageAlt: 'Digital Aghaz Video Editing & Production Showcase Preview',
    ogType: 'website',
  },
  'seo-marketing': {
    title: 'SEO & Digital Marketing — Digital Aghaz',
    description:
      'Technical and local SEO, focused Google & Meta Ads, and honest conversion tracking to help real buyers find your business.',
    ogImage: '/assets/og/seo-marketing.jpg',
    ogImageAlt: 'Digital Aghaz SEO & Digital Marketing Growth Preview',
    ogType: 'website',
  },
  'social-media': {
    title: 'Social Media & Content Production — Digital Aghaz',
    description:
      'Monthly content calendars, bilingual English & Urdu copywriting, and tailored visuals for Instagram, TikTok, YouTube, and Facebook.',
    ogImage: '/assets/og/social-media.jpg',
    ogImageAlt: 'Digital Aghaz Social Media & Content Production Showcase Preview',
    ogType: 'website',
  },
  'ai-automation': {
    title: 'AI, Software & Automation — Digital Aghaz',
    description:
      'Private company Q&A bots, customer support assistants, and practical workflow automations grounded in your own approved files.',
    ogImage: '/assets/og/ai-automation.jpg',
    ogImageAlt: 'Digital Aghaz AI, Software & Automation Showcase Preview',
    ogType: 'website',
  },
  'digital-products': {
    title: 'Digital Products & Tools — Digital Aghaz',
    description:
      'Ready-to-edit social templates, reel packs, bilingual business guides, and official software setups built to save your team hours.',
    ogImage: '/assets/og/digital-products.jpg',
    ogImageAlt: 'Digital Aghaz Digital Products & Ready Kits Showcase Preview',
    ogType: 'website',
  },
};

export function resolveRouteSeoMeta(pathname: string): RouteSeoMeta {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';

  if (normalized === '/services') {
    return {
      title: 'Services Overview — Digital Aghaz',
      description:
        'Explore branding, websites, mobile UI/UX, video production, SEO & AI automation built by Digital Aghaz. Compare deliverables and start your project today.',
      ogImage: '/assets/og/web-development.jpg',
      ogImageAlt: 'Digital Aghaz — All 8 Digital Agency Services Overview',
      ogType: 'website',
    };
  }

  if (normalized.startsWith('/services/')) {
    const slug = normalized.slice('/services/'.length);
    if (SERVICE_OG_METADATA[slug]) {
      return SERVICE_OG_METADATA[slug];
    }
  }

  if (normalized.startsWith('/admin')) {
    return {
      title: 'Admin Portal — Digital Aghaz',
      description: 'Private authenticated portal for Digital Aghaz administration.',
      ogImage: DEFAULT_OG_IMAGE,
      ogImageAlt: DEFAULT_OG_IMAGE_ALT,
      noindex: true,
    };
  }

  return {
    title: DEFAULT_SEO_TITLE,
    description: DEFAULT_SEO_DESCRIPTION,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: DEFAULT_OG_IMAGE_ALT,
    ogType: 'website',
  };
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Injects route-specific Open Graph and Twitter social card metadata directly
 * into HTML responses so link-sharing crawlers (WhatsApp, X, LinkedIn, Slack)
 * display the exact primary service preview image without executing JS.
 */
export function injectSeoMetaIntoHtml(html: string, pathname: string, origin: string): string {
  const meta = resolveRouteSeoMeta(pathname);
  const title = escapeHtmlAttr(meta.title);
  const description = escapeHtmlAttr(formatSeoDescription(meta.description));
  const canonicalUrl = escapeHtmlAttr(buildCanonicalUrl(origin, pathname));
  const resolvedImg = meta.ogImage.startsWith('http')
    ? meta.ogImage
    : `${origin.replace(/\/+$/, '')}${meta.ogImage.startsWith('/') ? meta.ogImage : `/${meta.ogImage}`}`;
  const ogImage = escapeHtmlAttr(resolvedImg);
  const ogImageAlt = escapeHtmlAttr(meta.ogImageAlt);
  const robots = meta.noindex ? 'noindex, nofollow' : 'index, follow';

  return html
    .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[^>]*>/i,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<meta\s+name="robots"[^>]*>/i,
      `<meta name="robots" content="${robots}" />`
    )
    .replace(
      /<meta\s+property="og:title"[^>]*>/i,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta\s+property="og:description"[^>]*>/i,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta\s+property="og:image"[^>]*>/i,
      `<meta property="og:image" content="${ogImage}" />`
    )
    .replace(
      /<meta\s+property="og:image:alt"[^>]*>/i,
      `<meta property="og:image:alt" content="${ogImageAlt}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"[^>]*>/i,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"[^>]*>/i,
      `<meta name="twitter:description" content="${description}" />`
    )
    .replace(
      /<meta\s+name="twitter:image"[^>]*>/i,
      `<meta name="twitter:image" content="${ogImage}" />`
    )
    .replace(
      /<meta\s+name="twitter:image:alt"[^>]*>/i,
      `<meta name="twitter:image:alt" content="${ogImageAlt}" />`
    )
    .replace(
      /<meta\s+property="og:url"[^>]*>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
}

export interface PageMetaInput {
  title: string;
  description?: string;
  noindex?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'article';
}

export function formatSeoDescription(raw: string, maxLength = 160): string {
  const cleaned = String(raw || '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return DEFAULT_SEO_DESCRIPTION;
  if (cleaned.length <= maxLength) return cleaned;
  const sliced = cleaned.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  const base = lastSpace > Math.floor(maxLength * 0.6) ? sliced.slice(0, lastSpace) : sliced;
  return `${base.replace(/[.,;:!?-]+$/, '')}…`;
}

export function buildCanonicalUrl(origin: string, pathname: string): string {
  const cleanOrigin = origin.replace(/\/+$/, '');
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const normalizedPath = cleanPath.length > 1 ? cleanPath.replace(/\/+$/, '') : '/';
  return `${cleanOrigin}${normalizedPath}`;
}

function upsertMetaTag(
  selectorAttr: 'name' | 'property',
  attrValue: string,
  content: string
): void {
  if (typeof document === 'undefined') return;
  let tag = document.head.querySelector(`meta[${selectorAttr}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(selectorAttr, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonicalLink(href: string): void {
  if (typeof document === 'undefined') return;
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function applyPageMeta(input: PageMetaInput): void {
  if (typeof document === 'undefined') return;

  const title = input.title.trim() || DEFAULT_SEO_TITLE;
  const description = formatSeoDescription(input.description || DEFAULT_SEO_DESCRIPTION);
  const canonicalUrl = buildCanonicalUrl(window.location.origin, window.location.pathname);
  const imagePath = input.ogImage || DEFAULT_OG_IMAGE;
  const imageAlt = input.ogImageAlt || `${title} — Digital Aghaz`;
  const resolvedImage = imagePath.startsWith('http')
    ? imagePath
    : `${window.location.origin}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;

  document.title = title;
  upsertMetaTag('name', 'description', description);
  upsertMetaTag('name', 'robots', input.noindex ? 'noindex, nofollow' : 'index, follow');

  upsertMetaTag('property', 'og:type', input.ogType || 'website');
  upsertMetaTag('property', 'og:title', title);
  upsertMetaTag('property', 'og:description', description);
  upsertMetaTag('property', 'og:url', canonicalUrl);
  upsertMetaTag('property', 'og:image', resolvedImage);
  upsertMetaTag('property', 'og:image:alt', imageAlt);
  upsertMetaTag('property', 'og:image:width', '1200');
  upsertMetaTag('property', 'og:image:height', '630');

  upsertMetaTag('name', 'twitter:card', 'summary_large_image');
  upsertMetaTag('name', 'twitter:title', title);
  upsertMetaTag('name', 'twitter:description', description);
  upsertMetaTag('name', 'twitter:image', resolvedImage);
  upsertMetaTag('name', 'twitter:image:alt', imageAlt);

  upsertCanonicalLink(canonicalUrl);
}
