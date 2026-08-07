'use client';

import {useTranslations} from 'next-intl';
import {ChevronDown, HelpCircle} from 'lucide-react';
import {Reveal} from '@/components/reveal';

const faqKeys = [
  'ready',
  'custom',
  'difference',
  'ownership',
  'deployment',
  'mobile',
  'integration',
  'timeline',
  'support',
  'language'
] as const;

export function FAQSection() {
  const t = useTranslations('faq');

  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal>
          <div className="text-center">
            <div className="eyebrow">
              <HelpCircle size={15} />
              {t('eyebrow')}
            </div>
            <h2 className="display mx-auto mt-4 max-w-4xl text-4xl font-black md:text-5xl">
              {t('title')}
            </h2>
            <p className="muted mx-auto mt-5 max-w-3xl text-lg leading-8">{t('desc')}</p>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl gap-3">
          {faqKeys.map((key, index) => (
            <Reveal key={key} delay={Math.min(index * 0.025, 0.15)}>
              <details className="group card overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 font-extrabold md:p-6">
                  <span>{t(`items.${key}.q`)}</span>
                  <ChevronDown
                    size={19}
                    className="shrink-0 text-[var(--gold)] transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="border-t border-[var(--line)] px-5 pb-6 pt-5 md:px-6">
                  <p className="muted leading-7">{t(`items.${key}.a`)}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
