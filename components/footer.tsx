import Image from 'next/image';
import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {Mail, MessageCircle, Phone} from 'lucide-react';

export async function Footer({locale}: {locale: string}) {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]/40">
      <div className="container grid gap-10 py-14 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
        <div>
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image
              src="/logo/systemmaster.png"
              alt="SystemMaster Automations"
              width={76}
              height={76}
              className="h-16 w-16 object-contain"
            />
            <div>
              <div className="display text-xl font-extrabold">SystemMaster</div>
              <div className="text-xs font-bold uppercase tracking-[.16em] text-[var(--gold)]">
                Automations
              </div>
            </div>
          </Link>

          <p className="muted mt-4 max-w-md leading-7">{t('desc')}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <a className="btn btn-ghost !min-h-10" href="mailto:Connect@systemmaster.in">
              <Mail size={16} />
              Email
            </a>
            <a className="btn btn-ghost !min-h-10" href="tel:+919027965956">
              <Phone size={16} />
              Call
            </a>
            <a
              className="btn btn-ghost !min-h-10"
              href="https://wa.me/919027965956"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={16} />
              {t('whatsapp')}
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-extrabold">{t('company')}</h4>
          <div className="grid gap-3 text-sm text-[var(--muted)]">
            <Link href={`/${locale}/about`}>{t('about')}</Link>
            <Link href={`/${locale}/portfolio`}>{t('portfolio')}</Link>
            <Link href={`/${locale}/pricing`}>Pricing</Link>
            <Link href={`/${locale}/contact`}>{t('contactLink')}</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-extrabold">{t('solutions')}</h4>
          <div className="grid gap-3 text-sm text-[var(--muted)]">
            <Link href={`/${locale}/products`}>{t('readyProducts')}</Link>
            <Link href={`/${locale}/services`}>{t('customDevelopment')}</Link>
            <Link href={`/${locale}/industries`}>{t('industries')}</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-extrabold">{t('resources')}</h4>
          <div className="grid gap-3 text-sm text-[var(--muted)]">
            <Link href={`/${locale}/resources`}>{t('guides')}</Link>
            <Link href={`/${locale}/resources/case-studies`}>{t('caseStudies')}</Link>
            <Link href={`/${locale}/privacy`}>{t('privacy')}</Link>
            <Link href={`/${locale}/terms`}>{t('terms')}</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="container flex flex-col gap-3 py-5 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <div>© {year} SystemMaster Automations. {t('rights')}</div>
          <Link href={`/${locale}/contact`} className="font-extrabold text-[var(--text)]">
            {t('bookDemo')} →
          </Link>
        </div>
      </div>
    </footer>
  );
}
