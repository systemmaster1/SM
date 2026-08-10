'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Clock3,
  Sparkles
} from 'lucide-react';
import {Reveal} from '@/components/reveal';
import {articles, caseStudies, getLocalized} from '@/data/resources';

export function ResourcesPage() {
  const locale = useLocale();
  const t = useTranslations('resourcesPage');
  const featured = articles.filter((article) => article.featured);
  const regular = articles.filter((article) => !article.featured);

  return (
    <main>
      <section className="sm-page-hero relative overflow-hidden">
        <div className="container">
          <Reveal>
            <div className="sm-page-hero__inner">
              <div className="eyebrow">
                <Sparkles size={15} />
                {t('eyebrow')}
              </div>
              <h1 className="display sm-page-hero__title">{t('title')}</h1>
              <p className="sm-page-hero__desc">{t('desc')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-3">
        <div className="container">
          <Reveal>
            <div className="sm-section-heading">
              <div className="flex items-center gap-2 text-[var(--gold-strong)]">
                <BookOpen size={21} />
                <span className="text-sm font-extrabold uppercase tracking-[.12em]">
                  {t('featured')}
                </span>
              </div>
              <h2 className="display">{t('featured')}</h2>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {featured.map((article, index) => (
              <Reveal key={article.slug} delay={index * .06}>
                <article className="card sm-resource-card">
                  <div className="sm-resource-card__meta">
                    <span>{getLocalized(article.category, locale)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[var(--muted)]">
                      <Clock3 size={13} />
                      {article.readTime} {t('minutes')}
                    </span>
                  </div>
                  <h3 className="display mt-5 text-3xl">
                    {getLocalized(article.title, locale)}
                  </h3>
                  <p className="sm-resource-card__desc">
                    {getLocalized(article.excerpt, locale)}
                  </p>
                  <div className="sm-resource-card__footer">
                    <Link
                      href={`/${locale}/resources/blog/${article.slug}`}
                      className="btn btn-ghost"
                    >
                      {t('readArticle')}
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sm-section-heading">
              <h2 className="display">{t('allArticles')}</h2>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {regular.map((article, index) => (
              <Reveal key={article.slug} delay={index * .04}>
                <article className="card sm-resource-card">
                  <div className="sm-resource-card__meta">
                    {getLocalized(article.category, locale)}
                  </div>
                  <h3 className="sm-resource-card__title">
                    {getLocalized(article.title, locale)}
                  </h3>
                  <p className="sm-resource-card__desc text-sm">
                    {getLocalized(article.excerpt, locale)}
                  </p>
                  <div className="sm-resource-card__footer flex items-center justify-between gap-3">
                    <span className="muted flex items-center gap-1 text-xs">
                      <Clock3 size={13} />
                      {article.readTime} {t('minutes')}
                    </span>
                    <Link
                      href={`/${locale}/resources/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-extrabold text-[var(--primary)]"
                    >
                      {t('readArticle')}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="card grid items-center gap-8 p-8 md:p-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl">
                <div className="eyebrow">
                  <BriefcaseBusiness size={15} />
                  {t('caseStudies')}
                </div>
                <h2 className="display mt-4 text-4xl">
                  {caseStudies.length} {t('caseStudies')}
                </h2>
                <p className="muted mt-4 text-lg leading-8">
                  {t('caseStudiesDesc')}
                </p>
              </div>
              <Link
                href={`/${locale}/resources/case-studies`}
                className="btn btn-primary"
              >
                {t('viewCases')}
                <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container">
          <Reveal>
            <div className="card p-8 text-center md:p-12">
              <h2 className="display mx-auto max-w-4xl text-4xl">
                {t('ctaTitle')}
              </h2>
              <p className="muted mx-auto mt-5 max-w-3xl text-lg leading-8">
                {t('ctaDesc')}
              </p>
              <Link href={`/${locale}/contact`} className="btn btn-gold mt-8">
                {t('cta')}
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
