'use client';

import {FormEvent, useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  Mail,
  MessageCircle,
  PackageCheck,
  Phone,
  Send,
  Settings2,
  Sparkles
} from 'lucide-react';
import {Reveal} from '@/components/reveal';

type FormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  interest: string;
  budget: string;
  requirement: string;
};

const initialForm: FormState = {
  name: '',
  company: '',
  phone: '',
  email: '',
  interest: '',
  budget: 'discuss',
  requirement: ''
};

const interestKeys = [
  'books',
  'hrms',
  'erp',
  'website',
  'mobile',
  'customErp',
  'automation',
  'whatsapp',
  'other'
] as const;

const budgetKeys = ['discuss', 'under50', '50to100', '100to300', '300plus'] as const;

export function ContactConversionPage() {
  const locale = useLocale();
  const t = useTranslations('contactLead');
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState('');

  const interestLabel = useMemo(
    () => (form.interest ? t(`interests.${form.interest}` as never) : '-'),
    [form.interest, t]
  );

  const budgetLabel = useMemo(
    () => t(`budgets.${form.budget}` as never),
    [form.budget, t]
  );

  const message = useMemo(
    () =>
      [
        'Hello SystemMaster,',
        '',
        `Name: ${form.name || '-'}`,
        `Company: ${form.company || '-'}`,
        `Phone: ${form.phone || '-'}`,
        `Email: ${form.email || '-'}`,
        `Interest: ${interestLabel}`,
        `Budget: ${budgetLabel}`,
        '',
        'Requirement:',
        form.requirement || '-',
        '',
        `Website language: ${locale.toUpperCase()}`
      ].join('\n'),
    [form, interestLabel, budgetLabel, locale]
  );

  const validate = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.requirement.trim()) {
      setError(t('required'));
      return false;
    }
    setError('');
    return true;
  };

  const submitWhatsApp = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    window.open(
      `https://wa.me/919027965956?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const submitEmail = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(
      `New enquiry from ${form.name}${form.company ? ` - ${form.company}` : ''}`
    );
    window.location.href =
      `mailto:Connect@systemmaster.in?subject=${subject}&body=${encodeURIComponent(message)}`;
  };

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({...current, [key]: value}));
    if (error) setError('');
  };

  const choices = [
    ['readyTitle', 'readyDesc', PackageCheck],
    ['customTitle', 'customDesc', Settings2],
    ['supportTitle', 'supportDesc', Headphones]
  ] as const;

  return (
    <main>
      <section className="sm-detail-hero relative overflow-hidden">
        <div className="container sm-detail-hero__grid">
          <Reveal>
            <div>
              <div className="eyebrow">
                <Sparkles size={15} />
                {t('eyebrow')}
              </div>
              <h1 className="display sm-detail-title">{t('title')}</h1>
              <p className="sm-detail-lead">{t('desc')}</p>
            </div>
          </Reveal>

          <Reveal delay={.06}>
            <aside className="card p-6 md:p-7">
              <h2 className="display text-2xl">{t('quickTitle')}</h2>
              <div className="mt-5 grid gap-3">
                {choices.map(([titleKey, descKey, Icon]) => (
                  <div key={titleKey} className="sm-contact-choice">
                    <div className="sm-contact-choice__icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold">{t(titleKey)}</h3>
                      <p className="muted mt-1.5 text-sm leading-6">{t(descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container grid items-start gap-7 lg:grid-cols-[.72fr_1.28fr]">
          <div className="grid gap-5">
            <Reveal>
              <article className="card p-7">
                <h2 className="display text-2xl">{t('responseTitle')}</h2>
                <div className="mt-5 grid gap-4">
                  {(['one', 'two', 'three'] as const).map((key) => (
                    <div key={key} className="flex gap-3">
                      <CheckCircle2
                        className="mt-1 shrink-0 text-emerald-500"
                        size={18}
                      />
                      <p className="muted text-sm leading-7">
                        {t(`responseItems.${key}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal delay={.04}>
              <article className="card p-7">
                <h2 className="display text-2xl">{t('directTitle')}</h2>
                <div className="mt-5 grid gap-3">
                  <a href="tel:+919027965956" className="btn btn-ghost justify-start">
                    <Phone size={17} />
                    {t('call')}: +91 90279 65956
                  </a>
                  <a
                    href="mailto:Connect@systemmaster.in"
                    className="btn btn-ghost justify-start"
                  >
                    <Mail size={17} />
                    {t('emailAction')}: Connect@systemmaster.in
                  </a>
                  <a
                    href="https://wa.me/919027965956"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost justify-start"
                  >
                    <MessageCircle size={17} />
                    {t('whatsappAction')}
                  </a>
                </div>
                <p className="muted mt-5 text-sm leading-6">{t('location')}</p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={.06}>
            <form onSubmit={submitWhatsApp} className="card p-7 md:p-9">
              <h2 className="display text-3xl">{t('formTitle')}</h2>
              <p className="muted mt-3 max-w-2xl leading-7">{t('formDesc')}</p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Field label={t('name')}>
                  <input
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="form-control"
                    autoComplete="name"
                  />
                </Field>
                <Field label={t('company')}>
                  <input
                    value={form.company}
                    onChange={(e) => update('company', e.target.value)}
                    className="form-control"
                    autoComplete="organization"
                  />
                </Field>
                <Field label={t('phone')}>
                  <input
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className="form-control"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </Field>
                <Field label={t('email')}>
                  <input
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="form-control"
                    type="email"
                    autoComplete="email"
                  />
                </Field>
                <Field label={t('interest')}>
                  <select
                    value={form.interest}
                    onChange={(e) => update('interest', e.target.value)}
                    className="form-control"
                  >
                    <option value="">{t('select')}</option>
                    {interestKeys.map((key) => (
                      <option key={key} value={key}>
                        {t(`interests.${key}`)}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t('budget')}>
                  <select
                    value={form.budget}
                    onChange={(e) => update('budget', e.target.value)}
                    className="form-control"
                  >
                    {budgetKeys.map((key) => (
                      <option key={key} value={key}>
                        {t(`budgets.${key}`)}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label={t('requirement')} className="mt-5">
                <textarea
                  rows={7}
                  value={form.requirement}
                  onChange={(e) => update('requirement', e.target.value)}
                  className="form-control resize-y"
                  placeholder={t('placeholder')}
                />
              </Field>

              {error ? (
                <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-bold text-red-500">
                  {error}
                </div>
              ) : null}

              <p className="muted mt-4 text-xs leading-5">{t('privacy')}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <motion.button
                  type="submit"
                  whileHover={{y: -2}}
                  whileTap={{scale: .985}}
                  className="btn btn-gold"
                >
                  <MessageCircle size={18} />
                  {t('whatsappButton')}
                  <ArrowRight size={17} />
                </motion.button>
                <button type="button" onClick={submitEmail} className="btn btn-ghost">
                  <Send size={17} />
                  {t('emailButton')}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  children,
  className = ''
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`grid gap-2 text-sm font-extrabold ${className}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}
