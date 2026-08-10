import './globals.css';
import type {Metadata, Viewport} from 'next';
import {Inter, Plus_Jakarta_Sans} from 'next/font/google';
import {ThemeProvider} from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://systemmaster.in'),
  title: {
    default: 'SystemMaster Automations — ERP, HRMS, CRM, AI & Custom Software',
    template: '%s | SystemMaster'
  },
  description:
    'Ready-to-use business software plus custom ERP, CRM, HRMS, mobile apps, websites, AI agents and workflow automation for growing businesses.',
  applicationName: 'SystemMaster Automations',
  authors: [{name: 'SystemMaster Automations', url: 'https://systemmaster.in'}],
  creator: 'SystemMaster Automations',
  publisher: 'SystemMaster Automations',
  category: 'Business Software',
  keywords: [
    'ERP software India',
    'CRM software India',
    'HRMS software India',
    'accounting software India',
    'business automation',
    'custom software development India',
    'mobile app development',
    'AI automation',
    'WhatsApp automation',
    'manufacturing ERP'
  ],
  openGraph: {
    title: 'SystemMaster Automations',
    description:
      'Ready-to-use business software and custom ERP, CRM, apps and AI automation for growing companies.',
    url: 'https://systemmaster.in',
    siteName: 'SystemMaster Automations',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SystemMaster Automations'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SystemMaster Automations',
    description:
      'ERP, CRM, HRMS, accounting, custom software and business automation.',
    images: ['/opengraph-image']
  },
  icons: {
    icon: '/logo/systemmaster.png',
    apple: '/logo/systemmaster.png'
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: '#f7f9fc'},
    {media: '(prefers-color-scheme: dark)', color: '#071326'}
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
