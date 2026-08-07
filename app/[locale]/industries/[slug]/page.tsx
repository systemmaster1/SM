import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {IndustryDetailPage} from '@/components/pages/industry-detail-page';
import {industryDetails, industrySlugs} from '@/data/industries';
import type {Locale} from '@/data/catalog';

export function generateStaticParams() {
  return industrySlugs.flatMap((slug) =>
    ['en', 'hi'].map((locale) => ({locale, slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const industry = industryDetails.find((item) => item.slug === slug);

  if (!industry) return {};

  const currentLocale: Locale = locale === 'hi' ? 'hi' : 'en';
  const title = `${industry.name[currentLocale]} | SystemMaster Automations`;
  const description = industry.description[currentLocale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://systemmaster.in/${currentLocale}/industries/${industry.slug}`,
      languages: {
        en: `https://systemmaster.in/en/industries/${industry.slug}`,
        hi: `https://systemmaster.in/hi/industries/${industry.slug}`
      }
    },
    openGraph: {
      title,
      description,
      url: `https://systemmaster.in/${currentLocale}/industries/${industry.slug}`,
      type: 'website'
    }
  };
}

export default async function Page({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  const industry = industryDetails.find((item) => item.slug === slug);

  if (!industry) notFound();

  return (
    <IndustryDetailPage
      industry={industry}
      locale={locale === 'hi' ? 'hi' : 'en'}
    />
  );
}
