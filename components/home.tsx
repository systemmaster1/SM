'use client';

import Image from 'next/image';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowRight,
  Building2,
  Check,
  Code2,
  Headphones,
  ShieldCheck,
  Sparkles,
  Zap
} from 'lucide-react';
import {industries, pick, products, services} from '@/data/site';
import {Reveal} from '@/components/reveal';
import {EnterpriseHomeSections} from '@/components/sections/enterprise-home-sections';

export function Home() {
  const locale = useLocale();
  const hero = useTranslations('hero');
  const productsT = useTranslations('products');
  const customT = useTranslations('custom');
  const industriesT = useTranslations('industries');
  const whyT = useTranslations('why');
  const dashboardT = useTranslations('dashboard');
  const statsT = useTranslations('stats');

  const dashboardRows = [
    [dashboardT('sales'), dashboardT('salesSub'), '+18%'],
    [dashboardT('workflow'), dashboardT('workflowSub'), '86%'],
    [dashboardT('whatsapp'), dashboardT('whatsappSub'), '24/7'],
    [dashboardT('reports'), dashboardT('reportsSub'), '09:00']
  ];

  return (
    <main>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.04fr_.96fr] xl:gap-16">
          <div className="min-w-0">
            <motion.div
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              className="eyebrow"
            >
              <Sparkles size={14} />
              {hero('badge')}
            </motion.div>

            <motion.h1
              initial={{opacity: 0, y: 22}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .08}}
              className="display mt-6 max-w-[760px] text-[clamp(3rem,6vw,5.45rem)]"
            >
              {hero('title1')}{' '}
              <span className="bg-gradient-to-r from-[var(--gold-2)] to-[var(--gold)] bg-clip-text text-transparent">
                {hero('title2')}
              </span>
            </motion.h1>

            <motion.p
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .16}}
              className="muted mt-6 max-w-2xl text-lg leading-8"
            >
              {hero('desc')}
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="btn btn-gold">
                {hero('primary')}
                <ArrowRight size={18} />
              </Link>
              <Link href={`/${locale}/products`} className="btn btn-ghost">
                {hero('secondary')}
              </Link>
            </div>

            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
              {[
                [statsT('yearsValue'), statsT('yearsLabel')],
                [statsT('productsValue'), statsT('productsLabel')],
                [statsT('supportValue'), statsT('supportLabel')]
              ].map(([value, label]) => (
                <div key={label} className="sm-stat-card">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{opacity: 0, scale: .96, x: 24}}
            animate={{opacity: 1, scale: 1, x: 0}}
            transition={{duration: .72}}
            className="card sm-command-center p-5 md:p-7"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="font-extrabold">{dashboardT('title')}</div>
                <div className="muted mt-1 text-xs">{dashboardT('subtitle')}</div>
              </div>
              <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-[11px] font-extrabold text-emerald-600">
                {dashboardT('live')}
              </span>
            </div>

            <div className="grid gap-3">
              {dashboardRows.map((row, index) => (
                <motion.div
                  key={row[0]}
                  initial={{opacity: 0, x: 16}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: .3 + index * .08}}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]/65 p-4"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-500/12 text-[var(--primary)]">
                    <Zap size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-extrabold">{row[0]}</div>
                    <div className="muted mt-0.5 truncate text-sm">{row[1]}</div>
                  </div>
                  <div className="shrink-0 text-sm font-extrabold text-emerald-600">
                    {row[2]}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container">
          <Reveal>
            <div className="sm-section-heading center">
              <div className="eyebrow">{productsT('eyebrow')}</div>
              <h2 className="display">{productsT('title')}</h2>
              <p>{productsT('desc')}</p>
            </div>
          </Reveal>

          <div className="grid-3 mt-11">
            {products.map((product, index) => (
              <Reveal key={product.key} delay={index * .07}>
                <article className="card sm-product-card">
                  <div className="sm-product-logo-area">
                    <Image
                      src={product.logo}
                      alt={product.name}
                      width={116}
                      height={86}
                      className="h-20 w-28 object-contain"
                    />
                    <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                      {productsT('ready')}
                    </span>
                  </div>

                  <h3 className="display mt-5 text-2xl">{product.name}</h3>
                  <div className="mt-2 text-lg font-extrabold text-[var(--gold-strong)]">
                    {pick(product.price, locale)}
                  </div>

                  <ul className="sm-product-features">
                    {product.features.map((feature) => (
                      <li key={feature.en} className="flex gap-2.5">
                        <Check
                          size={17}
                          className="mt-0.5 shrink-0 text-emerald-500"
                        />
                        {pick(feature, locale)}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto grid gap-2 pt-7 sm:grid-cols-[1fr_auto]">
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >
                      {productsT('visit')}
                      <ArrowRight size={16} />
                    </a>
                    <Link href={`/${locale}/contact`} className="btn btn-ghost">
                      {productsT('demo')}
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
          <div className="card overflow-hidden p-7 md:p-11">
            <div className="grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr]">
              <Reveal>
                <div className="max-w-xl">
                  <div className="eyebrow">
                    <Code2 size={15} />
                    {customT('eyebrow')}
                  </div>
                  <h2 className="display mt-5 text-4xl md:text-5xl">
                    {customT('title')}
                  </h2>
                  <p className="muted mt-5 text-lg leading-8">{customT('desc')}</p>
                  <Link href={`/${locale}/contact`} className="btn btn-gold mt-7">
                    {customT('cta')}
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </Reveal>

              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service, index) => (
                  <Reveal key={service.slug} delay={index * .025}>
                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className="flex min-h-[72px] items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]/55 p-4 font-extrabold transition hover:-translate-y-0.5 hover:border-blue-500/25"
                    >
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-500/12 text-[var(--primary)]">
                        <Code2 size={17} />
                      </div>
                      <span>{pick(service.label, locale)}</span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sm-section-heading">
              <div className="eyebrow">
                <Building2 size={15} />
                {industriesT('eyebrow')}
              </div>
              <h2 className="display">{industriesT('title')}</h2>
            </div>
          </Reveal>

          <div className="grid-4 mt-10">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * .03}>
                <Link
                  href={`/${locale}/industries/${industry.slug}`}
                  className="card sm-marketing-card min-h-[190px]"
                >
                  <Building2 className="text-[var(--gold)]" />
                  <h3 className="sm-marketing-card__title">
                    {pick(industry.label, locale)}
                  </h3>
                  <p className="sm-marketing-card__desc text-sm">
                    {industriesT('cardDesc')}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sm-section-heading center">
              <div className="eyebrow">{whyT('eyebrow')}</div>
              <h2 className="display">{whyT('title')}</h2>
            </div>
          </Reveal>

          <div className="grid-4 mt-10">
            {[
              [ShieldCheck, whyT('secureTitle'), whyT('secureDesc')],
              [Sparkles, whyT('premiumTitle'), whyT('premiumDesc')],
              [Headphones, whyT('supportTitle'), whyT('supportDesc')],
              [Zap, whyT('automationTitle'), whyT('automationDesc')]
            ].map(([Icon, title, description], index) => {
              const ItemIcon = Icon as typeof ShieldCheck;
              return (
                <Reveal key={String(title)} delay={index * .05}>
                  <article className="card sm-marketing-card">
                    <ItemIcon className="text-[var(--gold)]" />
                    <h3 className="sm-marketing-card__title">{String(title)}</h3>
                    <p className="sm-marketing-card__desc text-sm">
                      {String(description)}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <EnterpriseHomeSections />
    </main>
  );
}
