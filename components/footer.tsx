import Image from 'next/image';
import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {ArrowUpRight, Mail, MessageCircle, Phone} from 'lucide-react';

export async function Footer({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'footer'});
  const year = new Date().getFullYear();

  const linkClass =
    'group inline-flex w-fit items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--text)]';

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--surface)]/45">
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="container relative grid gap-10 py-14 lg:grid-cols-[1.4fr_.85fr_.95fr_.95fr]">
        <div>
          <Link href={`/${locale}`} className="flex w-fit items-center gap-3">
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
              {t('email')}
            </a>
            <a className="btn btn-ghost !min-h-10" href="tel:+919027965956">
              <Phone size={16} />
              {t('call')}
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

        <FooterColumn title={t('company')}>
          <Link className={linkClass} href={`/${locale}/about`}>{t('about')}</Link>
          <Link className={linkClass} href={`/${locale}/portfolio`}>{t('portfolio')}</Link>
          <Link className={linkClass} href={`/${locale}/pricing`}>{t('pricing')}</Link>
          <Link className={linkClass} href={`/${locale}/contact`}>{t('contactLink')}</Link>
        </FooterColumn>

        <FooterColumn title={t('solutions')}>
          <Link className={linkClass} href={`/${locale}/products`}>{t('readyProducts')}</Link>
          <Link className={linkClass} href={`/${locale}/services`}>{t('customDevelopment')}</Link>
          <Link className={linkClass} href={`/${locale}/industries`}>{t('industries')}</Link>
        </FooterColumn>

        <FooterColumn title={t('resources')}>
          <Link className={linkClass} href={`/${locale}/resources`}>
            {t('guides')} <ArrowUpRight size={13} className="opacity-50 transition group-hover:opacity-100" />
          </Link>
          <Link className={linkClass} href={`/${locale}/resources/case-studies`}>
            {t('caseStudies')} <ArrowUpRight size={13} className="opacity-50 transition group-hover:opacity-100" />
          </Link>

          <div className="mt-3 border-t border-[var(--line)] pt-4">
            <div className="mb-3 text-xs font-extrabold uppercase tracking-[.14em] text-[var(--text)]/70">
              {t('legal')}
            </div>
            <div className="grid gap-3">
              <Link className={linkClass} href={`/${locale}/privacy`}>{t('privacy')}</Link>
              <Link className={linkClass} href={`/${locale}/terms`}>{t('terms')}</Link>
            </div>
          </div>
        </FooterColumn>
      </div>

      <div className="relative border-t border-[var(--line)]">
        <div className="container flex flex-col gap-3 py-5 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <div>© {year} SystemMaster Automations. {t('rights')}</div>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 font-extrabold text-[var(--text)] transition hover:text-[var(--primary)]"
          >
            {t('bookDemo')} <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-black uppercase tracking-[.12em] text-[var(--text)]">{title}</h4>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}
