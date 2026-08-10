'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowRight,
  Blocks,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  MessageSquareMore,
  Network,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Workflow
} from 'lucide-react';
import {Reveal} from '@/components/reveal';
import {FAQSection} from '@/components/sections/faq-section';
import {technologyStack} from '@/data/company';

const processSteps = [
  ['discovery', Users],
  ['planning', GitBranch],
  ['design', Layers3],
  ['build', Code2],
  ['test', ShieldCheck],
  ['launch', Rocket]
] as const;

const trustItems = [
  ['ownership', CheckCircle2],
  ['security', ShieldCheck],
  ['scale', Blocks],
  ['support', MessageSquareMore],
  ['responsive', Smartphone],
  ['integration', Network]
] as const;

export function EnterpriseHomeSections() {
  const locale = useLocale();
  const t = useTranslations('homeTrust');

  return (
    <>
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
              <div>
                <div className="eyebrow">
                  <Cloud size={15} />
                  {t('tech.eyebrow')}
                </div>
                <h2 className="display mt-4 text-4xl font-black md:text-5xl">{t('tech.title')}</h2>
              </div>
              <p className="muted max-w-2xl text-lg leading-8 lg:justify-self-end">{t('tech.desc')}</p>
            </div>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            {technologyStack.map((name, index) => (
              <motion.div
                key={name}
                initial={{opacity: 0, y: 12}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: index * 0.025}}
                whileHover={{y: -3}}
                className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-extrabold shadow-sm"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="text-center">
              <div className="eyebrow">
                <Workflow size={15} />
                {t('process.eyebrow')}
              </div>
              <h2 className="display mx-auto mt-4 max-w-4xl text-4xl font-black md:text-5xl">
                {t('process.title')}
              </h2>
              <p className="muted mx-auto mt-5 max-w-3xl text-lg leading-8">{t('process.desc')}</p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {processSteps.map(([key, Icon], index) => (
              <Reveal key={key} delay={index * 0.04}>
                <article className="card group h-full p-6 transition hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-[var(--primary)]">
                      <Icon size={22} />
                    </div>
                    <span className="display text-sm font-black text-[var(--gold)]">0{index + 1}</span>
                  </div>
                  <h3 className="display mt-5 text-xl font-black">{t(`process.steps.${key}.title`)}</h3>
                  <p className="muted mt-3 text-sm leading-6">{t(`process.steps.${key}.desc`)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="card relative overflow-hidden p-8 md:p-12">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
              <div className="relative grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
                <div>
                  <div className="eyebrow">
                    <Sparkles size={15} />
                    {t('productsProof.eyebrow')}
                  </div>
                  <h2 className="display mt-4 text-4xl font-black md:text-5xl">{t('productsProof.title')}</h2>
                  <p className="muted mt-5 text-lg leading-8">{t('productsProof.desc')}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                      <Rocket size={22} />
                    </div>
                    <h3 className="display text-2xl font-black">{t('productsProof.ready')}</h3>
                    <p className="muted mt-3 text-sm leading-6">{t('productsProof.readyDesc')}</p>
                    <Link href={`/${locale}/products`} className="btn btn-primary mt-6 !min-h-11">
                      {t('productsProof.productsCta')}
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-[var(--primary)]">
                      <Bot size={22} />
                    </div>
                    <h3 className="display text-2xl font-black">{t('productsProof.custom')}</h3>
                    <p className="muted mt-3 text-sm leading-6">{t('productsProof.customDesc')}</p>
                    <Link href={`/${locale}/contact`} className="btn btn-ghost mt-6 !min-h-11">
                      {t('productsProof.customCta')}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="text-center">
              <div className="eyebrow">
                <ShieldCheck size={15} />
                {t('trust.eyebrow')}
              </div>
              <h2 className="display mx-auto mt-4 max-w-4xl text-4xl font-black md:text-5xl">
                {t('trust.title')}
              </h2>
              <p className="muted mx-auto mt-5 max-w-3xl text-lg leading-8">{t('trust.desc')}</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {trustItems.map(([key, Icon], index) => (
              <Reveal key={key} delay={index * 0.04}>
                <article className="card h-full p-6">
                  <Icon className="text-[var(--gold)]" size={24} />
                  <h3 className="display mt-5 text-xl font-black">{t(`trust.items.${key}.title`)}</h3>
                  <p className="muted mt-3 text-sm leading-6">{t(`trust.items.${key}.desc`)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal>
            <article className="card h-full p-7 md:p-10">
              <div className="eyebrow">{t('founder.eyebrow')}</div>
              <h2 className="display mt-4 text-4xl font-black md:text-5xl">{t('founder.title')}</h2>
              <p className="muted mt-5 max-w-3xl text-lg leading-8">{t('founder.desc')}</p>
              <Link href={`/${locale}/about`} className="btn btn-ghost mt-7">
                {t('founder.cta')}
                <ArrowRight size={17} />
              </Link>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="card relative h-full overflow-hidden p-7 md:p-10">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-[var(--primary)]">
                  <Rocket size={25} />
                </div>

                <div className="eyebrow mt-6">
                  <Sparkles size={14} />
                  {locale === 'hi' ? 'बिज़नेस ग्रोथ सिस्टम' : 'Built for Business Growth'}
                </div>

                <h3 className="display mt-4 text-3xl font-black leading-tight">
                  {locale === 'hi'
                    ? 'Automation जो आपके business के साथ आगे बढ़े'
                    : 'Automation that grows with your business'}
                </h3>

                <p className="muted mt-4 text-base leading-7">
                  {locale === 'hi'
                    ? 'एक छोटे workflow से शुरू करें और जरूरत के अनुसार ERP, CRM, reporting, integrations और AI automation तक scale करें।'
                    : 'Start with one workflow and scale into ERP, CRM, reporting, integrations and AI automation as your operations grow.'}
                </p>

                <div className="mt-7 grid grid-cols-3 gap-3">
                  {[
                    [locale === 'hi' ? 'मॉड्यूलर' : 'Modular', Layers3],
                    [locale === 'hi' ? 'स्केलेबल' : 'Scalable', Gauge],
                    [locale === 'hi' ? 'कनेक्टेड' : 'Connected', Network]
                  ].map(([label, Icon]) => {
                    const FeatureIcon = Icon as typeof Layers3;
                    return (
                      <div key={String(label)} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/75 p-3 text-center shadow-sm">
                        <FeatureIcon className="mx-auto text-[var(--primary)]" size={19} />
                        <div className="mt-2 text-xs font-extrabold">{String(label)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <FAQSection />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="card relative overflow-hidden p-8 text-center md:p-14">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-amber-500/10" />
              <div className="relative">
                <div className="eyebrow">
                  <Sparkles size={15} />
                  {t('final.badge')}
                </div>
                <h2 className="display mx-auto mt-5 max-w-4xl text-4xl font-black md:text-5xl">
                  {t('final.title')}
                </h2>
                <p className="muted mx-auto mt-5 max-w-3xl text-lg leading-8">{t('final.desc')}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link href={`/${locale}/contact`} className="btn btn-gold">
                    {t('final.primary')}
                    <ArrowRight size={18} />
                  </Link>
                  <Link href={`/${locale}/portfolio`} className="btn btn-ghost">
                    {t('final.secondary')}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
