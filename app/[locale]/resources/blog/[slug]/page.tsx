import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BlogDetailPage} from '@/components/pages/blog-detail-page';
import {articles, getArticle, getLocalized} from '@/data/resources';

export function generateStaticParams() {
  return articles.map((article) => ({slug: article.slug}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${getLocalized(article.title, locale)} | SystemMaster`,
    description: getLocalized(article.excerpt, locale)
  };
}

export default async function Page({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {slug} = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <BlogDetailPage article={article} />;
}
