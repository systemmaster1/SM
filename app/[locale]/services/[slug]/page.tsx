import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ServiceDetailPage} from '@/components/pages/service-detail-page';
import {BreadcrumbSchema} from '@/components/seo/breadcrumb-schema';
import {ServiceSchema} from '@/components/seo/entity-schema';
import {serviceDetails, serviceSlugs, type Locale} from '@/data/catalog';

export function generateStaticParams() {
  return serviceSlugs.flatMap((slug) =>
    ['en', 'hi'].map((locale) => ({locale, slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const service = serviceDetails.find((item) => item.slug === slug);

  if (!service) return {};

  const l: Locale = locale === 'hi' ? 'hi' : 'en';
  const title = `${service.name[l]} | SystemMaster Automations`;
  const description = service.description[l];
  const canonical = `https://systemmaster.in/${l}/services/${service.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `https://systemmaster.in/en/services/${service.slug}`,
        hi: `https://systemmaster.in/hi/services/${service.slug}`
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
  const service = serviceDetails.find((item) => item.slug === slug);

  if (!service) notFound();

  const l: Locale = locale === 'hi' ? 'hi' : 'en';
  const pageUrl = `https://systemmaster.in/${l}/services/${service.slug}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          {name: 'SystemMaster', url: `https://systemmaster.in/${l}`},
          {name: l === 'hi' ? 'सेवाएँ' : 'Services', url: `https://systemmaster.in/${l}/services`},
          {name: service.name[l], url: pageUrl}
        ]}
      />
      <ServiceSchema
        name={service.name[l]}
        description={service.description[l]}
        url={pageUrl}
      />
      <ServiceDetailPage service={service} locale={l} />
    </>
  );
}
