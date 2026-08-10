'use client';

import {FormEvent, useMemo, useRef, useState} from 'react';
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

const LEAD_WEBHOOK =
  'https://script.google.com/macros/s/AKfycbwNuVmFIsigEJRrLy8sGKJeQYoa3wVRY9EpmixKeNtXa7rYeg_TDiLjF2fkz6EejZTrCg/exec';

type FormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  interest: string;
  budget: string;
  requirement: string;
  website: string;
};

const initialForm: FormState = {
  name: '',
  company: '',
  phone: '',
  email: '',
  interest: '',
  budget: '',
  requirement: '',
  website: ''
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

function createLeadId() {
  return `WEB-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export function ContactConversionPage() {
  const locale = useLocale();
  const t = useTranslations('contactLead');
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const openedAt = useRef(Date.now());

  const hi = locale === 'hi';

  const interestLabel = useMemo(
    () => (form.interest ? t(`interests.${form.interest}` as never) : '-'),
    [form.interest, t]
  );

  const budgetLabel = useMemo(
    () => (form.budget ? t(`budgets.${form.budget}` as never) : '-'),
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
    const name = form.name.trim();
    const company = form.company.trim();
    const phone = form.phone.replace(/\D/g, '');
    const email = form.email.trim();
    const requirement = form.requirement.trim();

    if (form.website.trim()) {
      setError(hi ? 'Submission blocked.' : 'Submission blocked.');
      return false;
    }

    if (
      !name ||
      !company ||
      !phone ||
      !email ||
      !form.interest ||
      !form.budget ||
      !requirement
    ) {
      setError(
        hi
          ? 'सभी fields भरना mandatory है। कृपया कोई field खाली न छोड़ें।'
          : 'All fields are mandatory. Please complete every field.'
      );
      return false;
    }

    if (name.length < 3) {
      setError(hi ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
      return false;
    }

    if (company.length < 2) {
      setError(
        hi
          ? 'कृपया company / business name दर्ज करें।'
          : 'Please enter your company or business name.'
      );
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError(
        hi
          ? 'कृपया सही 10-अंकों का Indian mobile number दर्ज करें।'
          : 'Please enter a valid 10-digit Indian mobile number.'
      );
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError(hi ? 'कृपया सही email address दर्ज करें।' : 'Please enter a valid email address.');
      return false;
    }

    if (requirement.length < 15) {
      setError(
        hi
          ? 'Requirement कम से कम 15 characters में लिखें ताकि हम आपकी जरूरत समझ सकें।'
          : 'Please describe your requirement in at least 15 characters.'
      );
      return false;
    }

    if (Date.now() - openedAt.current < 2500) {
      setError(
        hi
          ? 'कृपया form details verify करके फिर submit करें।'
          : 'Please review your details before submitting.'
      );
      return false;
    }

    setError('');
    return true;
  };

  const saveLead = async (action: 'whatsapp' | 'email') => {
    const leadId = createLeadId();
    const phone = form.phone.replace(/\D/g, '');

    const payload = {
      formType: 'contact_enquiry',
      leadId,
      timestamp: new Date().toISOString(),
      timestampIndia: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata'
      }),
      source: 'SystemMaster Website Contact Form',
      action,
      name: form.name.trim(),
      company: form.company.trim(),
      phone,
      email: form.email.trim().toLowerCase(),
      interest: interestLabel,
      budget: budgetLabel,
      requirement: form.requirement.trim(),
      locale,
      pageUrl: window.location.href,
      referrer: document.referrer || 'Direct',
      userAgent: navigator.userAgent
    };

    try {
      await fetch(LEAD_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
    } catch {
      // Do not block the visitor's requested contact action if the logging endpoint is temporarily unavailable.
    }

    return leadId;
  };

  const submitWhatsApp = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    await saveLead('whatsapp');

    window.open(
      `https://wa.me/919027965956?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );

    setTimeout(() => setSubmitting(false), 1200);
  };

  const submitEmail = async () => {
    if (!validate() || submitting) return;

    setSubmitting(true);
    await saveLead('email');

    const subject = encodeURIComponent(
      `New enquiry from ${form.name} - ${form.company}`
    );

    window.location.href =
      `mailto:Connect@systemmaster.in?subject=${subject}&body=${encodeURIComponent(message)}`;

    setTimeout(() => setSubmitting(false), 1200);
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
            <form onSubmit={submitWhatsApp} className="card p-7 md:p-9" noValidate>
              <h2 className="display text-3xl">{t('formTitle')}</h2>
              <p className="muted mt-3 max-w-2xl leading-7">{t('formDesc')}</p>

              <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm font-bold text-[var(--text-soft)]">
                {hi
                  ? 'सही और complete details दें। सभी fields mandatory हैं और enquiry SystemMaster lead register में सुरक्षित होती है।'
                  : 'Please provide accurate and complete details. Every field is mandatory and the enquiry is recorded in the SystemMaster lead register.'}
              </div>

              <input
                type="text"
                value={form.website}
                onChange={(e) => update('website', e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-px w-px opacity-0"
                name="website"
              />

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Field label={t('name')} required>
                  <input
                    required
                    minLength={3}
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="form-control"
                    autoComplete="name"
                  />
                </Field>

                <Field label={t('company')} required>
                  <input
                    required
                    minLength={2}
                    value={form.company}
                    onChange={(e) => update('company', e.target.value)}
                    className="form-control"
                    autoComplete="organization"
                  />
                </Field>

                <Field label={t('phone')} required>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className="form-control"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={14}
                    placeholder="+91 98765 43210"
                  />
                </Field>

                <Field label={t('email')} required>
                  <input
                    required
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="form-control"
                    type="email"
                    autoComplete="email"
                  />
                </Field>

                <Field label={t('interest')} required>
                  <select
                    required
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

                <Field label={t('budget')} required>
                  <select
                    required
                    value={form.budget}
                    onChange={(e) => update('budget', e.target.value)}
                    className="form-control"
                  >
                    <option value="">{t('select')}</option>
                    {budgetKeys.map((key) => (
                      <option key={key} value={key}>
                        {t(`budgets.${key}`)}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label={t('requirement')} className="mt-5" required>
                <textarea
                  required
                  minLength={15}
                  rows={7}
                  value={form.requirement}
                  onChange={(e) => update('requirement', e.target.value)}
                  className="form-control resize-y"
                  placeholder={t('placeholder')}
                />
              </Field>

              {error ? (
                <div
                  role="alert"
                  className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-bold text-red-500"
                >
                  {error}
                </div>
              ) : null}

              <p className="muted mt-4 text-xs leading-5">{t('privacy')}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={submitting ? undefined : {y: -2}}
                  whileTap={submitting ? undefined : {scale: .985}}
                  className="btn btn-gold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <MessageCircle size={18} />
                  {submitting
                    ? hi
                      ? 'Saving...'
                      : 'Saving...'
                    : t('whatsappButton')}
                  <ArrowRight size={17} />
                </motion.button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={submitEmail}
                  className="btn btn-ghost disabled:cursor-not-allowed disabled:opacity-60"
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
  className = '',
  required = false
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}) {
  return (
    <label className={`grid gap-2 text-sm font-extrabold ${className}`}>
      <span>
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </span>
      {children}
    </label>
  );
}
