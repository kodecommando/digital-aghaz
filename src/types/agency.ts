export type Language = 'en' | 'ur';
export type ThemeMode = 'dark' | 'light';

export type ServiceSlug =
  | 'graphic-design'
  | 'web-development'
  | 'mobile-apps'
  | 'video-production'
  | 'seo-marketing'
  | 'social-media'
  | 'ai-automation'
  | 'digital-products';

export type Service3DTheme =
  | 'branding'
  | 'web'
  | 'mobile'
  | 'video'
  | 'seo'
  | 'social'
  | 'ai'
  | 'products';

export interface ServiceDefinition {
  slug: ServiceSlug;
  number: string;
  theme3d: Service3DTheme;
  image: string;
  title: { en: string; ur: string };
  shortDesc: { en: string; ur: string };
  heroHeadline: { en: string; ur: string };
  heroSubheadline: { en: string; ur: string };
  problemSolved: { en: string; ur: string };
  ctaLabel: { en: string; ur: string };
  includes: { en: string[]; ur: string[] };
  deliverables: { en: string[]; ur: string[] };
  readinessGate: { en: string; ur: string };
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: 'Branding' | 'Web Design' | 'Applications' | 'Video' | 'Marketing' | 'AI Solutions';
  isConceptDemo: boolean;
  summary: string;
  objective: string;
  challenge: string;
  strategy: string;
  execution: string;
  deliverables: string[];
  services: string[];
  coverImage: string;
  featured: boolean;
  published: boolean;
  publishedAt: string;
}

export interface InsightItem {
  id: string;
  slug: string;
  title: string;
  category:
    | 'AI'
    | 'Technology'
    | 'Digital Marketing'
    | 'Web Development'
    | 'Branding'
    | 'Business Growth'
    | 'Tutorials';
  author: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  readMinutes: number;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
}

export interface SecurityCheckItem {
  id: string;
  number: string;
  title: string;
  source: string;
  status: 'PASS' | 'WARN';
  summary: string;
  controls: string[];
}
