import type {MetadataRoute} from 'next';
import {articles} from '@/data/resources';
import {portfolioProjects} from '@/data/portfolio';
import {industryDetails} from '@/data/industries';
import {productDetails, serviceDetails} from '@/data/catalog';

const base = 'https://systemmaster.in';
const locales = ['en', 'hi'] as const;

function alternates(path: string) {
  return {
    languages: {
      en: `${base}/en${path}`,
      hi: `${base}/hi${path}`
    }
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/products',
    '/services',
    '/industries',
    '/portfolio',
    '/pricing',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/resources',
    '/resources/case-studies'
  ] as const;

  const urls: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of locales) {
    for (const route of staticRoutes) {
      urls.push({
        url: `${base}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.7,
        alternates: alternates(route)
      });
    }

    for (const product of productDetails) {
      const path = `/products/${product.slug}`;
      urls.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: alternates(path)
      });
    }

    for (const service of serviceDetails) {
      const path = `/services/${service.slug}`;
      urls.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
        alternates: alternates(path)
      });
    }

    for (const industry of industryDetails) {
      const path = `/industries/${industry.slug}`;
      urls.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: alternates(path)
      });
    }

    for (const project of portfolioProjects) {
      const path = `/portfolio/${project.slug}`;
      urls.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
        alternates: alternates(path)
      });
    }

    for (const article of articles) {
      const path = `/resources/blog/${article.slug}`;
      urls.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.65,
        alternates: alternates(path)
      });
    }
  }

  return urls;
}
