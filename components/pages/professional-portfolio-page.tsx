'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowRight, MonitorPlay, Sparkles} from 'lucide-react';
import {portfolioProjects} from '@/data/portfolio';
import {PortfolioPreview} from '@/components/portfolio-preview';
import {Reveal} from '@/components/reveal';

export function ProfessionalPortfolioPage() {
  const locale = useLocale() as 'en' | 'hi';
  const t = useTranslations('portfolioPro');

  return (
    <main>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="container text-center">
          <Reveal>
            <div className="eyebrow">
              <Sparkles size={15} />
              {t('eyebrow')}
            </div>
            <h1 className="display mx-auto mt-5 max-w-5xl">
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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {portfolioProjects.map((project, index) => (
              <Reveal key={project.slug} delay={Math.min(index * .04, .2)}>
                <article className="card sm-portfolio-card flex h-full flex-col">
                  <PortfolioPreview slug={project.slug} />

                  <div className="flex flex-1 flex-col p-6">
                    <div className="eyebrow">{project.category[locale]}</div>

                    <h2 className="display mt-4 text-2xl">
                      {project.name[locale]}
                    </h2>

                    <p className="muted mt-3 text-sm leading-7">
                      {project.shortDescription[locale]}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)]/55 px-3 py-1 text-[11px] font-extrabold"
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
                        {t('view')}
                      </Link>

                      <a href={project.demoUrl} className="btn btn-primary">
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
            <div className="card mt-12 p-8 text-center md:p-12">
              <h2 className="display mx-auto max-w-4xl">
                {t('customTitle')}
              </h2>
              <p className="muted mx-auto mt-4 max-w-3xl text-lg leading-8">
                {t('customDesc')}
              </p>
              <Link href={`/${locale}/contact`} className="btn btn-gold mt-7">
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
