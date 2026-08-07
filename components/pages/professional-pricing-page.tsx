'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowRight, Check, ExternalLink, Sparkles} from 'lucide-react';
import {Reveal} from '@/components/reveal';
import {pricingProducts} from '@/data/pricing';

const faqKeys = ['1', '2', '3', '4'] as const;

export function ProfessionalPricingPage() {
  const locale = useLocale();
  const t = useTranslations('pricingPro');

  return (
    <main>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="container text-center">
          <Reveal>
            <div className="eyebrow">
              <Sparkles size={15} />
              {t('eyebrow')}
            </div>
            <h1 className="display mx-auto mt-5 max-w-5xl text-[clamp(2.8rem,6vw,5.3rem)] font-black">
              {t('title')}
            </h1>
            <p className="muted mx-auto mt-6 max-w-3xl text-lg leading-8">{t('desc')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <Reveal>
            <h2 className="display text-center text-3xl font-black md:text-4xl">{t('ready')}</h2>
          </Reveal>

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {pricingProducts.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.05}>
                <article
                  className={`card relative h-full p-7 ${
                    product.popular ? 'ring-1 ring-[var(--primary)]/40' : ''
                  }`}
                >
                  {product.popular ? (
                    <div className="absolute right-5 top-5 rounded-full bg-[var(--primary)]/15 px-3 py-1 text-xs font-black text-[var(--primary)]">
                      {t('popular')}
                    </div>
                  ) : null}

                  <div className="text-xs font-black uppercase tracking-[.13em] text-[var(--gold)]">
                    {product.priceType === 'starting' ? t('starting') : t('offer')}
                  </div>

                  <h3 className="display mt-4 pr-20 text-2xl font-black">{product.name}</h3>

                  <div className="mt-6 flex items-end gap-2">
                    <div className="display text-5xl font-black">{product.price}</div>
                    {product.priceType === 'perUser' ? (
                      <div className="muted pb-1 text-sm">{t('perUser')}</div>
                    ) : null}
                  </div>

                  <div className="mt-7 border-t border-[var(--line)] pt-6">
                    <div className="text-sm font-black">{t('included')}</div>
                    <div className="mt-4 grid gap-3">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex gap-3 text-sm">
                          <Check className="mt-0.5 shrink-0 text-emerald-500" size={17} />
                          <span className="muted">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 grid gap-2">
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

          <p className="muted mx-auto mt-6 max-w-4xl text-center text-xs leading-6">{t('note')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="card relative overflow-hidden p-8 md:p-12">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="eyebrow">{t('custom')}</div>
                  <h2 className="display mt-4 text-4xl font-black md:text-5xl">{t('customTitle')}</h2>
                  <p className="muted mt-5 max-w-3xl text-lg leading-8">{t('customDesc')}</p>
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
            <h2 className="display text-center text-4xl font-black">{t('faqTitle')}</h2>
          </Reveal>
          <div className="mt-8 grid gap-3">
            {faqKeys.map((key) => (
              <details key={key} className="card p-0">
                <summary className="cursor-pointer list-none p-5 font-black md:p-6">
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
