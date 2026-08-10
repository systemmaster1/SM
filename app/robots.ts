import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/legacy_backup/',
          '/_next/',
          '/api/'
        ]
      }
    ],
    sitemap: 'https://systemmaster.in/sitemap.xml',
    host: 'https://systemmaster.in'
  };
}
