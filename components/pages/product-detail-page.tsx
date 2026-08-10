'use client';

import Image from 'next/image';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import type {Locale, ProductDetail} from '@/data/catalog';
import {Reveal} from '@/components/reveal';

export function ProductDetailPage({
  product,
  locale
}: {
  product: ProductDetail;
  locale: Locale;
}) {
  const hi = locale === 'hi';
  const t = {
    ready: hi ? 'तुरंत उपलब्ध क्लाउड SaaS' : 'Ready-to-use Cloud SaaS',
    visit: hi ? 'प्रोडक्ट खोलें' : 'Visit Product',
    demo: hi ? 'फ्री डेमो बुक करें' : 'Book a Free Demo',
    highlights: hi ? 'मुख्य फायदे' : 'Key Highlights',
    modules: hi ? 'मुख्य मॉड्यूल' : 'Core Modules',
    ideal: hi ? 'किसके लिए उपयुक्त' : 'Ideal For',
    customEyebrow: hi ? 'कस्टम डेवलपमेंट' : 'Custom Development',
    custom: hi
      ? 'आपके वर्कफ़्लो के अनुसार कस्टमाइज़ेशन चाहिए?'
      : 'Need customization around your workflow?',
    customDesc: hi
      ? 'SystemMaster आपके मॉड्यूल, अप्रूवल, रिपोर्ट, इंटीग्रेशन और रोल को बिजनेस आवश्यकता के अनुसार कस्टमाइज़ कर सकता है।'
      : 'SystemMaster can customize modules, approvals, reports, integrations and roles around your business requirements.',
    talk: hi ? 'कस्टमाइज़ेशन पर बात करें' : 'Discuss Customization',
    trust: hi
      ? 'SystemMaster द्वारा विकसित और समर्थित'
      : 'Built & supported by SystemMaster'
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
              {t.ready}
            </motion.div>

            <motion.h1
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .06}}
              className="display sm-detail-title"
            >
              {product.name}
            </motion.h1>

            <motion.p
              initial={{opacity: 0, y: 14}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .12}}
              className="sm-detail-lead"
            >
              {product.tagline[locale]}
            </motion.p>

            <div className="mt-7">
              <div className="text-3xl font-extrabold text-[var(--gold-strong)]">
                {product.price}
              </div>
              <div className="muted mt-1 text-sm">{product.priceNote[locale]}</div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                {t.visit}
                <ExternalLink size={17} />
              </a>
              <Link href={`/${locale}/contact`} className="btn btn-gold">
                {t.demo}
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <motion.div
            initial={{opacity: 0, scale: .96, x: 16}}
            animate={{opacity: 1, scale: 1, x: 0}}
            className={`card relative flex min-h-[390px] items-center justify-center overflow-hidden bg-gradient-to-br ${product.accent} p-9`}
          >
            <Image
              src={product.logo}
              alt={product.name}
              width={360}
              height={250}
              priority
              className="relative z-10 max-h-60 w-full object-contain"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/90 p-4 backdrop-blur-xl">
              <ShieldCheck className="shrink-0 text-emerald-500" />
              <span className="font-extrabold">{t.trust}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container">
          <Reveal>
            <div className="sm-section-heading center">
              <div className="eyebrow">
                <BadgeCheck size={15} />
                {t.highlights}
              </div>
              <p className="text-lg">{product.description[locale]}</p>
            </div>
          </Reveal>

          <div className="grid-4 mt-10">
            {product.highlights.map((item, i) => (
              <Reveal key={item.en} delay={i * .05}>
                <article className="card sm-marketing-card">
                  <Check className="text-emerald-500" />
                  <p className="mt-4 font-extrabold leading-7">
                    {item[locale]}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-7 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-7 md:p-8">
              <h2 className="display text-3xl">{t.modules}</h2>
              <div className="sm-detail-list mt-7">
                {product.modules.map((x) => (
                  <div key={x.en} className="sm-detail-list-item">
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-[var(--primary)]"
                    />
                    <span>{x[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={.07}>
            <div className="card h-full p-7 md:p-8">
              <h2 className="display text-3xl">{t.ideal}</h2>
              <div className="mt-7 flex flex-wrap gap-3">
                {product.idealFor.map((x) => (
                  <span key={x.en} className="sm-chip">
                    {x[locale]}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container">
          <Reveal>
            <div className="card grid items-center gap-8 p-8 md:p-11 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl">
                <div className="eyebrow">
                  <Sparkles size={15} />
                  {t.customEyebrow}
                </div>
                <h2 className="display mt-4 text-3xl md:text-5xl">{t.custom}</h2>
                <p className="muted mt-4 text-lg leading-8">{t.customDesc}</p>
              </div>
              <Link href={`/${locale}/contact`} className="btn btn-gold">
                {t.talk}
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
