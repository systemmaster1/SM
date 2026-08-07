import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {PortfolioDetailPage} from '@/components/pages/portfolio-detail-page';
import {BreadcrumbSchema} from '@/components/seo/breadcrumb-schema';
import {CreativeWorkSchema} from '@/components/seo/entity-schema';
import {portfolioProjects, portfolioSlugs} from '@/data/portfolio';
import type {Locale} from '@/data/site';

export function generateStaticParams() {
  return ['en', 'hi'].flatMap((locale) =>
    portfolioSlugs.map((slug) => ({locale, slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) return {};

  const l: Locale = locale === 'hi' ? 'hi' : 'en';
  const title = `${project.name[l]} | SystemMaster Portfolio`;
  const description = project.description[l];
  const canonical = `https://systemmaster.in/${l}/portfolio/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `https://systemmaster.in/en/portfolio/${slug}`,
        hi: `https://systemmaster.in/hi/portfolio/${slug}`
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
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project || !['en', 'hi'].includes(locale)) notFound();

  const l = locale as Locale;
  const pageUrl = `https://systemmaster.in/${l}/portfolio/${project.slug}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          {name: 'SystemMaster', url: `https://systemmaster.in/${l}`},
          {name: l === 'hi' ? 'पोर्टफोलियो' : 'Portfolio', url: `https://systemmaster.in/${l}/portfolio`},
          {name: project.name[l], url: pageUrl}
        ]}
      />
      <CreativeWorkSchema
        name={project.name[l]}
        description={project.description[l]}
        url={pageUrl}
      />
      <PortfolioDetailPage project={project} locale={l} />
    </>
  );
}
