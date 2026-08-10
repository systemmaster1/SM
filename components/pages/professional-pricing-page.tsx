'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowRight, Check, ExternalLink, Sparkles} from 'lucide-react';
import {pricingProducts} from '@/data/pricing';
import {Reveal} from '@/components/reveal';

const faqKeys = ['1', '2', '3', '4'] as const;

export function ProfessionalPricingPage() {
  const locale = useLocale();
  const t = useTranslations('pricingPro');

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
            <div className="sm-section-heading center">
              <h2 className="display">{t('ready')}</h2>
            </div>
          </Reveal>

          <div className="grid-3 mt-10">
            {pricingProducts.map((product, index) => (
              <Reveal key={product.slug} delay={index * .05}>
                <article
                  className={`card sm-price-card ${
                    product.popular ? 'ring-1 ring-[var(--primary)]/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs font-extrabold uppercase tracking-[.12em] text-[var(--gold-strong)]">
                      {product.priceType === 'starting'
                        ? t('starting')
                        : t('offer')}
                    </div>

                    {product.popular ? (
                      <div className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-extrabold text-[var(--primary)]">
                        {t('popular')}
                      </div>
                    ) : null}
                  </div>

                  <h3 className="display mt-5 text-2xl">{product.name}</h3>

                  <div className="mt-6 flex flex-wrap items-end gap-x-2 gap-y-1">
                    <div className="sm-price">{product.price}</div>
                    {product.priceType === 'perUser' ? (
                      <div className="muted pb-1 text-sm">{t('perUser')}</div>
                    ) : null}
                  </div>

                  <div className="mt-7 border-t border-[var(--line)] pt-6">
                    <div className="text-sm font-extrabold">{t('included')}</div>
                    <div className="mt-4 grid gap-3">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex gap-3 text-sm">
                          <Check
                            className="mt-0.5 shrink-0 text-emerald-500"
                            size={17}
                          />
                          <span className="muted leading-6">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto grid gap-2 pt-7">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >
                      {t('visit')}
                      <ExternalLink size={16} />
                    </a>
                    <Link
                      href={`/${locale}/contact?interest=${product.slug}`}
                      className="btn btn-ghost"
                    >
                      {t('demo')}
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="muted mx-auto mt-6 max-w-4xl text-center text-xs leading-6">
            {t('note')}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="card overflow-hidden p-8 md:p-11">
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div className="max-w-3xl">
                  <div className="eyebrow">{t('custom')}</div>
                  <h2 className="display mt-4 text-4xl md:text-5xl">
                    {t('customTitle')}
                  </h2>
                  <p className="muted mt-5 text-lg leading-8">{t('customDesc')}</p>
                </div>

                <Link href={`/${locale}/contact`} className="btn btn-gold">
                  {t('customCta')}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl">
          <Reveal>
            <div className="sm-section-heading center">
              <h2 className="display">{t('faqTitle')}</h2>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-3">
            {faqKeys.map((key) => (
              <details key={key} className="card overflow-hidden">
                <summary className="cursor-pointer list-none p-5 font-extrabold md:p-6">
                  {t(`faq.q${key}`)}
                </summary>
                <div className="border-t border-[var(--line)] px-5 pb-6 pt-5 md:px-6">
                  <p className="muted leading-7">{t(`faq.a${key}`)}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
