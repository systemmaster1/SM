'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowRight,
  BriefcaseBusiness,
  CircleCheckBig,
  Lightbulb,
  TriangleAlert
} from 'lucide-react';
import {Reveal} from '@/components/reveal';
import {caseStudies, getLocalized} from '@/data/resources';

export function CaseStudiesPage() {
  const locale = useLocale();
  const t = useTranslations('caseStudiesPage');

  return (
    <main>
      <section className="sm-page-hero relative overflow-hidden">
        <div className="container">
          <Reveal>
            <div className="sm-page-hero__inner">
              <div className="eyebrow">
                <BriefcaseBusiness size={15} />
                {t('eyebrow')}
              </div>
              <h1 className="display sm-page-hero__title">{t('title')}</h1>
              <p className="sm-page-hero__desc">{t('desc')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-3">
        <div className="container grid gap-6">
          {caseStudies.map((item, index) => (
            <Reveal key={item.slug} delay={index * .05}>
              <article className="card p-7 md:p-9">
                <div className="text-xs font-extrabold uppercase tracking-[.12em] text-[var(--gold-strong)]">
                  {getLocalized(item.industry, locale)}
                </div>

                <h2 className="display mt-4 max-w-4xl text-3xl md:text-4xl">
                  {getLocalized(item.title, locale)}
                </h2>

                <div className="sm-case-grid mt-7">
                  <div className="sm-case-block">
                    <TriangleAlert className="text-amber-500" size={22} />
                    <div className="mt-4 text-sm font-extrabold text-[var(--gold-strong)]">
                      {t('challenge')}
                    </div>
                    <p className="muted mt-3 leading-7">
                      {getLocalized(item.challenge, locale)}
                    </p>
                  </div>

                  <div className="sm-case-block">
                    <Lightbulb className="text-[var(--primary)]" size={22} />
                    <div className="mt-4 text-sm font-extrabold text-[var(--primary)]">
                      {t('solution')}
                    </div>
                    <p className="muted mt-3 leading-7">
                      {getLocalized(item.solution, locale)}
                    </p>
                  </div>

                  <div className="sm-case-block">
                    <CircleCheckBig className="text-emerald-500" size={22} />
                    <div className="mt-4 text-sm font-extrabold text-emerald-600">
                      {t('outcome')}
                    </div>
                    <p className="muted mt-3 leading-7">
                      {getLocalized(item.outcome, locale)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="sm-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/${locale}/contact`} className="btn btn-ghost mt-7">
                  {t('cta')}
                  <ArrowRight size={17} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
