import './globals.css';
import type {Metadata} from 'next';
import {ThemeProvider} from '@/components/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://systemmaster.in'),
  title: {
    default: 'SystemMaster Automations — ERP, HRMS, AI & Custom Software',
    template: '%s | SystemMaster'
  },
  description:
    'Ready-to-use ERP, HRMS and accounting software plus custom enterprise applications, mobile apps and AI automation.',
  openGraph: {
    title: 'SystemMaster Automations',
    description: 'Business software and AI automation for growing companies.',
    url: 'https://systemmaster.in',
    siteName: 'SystemMaster Automations',
    type: 'website'
  }
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
