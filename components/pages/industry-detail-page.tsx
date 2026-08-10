'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  Layers3,
  Sparkles,
  Target
} from 'lucide-react';
import type {IndustryDetail} from '@/data/industries';
import type {Locale} from '@/data/catalog';
import {Reveal} from '@/components/reveal';

export function IndustryDetailPage({
  industry,
  locale
}: {
  industry: IndustryDetail;
  locale: Locale;
}) {
  const hi = locale === 'hi';
  const t = {
    eyebrow: hi ? 'इंडस्ट्री सॉल्यूशन' : 'Industry Solution',
    cta: hi ? 'अपनी requirement बताइए' : 'Discuss Your Requirement',
    problems: hi ? 'आम चुनौतियाँ' : 'Common Challenges',
    solutions: hi ? 'SystemMaster कैसे मदद करता है' : 'How SystemMaster Helps',
    modules: hi ? 'संभावित मॉड्यूल' : 'Suggested Modules',
    outcomes: hi ? 'बिजनेस आउटकम' : 'Business Outcomes',
    custom: hi
      ? 'हर implementation आपके process, users और reporting needs के अनुसार tailor किया जा सकता है।'
      : 'Every implementation can be tailored to your process, users and reporting requirements.'
  };

  return (
    <main>
      <section className="sm-detail-hero relative overflow-hidden">
        <div className="container sm-detail-hero__grid">
          <div>
            <motion.div
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              className="eyebrow"
            >
              <Sparkles size={15} />
              {t.eyebrow}
            </motion.div>

            <motion.h1
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .06}}
              className="display sm-detail-title"
            >
              {industry.name[locale]}
            </motion.h1>

            <motion.p
              initial={{opacity: 0, y: 14}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .12}}
              className="mt-5 max-w-2xl text-xl font-extrabold leading-8"
            >
              {industry.tagline[locale]}
            </motion.p>

            <motion.p
              initial={{opacity: 0, y: 14}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .17}}
              className="sm-detail-lead mt-4"
            >
              {industry.description[locale]}
            </motion.p>

            <Link href={`/${locale}/contact`} className="btn btn-gold mt-8">
              {t.cta}
              <ArrowRight size={18} />
            </Link>
          </div>

          <motion.div
            initial={{opacity: 0, scale: .96}}
            animate={{opacity: 1, scale: 1}}
            className="card relative flex min-h-[360px] items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/12 via-transparent to-amber-400/12" />
            <div className="relative grid h-44 w-44 place-items-center rounded-[38px] border border-[var(--line)] bg-[var(--surface)]/80 shadow-xl backdrop-blur">
              <Factory size={82} className="text-[var(--gold)]" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container grid gap-7 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-7 md:p-8">
              <Target className="text-[var(--gold)]" />
              <h2 className="display mt-4 text-3xl">{t.problems}</h2>
              <div className="sm-detail-list mt-6">
                {industry.problems.map((x) => (
                  <div key={x.en} className="sm-detail-list-item">
                    <span>{x[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={.07}>
            <div className="card h-full p-7 md:p-8">
              <CheckCircle2 className="text-emerald-500" />
              <h2 className="display mt-4 text-3xl">{t.solutions}</h2>
              <div className="sm-detail-list mt-6">
                {industry.solutions.map((x) => (
                  <div key={x.en} className="sm-detail-list-item">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    <span>{x[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sm-section-heading center">
              <Layers3 className="mx-auto text-[var(--primary)]" />
              <h2 className="display">{t.modules}</h2>
            </div>
          </Reveal>
          <div className="grid-3 mt-9">
            {industry.modules.map((x, i) => (
              <Reveal key={x.en} delay={i * .04}>
                <div className="card sm-marketing-card items-center justify-center text-center font-extrabold">
                  {x[locale]}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container">
          <Reveal>
            <div className="card p-8 md:p-11">
              <div className="sm-section-heading">
                <h2 className="display">{t.outcomes}</h2>
              </div>
              <div className="grid-4 mt-8">
                {industry.outcomes.map((x) => (
                  <div key={x.en} className="sm-detail-list-item">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    <span>{x[locale]}</span>
                  </div>
                ))}
              </div>
              <p className="muted mt-8 max-w-3xl text-lg leading-8">{t.custom}</p>
              <Link href={`/${locale}/contact`} className="btn btn-primary mt-6">
                {t.cta}
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
