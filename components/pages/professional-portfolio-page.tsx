'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowRight, MonitorPlay, Sparkles} from 'lucide-react';
import {portfolioProjects} from '@/data/portfolio';
import {Reveal} from '@/components/reveal';

function DemoPreview({index}: {index: number}) {
  return (
    <div className="sm-demo-preview">
      <motion.div
        className="sm-demo-window"
        initial={{opacity: 0, y: 14, scale: .97}}
        whileInView={{opacity: 1, y: 0, scale: 1}}
        viewport={{once: true}}
        transition={{duration: .5, delay: Math.min(index * .04, .2)}}
        whileHover={{y: -4, rotateX: 0}}
      >
        <div className="sm-demo-window__top">
          <span className="sm-demo-window__dot" />
          <span className="sm-demo-window__dot" style={{opacity: .45}} />
          <span className="sm-demo-window__dot" style={{opacity: .25}} />
        </div>
        <div className="sm-demo-window__body">
          <div className="sm-demo-kpis">
            <div className="sm-demo-kpi" />
            <div className="sm-demo-kpi" />
            <div className="sm-demo-kpi" />
          </div>
          <div className="sm-demo-chart" />
        </div>
        <div className="sm-demo-scan" />
      </motion.div>
    </div>
  );
}

export function ProfessionalPortfolioPage() {
  const locale = useLocale() as 'en' | 'hi';
  const t = useTranslations('portfolioPage');
  const hi = locale === 'hi';

  return (
    <main>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="container text-center">
          <Reveal>
            <div className="eyebrow">
              <Sparkles size={15} />
              {t('eyebrow')}
            </div>
            <h1 className="display mx-auto mt-5 max-w-5xl text-5xl md:text-7xl">
              {t('title')}
            </h1>
            <p className="muted mx-auto mt-6 max-w-3xl text-lg leading-8">
              {t('desc')}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container">
          <div className="grid-3">
            {portfolioProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * .04}>
                <article className="card group flex h-full flex-col overflow-hidden">
                  <DemoPreview index={index} />

                  <div className="flex flex-1 flex-col p-6">
                    <div className="eyebrow">{project.category[locale]}</div>

                    <h2 className="display mt-4 text-2xl font-black">
                      <Link
                        href={`/${locale}/portfolio/${project.slug}`}
                        className="transition hover:text-[var(--primary)]"
                      >
                        {project.name[locale]}
                      </Link>
                    </h2>

                    <p className="muted mt-3 text-sm leading-7">
                      {project.shortDescription[locale]}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] font-extrabold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto grid gap-2 pt-7 sm:grid-cols-2">
                      <Link
                        href={`/${locale}/portfolio/${project.slug}`}
                        className="btn btn-ghost"
                      >
                        {t('viewProject')}
                      </Link>

                      {/* Same-tab navigation by design. No target=_blank. */}
                      <a href={project.demoUrl} className="btn btn-primary">
                        <MonitorPlay size={17} />
                        {t('openDemo')}
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="card mt-12 p-8 text-center md:p-12">
            <h2 className="display text-3xl font-black md:text-4xl">
              {hi
                ? 'हर डेमो को आपके वास्तविक workflow के अनुसार customize किया जा सकता है'
                : 'Every demo can be tailored to your real business workflow'}
            </h2>
            <p className="muted mx-auto mt-4 max-w-3xl text-lg leading-8">
              {hi
                ? 'Users, permissions, reports, branches, approvals, integrations और mobile workflows आपके process के अनुसार configure किए जा सकते हैं।'
                : 'Users, permissions, reports, branches, approvals, integrations and mobile workflows can be configured around your process.'}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-gold mt-7">
              {hi ? 'अपनी requirement पर चर्चा करें' : 'Discuss Your Requirement'}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
