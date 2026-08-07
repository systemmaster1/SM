import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {IndustryDetailPage} from '@/components/pages/industry-detail-page';
import {BreadcrumbSchema} from '@/components/seo/breadcrumb-schema';
import {ServiceSchema} from '@/components/seo/entity-schema';
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

  const l: Locale = locale === 'hi' ? 'hi' : 'en';
  const title = `${industry.name[l]} | SystemMaster Automations`;
  const description = industry.description[l];
  const canonical = `https://systemmaster.in/${l}/industries/${industry.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `https://systemmaster.in/en/industries/${industry.slug}`,
        hi: `https://systemmaster.in/hi/industries/${industry.slug}`
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'SystemMaster Automations',
      type: 'website',
      images: ['/opengraph-image']
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image']
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

  const l: Locale = locale === 'hi' ? 'hi' : 'en';
  const pageUrl = `https://systemmaster.in/${l}/industries/${industry.slug}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          {name: 'SystemMaster', url: `https://systemmaster.in/${l}`},
          {name: l === 'hi' ? 'इंडस्ट्री' : 'Industries', url: `https://systemmaster.in/${l}/industries`},
          {name: industry.name[l], url: pageUrl}
        ]}
      />
      <ServiceSchema
        name={`${industry.name[l]} ${l === 'hi' ? 'बिजनेस सॉफ्टवेयर समाधान' : 'Business Software Solutions'}`}
        description={industry.description[l]}
        url={pageUrl}
      />
      <IndustryDetailPage industry={industry} locale={l} />
    </>
  );
}
