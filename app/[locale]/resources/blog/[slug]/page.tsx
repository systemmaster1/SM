import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BlogDetailPage} from '@/components/pages/blog-detail-page';
import {ArticleSchema} from '@/components/seo/article-schema';
import {articles, getArticle, getLocalized} from '@/data/resources';

export function generateStaticParams() {
  return ['en', 'hi'].flatMap((locale) =>
    articles.map((article) => ({locale, slug: article.slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const article = getArticle(slug);

  if (!article) return {};

  const currentLocale = locale === 'hi' ? 'hi' : 'en';
  const title = `${getLocalized(article.title, currentLocale)} | SystemMaster`;
  const description = getLocalized(article.excerpt, currentLocale);
  const canonical = `https://systemmaster.in/${currentLocale}/resources/blog/${article.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `https://systemmaster.in/en/resources/blog/${article.slug}`,
        hi: `https://systemmaster.in/hi/resources/blog/${article.slug}`
      }
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonical,
      siteName: 'SystemMaster Automations',
      publishedTime: article.publishedAt,
      locale: currentLocale === 'hi' ? 'hi_IN' : 'en_IN'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

export default async function Page({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const currentLocale = locale === 'hi' ? 'hi' : 'en';

  return (
    <>
      <ArticleSchema article={article} locale={currentLocale} />
      <BlogDetailPage article={article} />
    </>
  );
}
