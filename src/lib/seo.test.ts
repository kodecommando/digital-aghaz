import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_SEO_DESCRIPTION,
  DEFAULT_SEO_TITLE,
  SERVICE_OG_METADATA,
  buildCanonicalUrl,
  formatSeoDescription,
  injectSeoMetaIntoHtml,
  resolveRouteSeoMeta,
} from './seo';

test('default SEO title and description satisfy optimal search snippet length bounds', () => {
  assert.ok(DEFAULT_SEO_TITLE.length >= 30 && DEFAULT_SEO_TITLE.length <= 60);
  assert.ok(DEFAULT_SEO_DESCRIPTION.length >= 120 && DEFAULT_SEO_DESCRIPTION.length <= 160);
});

test('formatSeoDescription normalizes whitespace and truncates cleanly within 160 chars', () => {
  const shortText = '  Launch   custom web & AI workflows fast.  ';
  assert.equal(formatSeoDescription(shortText), 'Launch custom web & AI workflows fast.');

  const longText =
    'Digital Aghaz builds custom web applications, mobile interfaces, brand identities, video production campaigns, and grounded RAG AI systems designed for scalable long-term business growth worldwide.';
  const formatted = formatSeoDescription(longText, 160);
  assert.ok(formatted.length <= 160);
  assert.ok(formatted.endsWith('…'));
});

test('buildCanonicalUrl strips trailing slashes consistently', () => {
  assert.equal(
    buildCanonicalUrl('https://digitalaghaz.example/', '/services/web-development/'),
    'https://digitalaghaz.example/services/web-development'
  );
  assert.equal(
    buildCanonicalUrl('https://digitalaghaz.example', '/'),
    'https://digitalaghaz.example/'
  );
});

test('every primary service page defines a unique Open Graph preview image and alt text', () => {
  const expectedSlugs = [
    'graphic-design',
    'web-development',
    'mobile-apps',
    'video-production',
    'seo-marketing',
    'social-media',
    'ai-automation',
    'digital-products',
  ];
  const seenImages = new Set<string>();
  for (const slug of expectedSlugs) {
    const meta = resolveRouteSeoMeta(`/services/${slug}`);
    assert.ok(SERVICE_OG_METADATA[slug], `missing OG metadata for ${slug}`);
    assert.ok(meta.ogImage.startsWith('/assets/og/'), `invalid image for ${slug}`);
    assert.ok(meta.ogImageAlt.length > 10, `missing alt text for ${slug}`);
    seenImages.add(meta.ogImage);
  }
  assert.equal(seenImages.size, expectedSlugs.length);
});

test('injectSeoMetaIntoHtml writes service-specific OG and Twitter preview image into HTML', () => {
  const template = `<!doctype html><html><head>
    <title>Default</title>
    <meta name="description" content="Default" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="Default" />
    <meta property="og:description" content="Default" />
    <meta property="og:url" content="/" />
    <meta property="og:image" content="/default.png" />
    <meta property="og:image:alt" content="Default" />
    <meta name="twitter:title" content="Default" />
    <meta name="twitter:description" content="Default" />
    <meta name="twitter:image" content="/default.png" />
    <meta name="twitter:image:alt" content="Default" />
  </head></html>`;

  const rendered = injectSeoMetaIntoHtml(
    template,
    '/services/mobile-apps',
    'https://digitalaghaz.example'
  );

  assert.ok(rendered.includes('Mobile Apps &amp; UI/UX Design — Digital Aghaz'));
  assert.ok(
    rendered.includes(
      'content="https://digitalaghaz.example/assets/og/mobile-apps.jpg"'
    )
  );
  assert.ok(
    rendered.includes('content="https://digitalaghaz.example/services/mobile-apps"')
  );
});
