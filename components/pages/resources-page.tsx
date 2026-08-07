'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowRight, BookOpen, BriefcaseBusiness, Clock3, Sparkles} from 'lucide-react';
import {Reveal} from '@/components/reveal';
import {articles, caseStudies, getLocalized} from '@/data/resources';

export function ResourcesPage() {
  const locale = useLocale();
  const t = useTranslations('resourcesPage');
  const featured = articles.filter((article) => article.featured);
  const regular = articles.filter((article) => !article.featured);

  return (
    <main>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="container">
          <Reveal>
            <div className="eyebrow">
              <Sparkles size={15} />
              {t('eyebrow')}
            </div>
            <h1 className="display mt-5 max-w-5xl text-[clamp(2.8rem,6vw,5.4rem)] font-black">
              {t('title')}
            </h1>
            <p className="muted mt-6 max-w-3xl text-lg leading-8">{t('desc')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="flex items-center gap-2">
              <BookOpen className="text-[var(--gold)]" size={21} />
              <h2 className="display text-3xl font-black md:text-4xl">{t('featured')}</h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {featured.map((article, index) => (
              <Reveal key={article.slug} delay={index * .06}>
                <article className="card h-full p-7 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-[.12em] text-[var(--gold)]">
                    <span>{getLocalized(article.category, locale)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[var(--muted)]">
                      <Clock3 size={13} />
                      {article.readTime} {t('minutes')}
                    </span>
                  </div>
                  <h3 className="display mt-5 text-3xl font-black">{getLocalized(article.title, locale)}</h3>
                  <p className="muted mt-4 leading-7">{getLocalized(article.excerpt, locale)}</p>
                  <Link href={`/${locale}/resources/blog/${article.slug}`} className="btn btn-ghost mt-7">
                    {t('readArticle')}
                    <ArrowRight size={17} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="display text-3xl font-black md:text-4xl">{t('allArticles')}</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {regular.map((article, index) => (
              <Reveal key={article.slug} delay={index * .04}>
                <article className="card h-full p-6">
                  <div className="text-xs font-extrabold uppercase tracking-[.12em] text-[var(--gold)]">
                    {getLocalized(article.category, locale)}
                  </div>
                  <h3 className="display mt-4 text-xl font-black">{getLocalized(article.title, locale)}</h3>
                  <p className="muted mt-3 text-sm leading-6">{getLocalized(article.excerpt, locale)}</p>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="muted flex items-center gap-1 text-xs">
                      <Clock3 size={13} />
                      {article.readTime} {t('minutes')}
                    </span>
                    <Link href={`/${locale}/resources/blog/${article.slug}`} className="text-sm font-extrabold text-[var(--primary)]">
                      {t('readArticle')} →
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
            <div className="card grid gap-8 p-8 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="eyebrow">
                  <BriefcaseBusiness size={15} />
                  {t('caseStudies')}
                </div>
                <h2 className="display mt-4 text-4xl font-black">{caseStudies.length} {t('caseStudies')}</h2>
                <p className="muted mt-4 max-w-2xl text-lg leading-8">{t('caseStudiesDesc')}</p>
              </div>
              <Link href={`/${locale}/resources/case-studies`} className="btn btn-primary">
                {t('viewCases')}
                <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="card p-8 text-center md:p-14">
              <h2 className="display text-4xl font-black md:text-5xl">{t('ctaTitle')}</h2>
              <p className="muted mx-auto mt-5 max-w-3xl text-lg leading-8">{t('ctaDesc')}</p>
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
