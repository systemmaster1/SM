'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowLeft, ArrowRight, CalendarDays, Clock3, Tag} from 'lucide-react';
import {Reveal} from '@/components/reveal';
import {articles, getLocalized, type ResourceArticle} from '@/data/resources';

export function BlogDetailPage({article}: {article: ResourceArticle}) {
  const locale = useLocale();
  const t = useTranslations('blogPage');
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main>
      <article>
        <section className="py-16 md:py-24">
          <div className="container max-w-5xl">
            <Link href={`/${locale}/resources`} className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--muted)]">
              <ArrowLeft size={16} />
              {t('back')}
            </Link>
            <Reveal>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                <span className="flex items-center gap-1.5"><Tag size={15}/>{getLocalized(article.category, locale)}</span>
                <span className="flex items-center gap-1.5"><CalendarDays size={15}/>{article.publishedAt}</span>
                <span className="flex items-center gap-1.5"><Clock3 size={15}/>{article.readTime} min</span>
              </div>
              <h1 className="display mt-5 text-[clamp(2.6rem,6vw,5rem)] font-black">{getLocalized(article.title, locale)}</h1>
              <p className="muted mt-6 max-w-4xl text-xl leading-9">{getLocalized(article.excerpt, locale)}</p>
            </Reveal>
          </div>
        </section>

        <section className="pb-20">
          <div className="container max-w-4xl">
            <div className="grid gap-10">
              {article.sections.map((section, index) => (
                <Reveal key={index}>
                  <section>
                    <h2 className="display text-3xl font-black">{getLocalized(section.heading, locale)}</h2>
                    <p className="muted mt-4 text-lg leading-9">{getLocalized(section.body, locale)}</p>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </article>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="display text-3xl font-black">{t('related')}</h2>
          </Reveal>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * .04}>
                <Link href={`/${locale}/resources/blog/${item.slug}`} className="card block h-full p-6 transition hover:-translate-y-1">
                  <div className="text-xs font-extrabold uppercase tracking-[.12em] text-[var(--gold)]">
                    {getLocalized(item.category, locale)}
                  </div>
                  <h3 className="display mt-4 text-xl font-black">{getLocalized(item.title, locale)}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="card p-8 text-center md:p-12">
              <h2 className="display text-4xl font-black">{t('ctaTitle')}</h2>
              <p className="muted mx-auto mt-4 max-w-2xl text-lg">{t('ctaDesc')}</p>
              <Link href={`/${locale}/contact`} className="btn btn-gold mt-7">
                {t('cta')}
                <ArrowRight size={17}/>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
