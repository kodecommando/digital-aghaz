export type EngineNodeKey = 'web' | 'mobile' | 'ai' | 'branding' | 'seo' | 'video';

export interface EngineNodeMeta {
  key: EngineNodeKey;
  label: string;
  angle: number;
}

export const ENGINE_NODES: EngineNodeMeta[] = [
  { key: 'web', label: 'Web', angle: 0 },
  { key: 'mobile', label: 'Mobile', angle: Math.PI / 3 },
  { key: 'ai', label: 'AI Core', angle: (2 * Math.PI) / 3 },
  { key: 'branding', label: 'Brand', angle: Math.PI },
  { key: 'seo', label: 'Growth', angle: (4 * Math.PI) / 3 },
  { key: 'video', label: 'Video', angle: (5 * Math.PI) / 3 },
];

export function resolveEngineNodeForRoute(
  pathname: string,
  fallbackNode: EngineNodeKey = 'ai'
): EngineNodeKey {
  if (pathname === '/' || pathname === '') return fallbackNode;
  if (pathname.includes('/services/web-development')) return 'web';
  if (pathname.includes('/services/mobile-apps')) return 'mobile';
  if (pathname.includes('/services/ai-automation') || pathname.includes('/insights')) return 'ai';
  if (pathname.includes('/services/graphic-design') || pathname.includes('/work')) return 'branding';
  if (pathname.includes('/services/video-production')) {
    return 'video';
  }
  if (
    pathname.includes('/services/seo-marketing') ||
    pathname.includes('/services/social-media') ||
    pathname.includes('/contact')
  ) {
    return 'seo';
  }
  if (pathname.includes('/services/digital-products')) return 'branding';
  if (pathname.includes('/about') || pathname.includes('/services')) return 'web';
  return fallbackNode;
}
