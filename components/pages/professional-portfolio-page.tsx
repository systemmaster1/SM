'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowRight,
  BadgeCheck,
  MonitorPlay,
  Sparkles
} from 'lucide-react';
import {portfolioProjects} from '@/data/portfolio';
import {PortfolioPreview} from '@/components/portfolio-preview';
import {Reveal} from '@/components/reveal';

export function ProfessionalPortfolioPage() {
  const locale = useLocale() as 'en' | 'hi';
  const t = useTranslations('portfolioPro');

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

              <div className="mt-7 flex flex-wrap justify-center gap-2">
                <span className="sm-chip"><BadgeCheck size={14} /> ERP & CRM</span>
                <span className="sm-chip"><BadgeCheck size={14} /> FMS</span>
                <span className="sm-chip"><BadgeCheck size={14} /> IMS</span>
                <span className="sm-chip"><BadgeCheck size={14} /> PMS</span>
                <span className="sm-chip"><BadgeCheck size={14} /> Analytics</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-3">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {portfolioProjects.map((project, index) => (
              <Reveal key={project.slug} delay={Math.min(index * .04, .2)}>
                <article className="card sm-portfolio-card flex h-full flex-col overflow-hidden">
                  <PortfolioPreview slug={project.slug} />

                  <div className="flex flex-1 flex-col p-6">
                    <div className="text-xs font-extrabold uppercase tracking-[.12em] text-[var(--gold-strong)]">
                      {project.category[locale]}
                    </div>

                    <h2 className="display mt-3 text-2xl leading-tight">
                      {project.name[locale]}
                    </h2>

                    <p className="muted mt-3 text-sm leading-7">
                      {project.shortDescription[locale]}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="sm-chip">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto grid gap-2 pt-7 sm:grid-cols-2">
                      <Link
                        href={`/${locale}/portfolio/${project.slug}`}
                        className="btn btn-ghost"
                      >
                        {t('view')}
                        <ArrowRight size={16} />
                      </Link>

                      <a
                        href={project.demoUrl}
                        className="btn btn-primary"
                        aria-label={`${t('demo')} — ${project.name[locale]}`}
                      >
                        <MonitorPlay size={17} />
                        {t('demo')}
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="card mt-12 grid items-center gap-7 p-8 md:p-11 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl">
                <div className="eyebrow">
                  <Sparkles size={15} />
                  SystemMaster Custom Development
                </div>
                <h2 className="display mt-4 text-3xl md:text-5xl">
                  {t('customTitle')}
                </h2>
                <p className="muted mt-4 text-lg leading-8">
                  {t('customDesc')}
                </p>
              </div>
              <Link href={`/${locale}/contact`} className="btn btn-gold">
                {t('customCta')}
                <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
