import type {MetadataRoute} from 'next';
import {articles} from '@/data/resources';
import {portfolioProjects} from '@/data/portfolio';
import {industryDetails} from '@/data/industries';
import {productDetails, serviceDetails} from '@/data/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://systemmaster.in';
  const locales = ['en', 'hi'] as const;

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

  for (const locale of locales) {
    for (const route of staticRoutes) {
      urls.push({
        url: `${base}/${locale}${route}`,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.7
      });
    }

    for (const product of productDetails) {
      urls.push({
        url: `${base}/${locale}/products/${product.slug}`,
        changeFrequency: 'monthly',
        priority: 0.8
      });
    }

    for (const service of serviceDetails) {
      urls.push({
        url: `${base}/${locale}/services/${service.slug}`,
        changeFrequency: 'monthly',
        priority: 0.75
      });
    }

    for (const industry of industryDetails) {
      urls.push({
        url: `${base}/${locale}/industries/${industry.slug}`,
        changeFrequency: 'monthly',
        priority: 0.7
      });
    }

    for (const project of portfolioProjects) {
      urls.push({
        url: `${base}/${locale}/portfolio/${project.slug}`,
        changeFrequency: 'monthly',
        priority: 0.65
      });
    }

    for (const article of articles) {
      urls.push({
        url: `${base}/${locale}/resources/blog/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.65
      });
    }
  }

  return urls;
}
