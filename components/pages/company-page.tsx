'use client';

import Image from 'next/image';
import Link from 'next/link';
import {motion, useScroll, useSpring} from 'framer-motion';
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
  Infinity as InfinityIcon,
  Lightbulb,
  Mail,
  MessageCircle,
  Network,
  Phone,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TestTube2,
  TrendingUp,
  Users,
  Workflow,
  Wrench
} from 'lucide-react';
import {
  companyContact,
  companyProcess,
  companyStats,
  companyTimeline,
  founderProgress,
  growthFlow,
  rndFlow,
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

const rndIcons = {
  research: Search,
  test: TestTube2,
  develop: Code2,
  implement: Wrench,
  measure: Gauge,
  improve: TrendingUp
} as const;

export function CompanyPage() {
  const locale = useLocale();
  const t = useTranslations('aboutPage');
  const {scrollYProgress} = useScroll();
  const journeyProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <main>
      {/* HERO */}
      <section className="sm-detail-hero relative overflow-hidden">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.04fr_.96fr]">
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
              className="display sm-detail-title"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .16}}
              className="sm-detail-lead"
            >
              {t('desc')}
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="btn btn-gold">
                {t('primary')}
                <ArrowRight size={18} />
              </Link>
              <Link href={`/${locale}/portfolio`} className="btn btn-ghost">
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
                  <div key={item.key} className="sm-about-stat">
                    <div className="display text-3xl font-black">{item.value}</div>
                    <div className="muted mt-2 text-sm">
                      {t(`stats.${item.key}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="section">
        <div className="container grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="card h-full p-7 md:p-10">
              <div className="eyebrow">{t('mission.eyebrow')}</div>
              <h2 className="display mt-4 sm-card-heading">
                {t('mission.title')}
              </h2>
              <p className="muted mt-5 text-lg leading-8">{t('mission.desc')}</p>
            </article>
          </Reveal>

          <Reveal delay={.08}>
            <article className="card h-full p-7 md:p-10">
              <div className="eyebrow">{t('vision.eyebrow')}</div>
              <h2 className="display mt-4 sm-card-heading">
                {t('vision.title')}
              </h2>
              <p className="muted mt-5 text-lg leading-8">{t('vision.desc')}</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sm-section-heading center">
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
                    <h3 className="display mt-5 text-xl font-black">
                      {t(`why.items.${key}.title`)}
                    </h3>
                    <p className="muted mt-3 text-sm leading-6">
                      {t(`why.items.${key}.desc`)}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sm-founder-shell">
              <div className="sm-founder-photo-wrap">
                <Image
                  src="/images/founder/sunil-tiwari-founder.png"
                  alt="Sunil Tiwari, Founder of SystemMaster Automations"
                  width={692}
                  height={1056}
                  className="sm-founder-photo"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                />
                <div className="sm-founder-photo-gradient" />
                <div className="sm-founder-photo-badge">
                  <span className="sm-founder-live-dot" />
                  {t('founder.badge')}
                </div>
              </div>

              <div className="sm-founder-content">
                <div className="eyebrow">{t('founder.eyebrow')}</div>
                <h2 className="display mt-5 sm-founder-name">
                  {companyContact.founder}
                </h2>
                <div className="mt-2 font-extrabold text-[var(--gold)]">
                  {t('founder.role')}
                </div>

                <h3 className="display mt-7 sm-founder-headline">
                  {t('founder.headline')}
                </h3>
                <p className="muted mt-4 text-lg leading-8">
                  {t('founder.desc')}
                </p>

                <blockquote className="sm-founder-quote">
                  “{t('founder.quote')}”
                </blockquote>

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
              </div>
            </div>
          </Reveal>

          <div className="sm-founder-progress-grid mt-6">
            {founderProgress.map((item, index) => (
              <Reveal key={item.year} delay={index * .035}>
                <div className="sm-founder-progress-card">
                  <span>{item.year}</span>
                  <strong>{t(`founder.progress.p${index + 1}`)}</strong>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="section sm-journey-section sm-section-tight">
        <motion.div
          className="sm-journey-scroll-progress"
          style={{scaleX: journeyProgress}}
        />
        <div className="container">
          <Reveal>
            <div className="sm-section-heading">
              <div className="eyebrow">{t('timeline.eyebrow')}</div>
              <h2 className="display mt-4 sm-journey-title max-w-5xl">
                {t('timeline.title')}
              </h2>
              <p className="muted mt-5 max-w-3xl text-lg leading-8">
                {t('timeline.desc')}
              </p>
            </div>
          </Reveal>

          <div className="sm-growth-timeline mt-12">
            <div className="sm-growth-line" aria-hidden="true" />
            {companyTimeline.map((item, index) => (
              <Reveal key={item.key} delay={index * .035}>
                <article className="sm-growth-item">
                  <div className="sm-growth-year-column">
                    <div className="sm-growth-dot" />
                    <span className="sm-growth-year">{item.year}</span>
                  </div>
                  <div className="card sm-growth-card">
                    <div className="sm-growth-phase">
                      {t(`timeline.items.${item.key}.phase`)}
                    </div>
                    <h3 className="display mt-3 sm-timeline-card-title">
                      {t(`timeline.items.${item.key}.title`)}
                    </h3>
                    <p className="muted mt-3 leading-7">
                      {t(`timeline.items.${item.key}.desc`)}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {(t.raw(`timeline.items.${item.key}.tags`) as string[]).map((tag) => (
                        <span key={tag} className="sm-chip">{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS LEARNING + R&D */}
      <section className="section sm-section-tight">
        <div className="container grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <Reveal>
            <article className="card h-full p-7 md:p-10">
              <div className="eyebrow">
                <Lightbulb size={15} />
                {t('learning.eyebrow')}
              </div>
              <h2 className="display mt-4 sm-card-heading">
                {t('learning.title')}
              </h2>
              <p className="muted mt-5 text-lg leading-8">
                {t('learning.desc')}
              </p>

              <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]/55 p-5">
                <div className="text-sm font-extrabold text-[var(--gold)]">
                  {t('learning.noteTitle')}
                </div>
                <p className="muted mt-2 text-sm leading-7">
                  {t('learning.note')}
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={.08}>
            <article className="card h-full p-7 md:p-10">
              <div className="eyebrow">
                <Search size={15} />
                {t('rnd.eyebrow')}
              </div>
              <h2 className="display mt-4 sm-card-heading">
                {t('rnd.title')}
              </h2>
              <p className="muted mt-5 text-lg leading-8">
                {t('rnd.desc')}
              </p>

              <div className="sm-rnd-flow mt-7">
                {rndFlow.map((key, index) => {
                  const Icon = rndIcons[key];
                  return (
                    <motion.div
                      key={key}
                      initial={{opacity: 0, y: 10}}
                      whileInView={{opacity: 1, y: 0}}
                      viewport={{once: true}}
                      transition={{delay: index * .055}}
                      className="sm-rnd-step"
                    >
                      <Icon size={17} />
                      <span>{t(`rnd.steps.${key}`)}</span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-7 rounded-2xl bg-blue-500/8 p-5 font-extrabold leading-7 text-[var(--text)]">
                {t('rnd.principle')}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* CLIENT CONTINUITY */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="card overflow-hidden p-8 md:p-12">
              <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
                <div>
                  <div className="eyebrow">
                    <Users size={15} />
                    {t('continuity.eyebrow')}
                  </div>
                  <h2 className="display mt-4 sm-section-title">
                    {t('continuity.title')}
                  </h2>
                  <p className="muted mt-5 text-lg leading-8">
                    {t('continuity.desc')}
                  </p>
                </div>

                <div className="sm-growth-flow">
                  {growthFlow.map((key, index) => (
                    <motion.div
                      key={key}
                      initial={{opacity: 0, x: 10}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{delay: index * .055}}
                      className="sm-growth-flow-step"
                    >
                      <span className="sm-growth-flow-number">{index + 1}</span>
                      <strong>{t(`continuity.steps.${key}`)}</strong>
                      {index < growthFlow.length - 1 ? (
                        <ArrowRight size={17} className="sm-growth-flow-arrow" />
                      ) : (
                        <InfinityIcon size={19} className="text-[var(--gold)]" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sm-section-heading center">
              <div className="eyebrow">{t('process.eyebrow')}</div>
              <h2 className="display mx-auto mt-4 max-w-4xl text-4xl font-black md:text-5xl">
                {t('process.title')}
              </h2>
            </div>
          </Reveal>

          <div className="sm-process-grid mt-10">
            {companyProcess.map((key, index) => (
              <Reveal key={key} delay={index * .04}>
                <article className="card h-full p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)] font-black text-[#211400]">
                    {index + 1}
                  </div>
                  <h3 className="display mt-5 text-xl font-black">
                    {t(`process.items.${key}.title`)}
                  </h3>
                  <p className="muted mt-3 text-sm leading-6">
                    {t(`process.items.${key}.desc`)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="eyebrow">{t('technology.eyebrow')}</div>
            <h2 className="display mt-4 max-w-4xl text-4xl font-black md:text-5xl">
              {t('technology.title')}
            </h2>
            <p className="muted mt-5 max-w-3xl text-lg">
              {t('technology.desc')}
            </p>
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

      {/* TRUST */}
      <section className="section">
        <div className="container">
          <Reveal>
            <article className="card p-7 md:p-10">
              <div className="eyebrow">{t('trust.eyebrow')}</div>
              <h2 className="display mt-4 sm-section-title">
                {t('trust.title')}
              </h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {trustKeys.map((key) => {
                  const Icon = trustIcons[key];
                  return (
                    <div
                      key={key}
                      className="flex gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]/50 p-4"
                    >
                      <Icon className="mt-0.5 shrink-0 text-emerald-500" size={19} />
                      <div className="text-sm font-bold leading-6">
                        {t(`trust.items.${key}`)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="card relative overflow-hidden p-8 text-center md:p-14">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-amber-500/10" />
              <div className="relative">
                <Rocket className="mx-auto text-[var(--gold)]" size={34} />
                <div className="eyebrow mt-5">{t('cta.eyebrow')}</div>
                <h2 className="display mx-auto mt-5 max-w-5xl sm-cta-title">
                  {t('cta.title')}
                </h2>
                <p className="muted mx-auto mt-5 max-w-3xl text-lg leading-8">
                  {t('cta.desc')}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link href={`/${locale}/contact`} className="btn btn-gold">
                    {t('cta.button')}
                    <ArrowRight size={18} />
                  </Link>
                  <Link href={`/${locale}/portfolio`} className="btn btn-ghost">
                    {t('cta.portfolio')}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
