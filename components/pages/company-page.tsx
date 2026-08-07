'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  Mail,
  MessageCircle,
  Network,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow
} from 'lucide-react';
import {
  companyContact,
  companyProcess,
  companyStats,
  companyTimeline,
  technologyStack,
  trustKeys,
  whyKeys
} from '@/data/company';
import {Reveal} from '@/components/reveal';

const whyIcons = {
  architecture: Blocks,
  workflow: Workflow,
  automation: Bot,
  support: Users
} as const;

const trustIcons = {
  source: Code2,
  security: ShieldCheck,
  responsive: Gauge,
  cloud: Cloud,
  integration: Network,
  documentation: Database
} as const;

export function CompanyPage() {
  const locale = useLocale();
  const t = useTranslations('aboutPage');

  return (
    <main>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <motion.div
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              className="eyebrow"
            >
              <Sparkles size={15} />
              {t('eyebrow')}
            </motion.div>

            <motion.h1
              initial={{opacity: 0, y: 22}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .08}}
              className="display mt-5 text-[clamp(2.8rem,6vw,5.4rem)] font-black"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .16}}
              className="muted mt-7 max-w-3xl text-lg leading-8"
            >
              {t('desc')}
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="btn btn-gold">
                {t('primary')}
                <ArrowRight size={18} />
              </Link>
              <Link href={`/${locale}/products`} className="btn btn-ghost">
                {t('secondary')}
              </Link>
            </div>
          </div>

          <motion.div
            initial={{opacity: 0, scale: .96, x: 24}}
            animate={{opacity: 1, scale: 1, x: 0}}
            transition={{duration: .75}}
            className="card relative overflow-hidden p-8 md:p-10"
          >
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="relative">
              <Image
                src="/logo/systemmaster.png"
                alt="SystemMaster Automations"
                width={260}
                height={180}
                className="h-28 w-auto object-contain"
                priority
              />
              <div className="mt-8 grid grid-cols-2 gap-3">
                {companyStats.map((item) => (
                  <div
                    key={item.key}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]/60 p-5"
                  >
                    <div className="display text-3xl font-black">{item.value}</div>
                    <div className="muted mt-2 text-sm">{t(`stats.${item.key}`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="card h-full p-7 md:p-10">
              <div className="eyebrow">{t('mission.eyebrow')}</div>
              <h2 className="display mt-4 text-3xl font-black md:text-4xl">{t('mission.title')}</h2>
              <p className="muted mt-5 text-lg leading-8">{t('mission.desc')}</p>
            </article>
          </Reveal>

          <Reveal delay={.08}>
            <article className="card h-full p-7 md:p-10">
              <div className="eyebrow">{t('vision.eyebrow')}</div>
              <h2 className="display mt-4 text-3xl font-black md:text-4xl">{t('vision.title')}</h2>
              <p className="muted mt-5 text-lg leading-8">{t('vision.desc')}</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="text-center">
              <div className="eyebrow">{t('why.eyebrow')}</div>
              <h2 className="display mx-auto mt-4 max-w-4xl text-4xl font-black md:text-5xl">
                {t('why.title')}
              </h2>
            </div>
          </Reveal>

          <div className="grid-4 mt-10">
            {whyKeys.map((key, index) => {
              const Icon = whyIcons[key];
              return (
                <Reveal key={key} delay={index * .05}>
                  <article className="card h-full p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-[var(--primary)]">
                      <Icon size={22} />
                    </div>
                    <h3 className="display mt-5 text-xl font-black">{t(`why.items.${key}.title`)}</h3>
                    <p className="muted mt-3 text-sm leading-6">{t(`why.items.${key}.desc`)}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="eyebrow">{t('timeline.eyebrow')}</div>
            <h2 className="display mt-4 max-w-4xl text-4xl font-black md:text-5xl">{t('timeline.title')}</h2>
          </Reveal>

          <div className="mt-10 grid gap-4">
            {companyTimeline.map((item, index) => (
              <Reveal key={item.key} delay={index * .04}>
                <article className="card grid gap-4 p-6 md:grid-cols-[130px_1fr] md:items-center">
                  <div className="display text-2xl font-black text-[var(--gold)]">{item.year}</div>
                  <div>
                    <h3 className="display text-xl font-black">{t(`timeline.items.${item.key}.title`)}</h3>
                    <p className="muted mt-2 leading-7">{t(`timeline.items.${item.key}.desc`)}</p>
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
            <div className="text-center">
              <div className="eyebrow">{t('process.eyebrow')}</div>
              <h2 className="display mx-auto mt-4 max-w-4xl text-4xl font-black md:text-5xl">
                {t('process.title')}
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {companyProcess.map((key, index) => (
              <Reveal key={key} delay={index * .04}>
                <article className="card h-full p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)] font-black text-[#211400]">
                    {index + 1}
                  </div>
                  <h3 className="display mt-5 text-xl font-black">{t(`process.items.${key}.title`)}</h3>
                  <p className="muted mt-3 text-sm leading-6">{t(`process.items.${key}.desc`)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="eyebrow">{t('technology.eyebrow')}</div>
            <h2 className="display mt-4 max-w-4xl text-4xl font-black md:text-5xl">{t('technology.title')}</h2>
            <p className="muted mt-5 max-w-3xl text-lg">{t('technology.desc')}</p>
          </Reveal>

          <div className="mt-9 flex flex-wrap gap-3">
            {technologyStack.map((name, index) => (
              <motion.div
                key={name}
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: index * .025}}
                className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-extrabold"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <article className="card h-full p-7 md:p-10">
              <div className="eyebrow">{t('founder.eyebrow')}</div>
              <h2 className="display mt-4 text-4xl font-black">{companyContact.founder}</h2>
              <div className="mt-2 font-extrabold text-[var(--gold)]">{t('founder.role')}</div>
              <p className="muted mt-5 text-lg leading-8">{t('founder.desc')}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                <a className="btn btn-ghost !min-h-11" href={companyContact.emailHref}>
                  <Mail size={17} />
                  {t('founder.email')}
                </a>
                <a className="btn btn-ghost !min-h-11" href={companyContact.phoneHref}>
                  <Phone size={17} />
                  {t('founder.call')}
                </a>
                <a
                  className="btn btn-ghost !min-h-11"
                  href={companyContact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={17} />
                  {t('founder.whatsapp')}
                </a>
              </div>
            </article>
          </Reveal>

          <Reveal delay={.08}>
            <article className="card h-full p-7 md:p-10">
              <div className="eyebrow">{t('trust.eyebrow')}</div>
              <h2 className="display mt-4 text-4xl font-black">{t('trust.title')}</h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {trustKeys.map((key) => {
                  const Icon = trustIcons[key];
                  return (
                    <div
                      key={key}
                      className="flex gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]/50 p-4"
                    >
                      <Icon className="mt-0.5 shrink-0 text-emerald-500" size={19} />
                      <div className="text-sm font-bold leading-6">{t(`trust.items.${key}`)}</div>
                    </div>
                  );
                })}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="card relative overflow-hidden p-8 text-center md:p-14">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-amber-500/10" />
              <div className="relative">
                <Rocket className="mx-auto text-[var(--gold)]" size={34} />
                <h2 className="display mx-auto mt-5 max-w-4xl text-4xl font-black md:text-5xl">
                  {t('cta.title')}
                </h2>
                <p className="muted mx-auto mt-5 max-w-3xl text-lg leading-8">{t('cta.desc')}</p>
                <Link href={`/${locale}/contact`} className="btn btn-gold mt-8">
                  {t('cta.button')}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
