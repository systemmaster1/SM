import type {Metadata} from 'next';
import {CompanyPage} from '@/components/pages/company-page';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const hi = locale === 'hi';

  const title = hi
    ? 'Founder & Growth Journey | SystemMaster Automations'
    : 'Founder & Growth Journey | SystemMaster Automations';

  const description = hi
    ? 'Sunil Tiwari और SystemMaster की 2016 से 2026 तक की यात्रा — Excel, BI, business systems, ERP, CRM, workflow automation और AI-powered solutions तक।'
    : 'Explore Sunil Tiwari and SystemMaster Automations’ journey from Excel, reporting and BI in 2016 to ERP, CRM, connected automation and AI-powered business systems in 2026.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://systemmaster.in/${locale}/about`,
      languages: {
        en: 'https://systemmaster.in/en/about',
        hi: 'https://systemmaster.in/hi/about'
      }
    },
    openGraph: {
      title,
      description,
      url: `https://systemmaster.in/${locale}/about`,
      siteName: 'SystemMaster Automations',
      type: 'website',
      images: [
        {
          url: '/images/founder/sunil-tiwari-founder.png',
          width: 692,
          height: 1056,
          alt: 'Sunil Tiwari, Founder of SystemMaster Automations'
        }
      ]
    }
  };
}

export default function AboutPage() {
  return <CompanyPage />;
}
