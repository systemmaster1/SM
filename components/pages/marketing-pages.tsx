'use client';

import Image from 'next/image';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  Cloud,
  Code2,
  Factory,
  Globe2,
  HeartPulse,
  Laptop,
  MapPinned,
  MessageCircle,
  PackageCheck,
  Plane,
  Printer,
  Rocket,
  Smartphone,
  Sparkles,
  Users,
  Warehouse,
  Workflow,
  Wrench
} from 'lucide-react';
import {industries, pick, products, services} from '@/data/site';
import {portfolioProjects} from '@/data/portfolio';
import {Reveal} from '@/components/reveal';

type HeroNamespace =
  | 'productsPage'
  | 'servicesPage'
  | 'industriesPage'
  | 'portfolioPage'
  | 'pricingPage'
  | 'contactPage';

function Hero({ns}: {ns: HeroNamespace}) {
  const t = useTranslations(ns);

  return (
    <section className="sm-page-hero relative overflow-hidden">
      <div className="container">
        <div className="sm-page-hero__inner">
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            className="eyebrow"
          >
            <Sparkles size={15} />
            {t('eyebrow')}
          </motion.div>

          <motion.h1
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: .07}}
            className="display sm-page-hero__title"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: .14}}
            className="sm-page-hero__desc"
          >
            {t('desc')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export function ProductsPage() {
  const locale = useLocale();
  const t = useTranslations('productsPage');

  return (
    <main>
      <Hero ns="productsPage" />

      <section className="section pt-3">
        <div className="container">
          <div className="grid-3">
            {products.map((product, index) => (
              <Reveal key={product.key} delay={index * .06}>
                <article className="card sm-product-card">
                  <div className="sm-product-logo-area">
                    <Image
                      src={product.logo}
                      alt={product.name}
                      width={130}
                      height={90}
                      className="h-24 w-32 object-contain"
                    />
                    <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-[11px] font-extrabold text-emerald-600">
                      {t('ready')}
                    </span>
                  </div>

                  <h2 className="display mt-6 text-3xl">
                    <Link
                      href={`/${locale}/products/${product.key}`}
                      className="transition hover:text-[var(--primary)]"
                    >
                      {product.name}
                    </Link>
                  </h2>

                  <div className="mt-3 text-xl font-extrabold text-[var(--gold-strong)]">
                    {pick(product.price, locale)}
                  </div>

                  <ul className="sm-product-features text-base">
                    {product.features.map((feature) => (
                      <li key={feature.en} className="flex gap-3">
                        <Check
                          size={18}
                          className="mt-1 shrink-0 text-emerald-500"
                        />
                        {pick(feature, locale)}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto grid gap-2 pt-8 sm:grid-cols-[1fr_auto]">
                    <Link
                      href={`/${locale}/products/${product.key}`}
                      className="btn btn-primary"
                    >
                      {t('explore')}
                      <ArrowRight size={17} />
                    </Link>
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost"
                    >
                      {t('visit')}
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="card mt-12 grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] md:p-11">
              <div className="max-w-3xl">
                <div className="eyebrow">
                  <Wrench size={15} />
                  {t('customEyebrow')}
                </div>
                <h2 className="display mt-4 text-3xl md:text-5xl">
                  {t('customTitle')}
                </h2>
                <p className="muted mt-4 text-lg leading-8">{t('customDesc')}</p>
              </div>
              <Link href={`/${locale}/contact`} className="btn btn-gold">
                {t('talk')}
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

const serviceIcons = [
  Globe2,
  Laptop,
  Smartphone,
  Warehouse,
  Users,
  Workflow,
  MessageCircle,
  Cloud,
  BarChart3,
  Code2,
  Cloud,
  Rocket
];

export function ServicesPage() {
  const locale = useLocale();
  const t = useTranslations('servicesPage');

  return (
    <main>
      <Hero ns="servicesPage" />

      <section className="section pt-3">
        <div className="container">
          <div className="grid-3">
            {services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];

              return (
                <Reveal key={service.slug} delay={index * .035}>
                  <article className="card sm-marketing-card">
                    <div className="sm-marketing-card__icon">
                      <Icon size={22} />
                    </div>

                    <h2 className="sm-marketing-card__title">
                      <Link
                        href={`/${locale}/services/${service.slug}`}
                        className="transition hover:text-[var(--primary)]"
                      >
                        {pick(service.label, locale)}
                      </Link>
                    </h2>

                    <p className="sm-marketing-card__desc">{t('cardDesc')}</p>

                    <div className="sm-marketing-card__footer">
                      <Link
                        href={`/${locale}/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--primary)]"
                      >
                        {t('explore')}
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

const industryIcons = [
  Factory,
  PackageCheck,
  Printer,
  Warehouse,
  HeartPulse,
  Building2,
  Plane,
  MapPinned,
  Users,
  Warehouse,
  Workflow,
  BarChart3
];

export function IndustriesPage() {
  const locale = useLocale();
  const t = useTranslations('industriesPage');

  return (
    <main>
      <Hero ns="industriesPage" />

      <section className="section pt-3">
        <div className="container">
          <div className="grid-4">
            {industries.map((industry, index) => {
              const Icon = industryIcons[index % industryIcons.length];

              return (
                <Reveal key={industry.slug} delay={index * .03}>
                  <article className="card sm-marketing-card">
                    <Icon className="text-[var(--gold)]" size={25} />

                    <h2 className="sm-marketing-card__title text-xl">
                      {pick(industry.label, locale)}
                    </h2>

                    <p className="sm-marketing-card__desc text-sm">
                      {t('cardDesc')}
                    </p>

                    <div className="sm-marketing-card__footer">
                      <Link
                        href={`/${locale}/industries/${industry.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--primary)]"
                      >
                        {t('explore')}
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

/* Legacy exports retained for compatibility, although current live routes use
   ProfessionalPortfolioPage and ProfessionalPricingPage. */
export function PortfolioPage() {
  const locale = useLocale();
  const t = useTranslations('portfolioPage');

  return (
    <main>
      <Hero ns="portfolioPage" />
      <section className="section pt-3">
        <div className="container">
          <div className="grid-3">
            {portfolioProjects.map((project) => (
              <article key={project.slug} className="card sm-marketing-card">
                <BarChart3 className="text-[var(--primary)]" />
                <h2 className="sm-marketing-card__title">
                  {pick(project.name, locale)}
                </h2>
                <p className="sm-marketing-card__desc">
                  {pick(project.shortDescription, locale)}
                </p>
                <div className="sm-marketing-card__footer">
                  <Link
                    href={`/${locale}/portfolio/${project.slug}`}
                    className="btn btn-primary"
                  >
                    {t('viewProject')}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function PricingPage() {
  const locale = useLocale();
  const t = useTranslations('pricingPage');

  return (
    <main>
      <Hero ns="pricingPage" />
      <section className="section pt-3">
        <div className="container">
          <div className="grid-3">
            {products.map((product) => (
              <article key={product.key} className="card sm-price-card">
                <h2 className="display text-2xl">{product.name}</h2>
                <div className="sm-price mt-5 text-[var(--gold-strong)]">
                  {pick(product.price, locale)}
                </div>
                <div className="muted mt-2 text-sm">{t('monthlyNote')}</div>
                <Link
                  href={`/${locale}/products/${product.key}`}
                  className="btn btn-primary mt-auto w-full pt-0"
                >
                  {t('viewProduct')}
                  <ArrowRight size={17} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function ContactPage() {
  const t = useTranslations('contactPage');

  return (
    <main>
      <Hero ns="contactPage" />
      <section className="section pt-3">
        <div className="container">
          <div className="card p-8">
            <h2 className="display text-3xl">{t('contactTitle')}</h2>
          </div>
        </div>
      </section>
    </main>
  );
}
