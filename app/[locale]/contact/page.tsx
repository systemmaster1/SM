import type {Metadata} from 'next';
import {ContactConversionPage} from '@/components/pages/contact-conversion-page';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const hi = locale === 'hi';

  const title = hi
    ? 'SystemMaster से संपर्क करें | Product Demo और Custom Software'
    : 'Contact SystemMaster | Product Demo & Custom Software Consultation';

  const description = hi
    ? 'SM-Books, SM-HRMS, SM-ERP, CRM, custom software, mobile apps, website development, AI automation और WhatsApp automation के लिए SystemMaster से संपर्क करें।'
    : 'Contact SystemMaster for SM-Books, SM-HRMS, SM-ERP, CRM, custom software, mobile apps, website development, AI automation and WhatsApp automation.';

  const canonical = `https://systemmaster.in/${hi ? 'hi' : 'en'}/contact`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: 'https://systemmaster.in/en/contact',
        hi: 'https://systemmaster.in/hi/contact'
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'SystemMaster Automations',
      type: 'website'
    }
  };
}

export default function Page() {
  return <ContactConversionPage />;
}
