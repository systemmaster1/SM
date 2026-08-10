import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const securityHeaders = [
  {key: 'X-Content-Type-Options', value: 'nosniff'},
  {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
  {key: 'X-Frame-Options', value: 'SAMEORIGIN'},
  {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'}
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp']
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      },
      {
        source: '/demos/:path*',
        headers: [
          ...securityHeaders,
          {key: 'Cache-Control', value: 'public, max-age=0, must-revalidate'}
        ]
      }
    ];
  },

  async redirects() {
    return [
      {source: '/index.html', destination: '/en', permanent: true},
      {source: '/about.html', destination: '/en/about', permanent: true},
      {source: '/services.html', destination: '/en/services', permanent: true},
      {source: '/projects.html', destination: '/en/portfolio', permanent: true},
      {source: '/contact.html', destination: '/en/contact', permanent: true},
      {source: '/login.html', destination: '/en/login', permanent: true},
      {source: '/privacy.html', destination: '/en/privacy', permanent: true},
      {source: '/terms.html', destination: '/en/terms', permanent: true},
      {source: '/demo-:slug.html', destination: '/demos/demo-:slug.html', permanent: true}
    ];
  }
};

export default withNextIntl(nextConfig);
