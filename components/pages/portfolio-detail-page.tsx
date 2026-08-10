'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers3,
  MonitorPlay,
  Sparkles,
  Target,
  Users2
} from 'lucide-react';
import type {PortfolioProject} from '@/data/portfolio';
import type {Locale} from '@/data/site';
import {Reveal} from '@/components/reveal';
import {PortfolioPreview} from '@/components/portfolio-preview';

export function PortfolioDetailPage({
  project,
  locale
}: {
  project: PortfolioProject;
  locale: Locale;
}) {
  const hi = locale === 'hi';

  const t = {
    back: hi ? 'पोर्टफोलियो पर वापस जाएँ' : 'Back to Portfolio',
    eyebrow: hi ? 'लाइव सिस्टम डेमो' : 'Live System Demo',
    open: hi ? 'लाइव डेमो खोलें' : 'Open Live Demo',
    consult: hi ? 'इसी तरह का सिस्टम बनवाएँ' : 'Build a Similar System',
    modules: hi ? 'डेमो में क्या शामिल है' : 'What This Demo Includes',
    highlights: hi ? 'मुख्य विशेषताएँ' : 'Key Highlights',
    ideal: hi ? 'किसके लिए उपयोगी' : 'Ideal For',
    tech: hi ? 'टेक्नोलॉजी / सिस्टम फोकस' : 'Technology / System Focus',
    note: hi
      ? 'यह एक प्रदर्शन डेमो है। आपके वास्तविक workflow, users, permissions, reports और integrations के अनुसार solution customize किया जा सकता है।'
      : 'This is a demonstration environment. Your production solution can be customized around your workflow, users, permissions, reports and integrations.'
  };

  return (
    <main>
      <section className="sm-detail-hero relative overflow-hidden">
        <div className="container">
          <Link
            href={`/${locale}/portfolio`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--muted)] transition hover:text-[var(--text)]"
          >
            <ArrowLeft size={16} />
            {t.back}
          </Link>

          <div className="sm-detail-hero__grid">
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
                {project.name[locale]}
              </motion.h1>

              <p className="mt-5 max-w-3xl text-xl font-extrabold leading-8">
                {project.shortDescription[locale]}
              </p>
              <p className="sm-detail-lead mt-4">{project.description[locale]}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={project.demoUrl} className="btn btn-gold">
                  <MonitorPlay size={18} />
                  {t.open}
                </a>
                <Link href={`/${locale}/contact`} className="btn btn-ghost">
                  {t.consult}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <motion.div
              initial={{opacity: 0, scale: .97}}
              animate={{opacity: 1, scale: 1}}
              className="card overflow-hidden"
            >
              <PortfolioPreview slug={project.slug} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container grid gap-7 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-7 md:p-8">
              <Layers3 className="text-[var(--primary)]" />
              <h2 className="display mt-4 text-3xl">{t.modules}</h2>
              <div className="sm-detail-list mt-6">
                {project.modules.map((x) => (
                  <div key={x.en} className="sm-detail-list-item">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    <span>{x[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={.07}>
            <div className="card h-full p-7 md:p-8">
              <Target className="text-[var(--gold)]" />
              <h2 className="display mt-4 text-3xl">{t.highlights}</h2>
              <div className="sm-detail-list mt-6">
                {project.highlights.map((x) => (
                  <div key={x.en} className="sm-detail-list-item">
                    <span>{x[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-7 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <div className="card h-full p-7 md:p-8">
              <Users2 className="text-[var(--gold)]" />
              <h2 className="display mt-4 text-3xl">{t.ideal}</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.idealFor.map((x) => (
                  <span key={x.en} className="sm-chip">
                    {x[locale]}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={.07}>
            <div className="card h-full p-7 md:p-8">
              <h2 className="display text-3xl">{t.tech}</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.technologies.map((x) => (
                  <span key={x} className="sm-chip text-[var(--primary)]">
                    {x}
                  </span>
                ))}
              </div>
              <p className="muted mt-7 leading-7">{t.note}</p>
              <Link href={`/${locale}/contact`} className="btn btn-primary mt-7">
                {t.consult}
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}


