'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {
  ArrowRight,
  Check,
  Code2,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import type {Locale, ServiceDetail} from '@/data/catalog';
import {Reveal} from '@/components/reveal';

export function ServiceDetailPage({
  service,
  locale
}: {
  service: ServiceDetail;
  locale: Locale;
}) {
  const hi = locale === 'hi';
  const t = {
    eyebrow: hi ? 'कस्टम सॉफ्टवेयर डेवलपमेंट' : 'Custom Software Development',
    cta: hi ? 'फ्री कंसल्टेशन बुक करें' : 'Book Free Consultation',
    deliver: hi ? 'हम क्या डिलीवर करते हैं' : 'What We Deliver',
    stack: hi ? 'टेक्नोलॉजी और आर्किटेक्चर' : 'Technology & Architecture',
    stackDesc: hi
      ? 'शुरुआत से ही production-ready architecture, role-based access, clean code, secure integration और deployment support को ध्यान में रखा जाता है।'
      : 'Production-ready architecture, role-based access, clean code, secure integrations and deployment support are considered from the start.',
    ideal: hi ? 'यह समाधान किसके लिए है' : 'Who This Is For',
    process: hi ? 'हमारा डेवलपमेंट प्रोसेस' : 'Our Development Process',
    final: hi
      ? 'अपना वर्कफ़्लो बताइए — हम सही solution design करेंगे।'
      : 'Tell us your workflow. We will design the right solution.',
    talk: hi ? 'प्रोजेक्ट पर चर्चा करें' : 'Discuss Your Project'
  };

  const process = hi
    ? ['जरूरत समझना', 'वर्कफ़्लो मैपिंग', 'UI/UX और आर्किटेक्चर', 'डेवलपमेंट और टेस्टिंग', 'डिप्लॉयमेंट और सपोर्ट']
    : ['Requirement Discovery', 'Workflow Mapping', 'UI/UX & Architecture', 'Development & Testing', 'Deployment & Support'];

  return (
    <main>
      <section className="sm-page-hero relative overflow-hidden">
        <div className="container">
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            className="sm-page-hero__inner"
          >
            <div className="eyebrow">
              <Sparkles size={15} />
              {t.eyebrow}
            </div>
            <h1 className="display sm-page-hero__title">{service.name[locale]}</h1>
            <p className="mx-auto mt-5 max-w-3xl text-xl font-extrabold leading-8">
              {service.tagline[locale]}
            </p>
            <p className="sm-page-hero__desc mt-3">{service.description[locale]}</p>
            <Link href={`/${locale}/contact`} className="btn btn-gold mt-8">
              {t.cta}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section pt-3">
        <div className="container grid gap-7 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-7 md:p-8">
              <Layers3 className="text-[var(--primary)]" size={30} />
              <h2 className="display mt-5 text-3xl">{t.deliver}</h2>
              <div className="sm-detail-list mt-7">
                {service.deliverables.map((x) => (
                  <div key={x.en} className="sm-detail-list-item">
                    <Check
                      className="mt-0.5 shrink-0 text-emerald-500"
                      size={18}
                    />
                    <span>{x[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={.07}>
            <div className="card h-full p-7 md:p-8">
              <Code2 className="text-[var(--gold)]" size={30} />
              <h2 className="display mt-5 text-3xl">{t.stack}</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {service.stack.map((x) => (
                  <span key={x} className="sm-chip">
                    {x}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)]/50 p-5">
                <ShieldCheck className="shrink-0 text-emerald-500" />
                <p className="muted leading-7">{t.stackDesc}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sm-section-heading center">
              <h2 className="display">{t.ideal}</h2>
            </div>
          </Reveal>
          <div className="grid-4 mt-9">
            {service.idealFor.map((x, i) => (
              <Reveal key={x.en} delay={i * .04}>
                <div className="card sm-marketing-card items-center justify-center text-center font-extrabold">
                  {x[locale]}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sm-section-heading center">
              <Rocket className="mx-auto text-[var(--gold)]" />
              <h2 className="display">{t.process}</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {process.map((x, i) => (
              <Reveal key={x} delay={i * .04}>
                <div className="card sm-marketing-card">
                  <div className="text-sm font-extrabold text-[var(--gold-strong)]">
                    0{i + 1}
                  </div>
                  <div className="mt-3 font-extrabold leading-6">{x}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container">
          <Reveal>
            <div className="card p-8 text-center md:p-11">
              <h2 className="display mx-auto max-w-4xl text-3xl md:text-5xl">
                {t.final}
              </h2>
              <Link href={`/${locale}/contact`} className="btn btn-primary mt-7">
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
