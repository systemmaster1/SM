'use client';

import {FormEvent, useState} from 'react';
import {useTranslations} from 'next-intl';
import {MessageCircle, X} from 'lucide-react';

export function DemoModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('demoModal');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      setError(t('required'));
      return;
    }

    const interestLabel = interest
      ? t(`products.${interest}` as never)
      : '-';

    const message = [
      'Hello SystemMaster,',
      '',
      'I would like to book a free demo.',
      `Name: ${name}`,
      `Company: ${company || '-'}`,
      `Phone: ${phone}`,
      `Interested In: ${interestLabel}`
    ].join('\n');

    window.open(
      `https://wa.me/919027965956?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      className="fixed inset-0 z-[99990] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t('title')}
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <form
        onSubmit={submit}
        className="card relative w-full max-w-lg overflow-hidden p-7 md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t('close')}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-strong)]"
        >
          <X size={18} />
        </button>

        <h2 className="display pr-12 text-3xl font-black">{t('title')}</h2>
        <p className="muted mt-3 leading-7">{t('desc')}</p>

        <div className="mt-7 grid gap-4">
          <label className="grid gap-2 text-sm font-extrabold">
            <span>{t('name')}</span>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label className="grid gap-2 text-sm font-extrabold">
            <span>{t('company')}</span>
            <input className="form-control" value={company} onChange={(e) => setCompany(e.target.value)} />
          </label>

          <label className="grid gap-2 text-sm font-extrabold">
            <span>{t('phone')}</span>
            <input
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
            />
          </label>

          <label className="grid gap-2 text-sm font-extrabold">
            <span>{t('interest')}</span>
            <select className="form-control" value={interest} onChange={(e) => setInterest(e.target.value)}>
              <option value="">{t('select')}</option>
              <option value="books">{t('products.books')}</option>
              <option value="hrms">{t('products.hrms')}</option>
              <option value="erp">{t('products.erp')}</option>
              <option value="custom">{t('products.custom')}</option>
            </select>
          </label>
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm font-bold text-red-500">
            {error}
          </div>
        ) : null}

        <button type="submit" className="btn btn-gold mt-6 w-full">
          <MessageCircle size={18} />
          {t('continue')}
        </button>
      </form>
    </div>
  );
}
