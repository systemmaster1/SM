import type {ResourceArticle} from '@/data/resources';
import {getLocalized} from '@/data/resources';

export function ArticleSchema({
  article,
  locale
}: {
  article: ResourceArticle;
  locale: string;
}) {
  const base = 'https://systemmaster.in';
  const currentLocale = locale === 'hi' ? 'hi' : 'en';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: getLocalized(article.title, currentLocale),
    description: getLocalized(article.excerpt, currentLocale),
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: currentLocale === 'hi' ? 'hi-IN' : 'en-IN',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${base}/${currentLocale}/resources/blog/${article.slug}`
    },
    author: {
      '@type': 'Organization',
      name: 'SystemMaster Automations',
      url: base
    },
    publisher: {
      '@type': 'Organization',
      name: 'SystemMaster Automations',
      url: base,
      logo: {
        '@type': 'ImageObject',
        url: `${base}/logo/systemmaster.png`
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  );
}
