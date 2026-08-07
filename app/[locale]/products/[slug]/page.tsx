import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ProductDetailPage} from '@/components/pages/product-detail-page';
import {BreadcrumbSchema} from '@/components/seo/breadcrumb-schema';
import {SoftwareProductSchema} from '@/components/seo/entity-schema';
import {productDetails, productSlugs, type Locale} from '@/data/catalog';

export function generateStaticParams() {
  return productSlugs.flatMap((slug) =>
    ['en', 'hi'].map((locale) => ({locale, slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const product = productDetails.find((item) => item.slug === slug);

  if (!product) return {};

  const l: Locale = locale === 'hi' ? 'hi' : 'en';
  const canonical = `https://systemmaster.in/${l}/products/${product.slug}`;
  const title = `${product.name} | SystemMaster Automations`;
  const description = product.description[l];

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `https://systemmaster.in/en/products/${product.slug}`,
        hi: `https://systemmaster.in/hi/products/${product.slug}`
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
  const product = productDetails.find((item) => item.slug === slug);

  if (!product) notFound();

  const l: Locale = locale === 'hi' ? 'hi' : 'en';
  const pageUrl = `https://systemmaster.in/${l}/products/${product.slug}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          {name: 'SystemMaster', url: `https://systemmaster.in/${l}`},
          {name: l === 'hi' ? 'प्रोडक्ट' : 'Products', url: `https://systemmaster.in/${l}/products`},
          {name: product.name, url: pageUrl}
        ]}
      />
      <SoftwareProductSchema
        name={product.name}
        description={product.description[l]}
        url={pageUrl}
        price={product.price}
        productUrl={product.href}
      />
      <ProductDetailPage product={product} locale={l} />
    </>
  );
}
