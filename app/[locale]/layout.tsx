import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {FloatingAssist} from '@/components/floating-assist';
import {OrganizationSchema} from '@/components/seo/organization-schema';

const locales = ['en', 'hi'] as const;
type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <OrganizationSchema locale={locale} />

      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100000] rounded-lg bg-[var(--text)] px-4 py-2 text-[var(--bg)] focus:not-sr-only"
      >
        Skip to content
      </a>

      <Header />

      <div id="main-content">{children}</div>

      <Footer locale={locale} />

      {/*
        Global assistance controls:
        1. Original Shyama AI Agent from the live website
        2. Direct WhatsApp floating button
      */}
      <FloatingAssist />
    </NextIntlClientProvider>
  );
}
