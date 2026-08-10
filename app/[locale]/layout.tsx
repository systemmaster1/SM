import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {FloatingAssist} from '@/components/floating-assist';
import {OrganizationSchema} from '@/components/seo/organization-schema';
import {LocaleDocumentLanguage} from '@/components/locale-document-language';

const locales = ['en', 'hi'] as const;
type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  if (!locales.includes(locale as Locale)) return {};

  const isHi = locale === 'hi';
  const canonical = `https://systemmaster.in/${locale}`;

  const title = isHi
    ? 'SystemMaster Automations — ERP, HRMS, CRM, AI और Custom Software'
    : 'SystemMaster Automations — ERP, HRMS, CRM, AI & Custom Software';

  const description = isHi
    ? 'भारत में बढ़ते व्यवसायों के लिए ready-to-use accounting, HRMS, ERP, CRM और custom software, mobile apps, websites तथा AI workflow automation.'
    : 'Ready-to-use accounting, HRMS, ERP and CRM plus custom software, mobile apps, websites and AI workflow automation for growing businesses in India.';

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'en-IN': 'https://systemmaster.in/en',
        'hi-IN': 'https://systemmaster.in/hi',
        'x-default': 'https://systemmaster.in/en'
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'SystemMaster Automations',
      locale: isHi ? 'hi_IN' : 'en_IN',
      alternateLocale: isHi ? ['en_IN'] : ['hi_IN'],
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
      title,
      description,
      images: ['/opengraph-image']
    }
  };
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
      <LocaleDocumentLanguage locale={locale} />
      <OrganizationSchema locale={locale} />

      <a
        href="#main-content"
        className="sm-skip-link"
      >
        {locale === 'hi' ? 'मुख्य सामग्री पर जाएँ' : 'Skip to content'}
      </a>

      <Header />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer locale={locale} />
      <FloatingAssist />
    </NextIntlClientProvider>
  );
}
