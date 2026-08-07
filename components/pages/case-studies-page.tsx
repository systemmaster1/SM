'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowRight, BriefcaseBusiness} from 'lucide-react';
import {Reveal} from '@/components/reveal';
import {caseStudies, getLocalized} from '@/data/resources';

export function CaseStudiesPage() {
  const locale = useLocale();
  const t = useTranslations('caseStudiesPage');

  return (
    <main>
      <section className="py-20 md:py-28">
        <div className="container">
          <Reveal>
            <div className="eyebrow">
              <BriefcaseBusiness size={15}/>
              {t('eyebrow')}
            </div>
            <h1 className="display mt-5 max-w-5xl text-[clamp(2.8rem,6vw,5.4rem)] font-black">{t('title')}</h1>
            <p className="muted mt-6 max-w-3xl text-lg leading-8">{t('desc')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container grid gap-6">
          {caseStudies.map((item, index) => (
            <Reveal key={item.slug} delay={index * .05}>
              <article className="card p-7 md:p-9">
                <div className="text-xs font-extrabold uppercase tracking-[.12em] text-[var(--gold)]">
                  {getLocalized(item.industry, locale)}
                </div>
                <h2 className="display mt-4 text-3xl font-black md:text-4xl">{getLocalized(item.title, locale)}</h2>
                <div className="mt-7 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]/50 p-5">
                    <div className="text-sm font-black text-[var(--gold)]">{t('challenge')}</div>
                    <p className="muted mt-3 leading-7">{getLocalized(item.challenge, locale)}</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]/50 p-5">
                    <div className="text-sm font-black text-[var(--primary)]">{t('solution')}</div>
                    <p className="muted mt-3 leading-7">{getLocalized(item.solution, locale)}</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]/50 p-5">
                    <div className="text-sm font-black text-emerald-500">{t('outcome')}</div>
                    <p className="muted mt-3 leading-7">{getLocalized(item.outcome, locale)}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-extrabold">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/${locale}/contact`} className="btn btn-ghost mt-7">
                  {t('cta')}
                  <ArrowRight size={17}/>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
