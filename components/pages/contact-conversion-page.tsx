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

const budgetKeys = [
  'discuss',
  'under50',
  '50to100',
  '100to300',
  '300plus'
] as const;

export function ContactConversionPage() {
  const locale = useLocale();
  const t = useTranslations('contactLead');
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState('');

  const interestLabel = useMemo(() => {
    if (!form.interest) return '-';
    return t(`interests.${form.interest}` as never);
  }, [form.interest, t]);

  const budgetLabel = useMemo(
    () => t(`budgets.${form.budget}` as never),
    [form.budget, t]
  );

  const message = useMemo(() => {
    return [
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
    ].join('\n');
  }, [form, interestLabel, budgetLabel, locale]);

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
    const url = `https://wa.me/919027965956?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const submitEmail = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(
      `New enquiry from ${form.name}${form.company ? ` - ${form.company}` : ''}`
    );
    const body = encodeURIComponent(message);
    window.location.href = `mailto:Connect@systemmaster.in?subject=${subject}&body=${body}`;
  };

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({...current, [key]: value}));
    if (error) setError('');
  };

  return (
    <main>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="container grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <div>
              <div className="eyebrow">
                <Sparkles size={15} />
                {t('eyebrow')}
              </div>
              <h1 className="display mt-5 max-w-5xl text-[clamp(2.8rem,6vw,5.2rem)] font-black">
                {t('title')}
              </h1>
              <p className="muted mt-6 max-w-3xl text-lg leading-8">{t('desc')}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card p-6 md:p-8">
              <h2 className="display text-2xl font-black">{t('quickTitle')}</h2>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <div className="flex gap-4">
                    <PackageCheck className="mt-1 shrink-0 text-emerald-500" size={22} />
                    <div>
                      <h3 className="font-extrabold">{t('readyTitle')}</h3>
                      <p className="muted mt-2 text-sm leading-6">{t('readyDesc')}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
                  <div className="flex gap-4">
                    <Settings2 className="mt-1 shrink-0 text-[var(--primary)]" size={22} />
                    <div>
                      <h3 className="font-extrabold">{t('customTitle')}</h3>
                      <p className="muted mt-2 text-sm leading-6">{t('customDesc')}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                  <div className="flex gap-4">
                    <Headphones className="mt-1 shrink-0 text-[var(--gold)]" size={22} />
                    <div>
                      <h3 className="font-extrabold">{t('supportTitle')}</h3>
                      <p className="muted mt-2 text-sm leading-6">{t('supportDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div className="grid content-start gap-6">
            <Reveal>
              <article className="card p-7">
                <h2 className="display text-2xl font-black">{t('responseTitle')}</h2>
                <div className="mt-6 grid gap-4">
                  {(['one', 'two', 'three'] as const).map((key) => (
                    <div key={key} className="flex gap-3">
                      <CheckCircle2 className="mt-1 shrink-0 text-emerald-500" size={19} />
                      <p className="muted leading-7">{t(`responseItems.${key}`)}</p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.05}>
              <article className="card p-7">
                <h2 className="display text-2xl font-black">{t('directTitle')}</h2>
                <div className="mt-5 grid gap-3">
                  <a href="tel:+919027965956" className="btn btn-ghost justify-start">
                    <Phone size={17} />
                    {t('call')}: +91 90279 65956
                  </a>
                  <a href="mailto:Connect@systemmaster.in" className="btn btn-ghost justify-start">
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

          <Reveal delay={0.08}>
            <form onSubmit={submitWhatsApp} className="card p-7 md:p-9">
              <h2 className="display text-3xl font-black">{t('formTitle')}</h2>
              <p className="muted mt-3 leading-7">{t('formDesc')}</p>

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

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <motion.button
                  type="submit"
                  whileHover={{y: -2}}
                  whileTap={{scale: 0.98}}
                  className="btn btn-gold flex-1"
                >
                  <MessageCircle size={18} />
                  {t('whatsappButton')}
                  <ArrowRight size={17} />
                </motion.button>

                <button
                  type="button"
                  onClick={submitEmail}
                  className="btn btn-ghost flex-1"
                >
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
