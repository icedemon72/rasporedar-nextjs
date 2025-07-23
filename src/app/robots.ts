import { type MetadataRoute } from 'next';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseDisallow = [
    '/apple-app-site-association',
    '/.well-known/',
    '/?oseid=',
    '/preview_theme_id',
    '/preview_script_id',
    '/?utm_',
    '/?fbclid=',
    '/?gclid=',
    '/?variant=',
    '/?sort_by=',
    '/?filter=',
    '/?ls=',
    '/?ls%3D',
    '/?ls%3d',
    '/+',
    '/%2B',
    '/%2b',
  ];

  return {
    rules: [
      {
        userAgent: '',
        disallow: baseDisallow,
      },
      { userAgent: 'Nutch', disallow: '/' },
      { userAgent: 'AhrefsBot', crawlDelay: 10 },
      { userAgent: 'AhrefsSiteAudit', crawlDelay: 10 },
      { userAgent: 'MJ12bot', crawlDelay: 10 },
      { userAgent: 'Pinterest', crawlDelay: 1 },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/sitemap.xml`,
  }
}