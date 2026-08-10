import Image from 'next/image';
import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck
} from 'lucide-react';

export async function Footer({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'footer'});
  const year = new Date().getFullYear();

  const linkClass = 'sm-footer-link';

  return (
    <footer className="sm-site-footer">
      <div className="container">
        <div className="sm-footer-top">
          <div className="sm-footer-brand-column">
            <Link href={`/${locale}`} className="sm-brand w-fit">
              <Image
                src="/logo/systemmaster.png"
                alt="SystemMaster Automations"
                width={82}
                height={82}
                className="h-[68px] w-[68px] object-contain"
              />
              <span>
                <span className="sm-brand-name text-xl">SystemMaster</span>
                <span className="sm-brand-sub">Automations</span>
              </span>
            </Link>

            <p className="muted mt-5 max-w-md leading-7">{t('desc')}</p>

            <div className="sm-footer-trust">
              <ShieldCheck size={17} />
              <span>
                {locale === 'hi'
                  ? 'भारत में व्यवसायों के लिए सॉफ्टवेयर, ऑटोमेशन और डिजिटल समाधान'
                  : 'Software, automation and digital solutions for growing businesses in India'}
              </span>
            </div>

            <div className="sm-footer-contact">
              <a href="mailto:Connect@systemmaster.in">
                <Mail size={16} />
                Connect@systemmaster.in
              </a>
              <a href="tel:+919027965956">
                <Phone size={16} />
                +91 90279 65956
              </a>
              <span>
                <MapPin size={16} />
                India
              </span>
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
              {t('guides')} <ArrowUpRight size={13} />
            </Link>
            <Link className={linkClass} href={`/${locale}/resources/case-studies`}>
              {t('caseStudies')} <ArrowUpRight size={13} />
            </Link>
            <div className="sm-footer-legal-title">{t('legal')}</div>
            <Link className={linkClass} href={`/${locale}/privacy`}>{t('privacy')}</Link>
            <Link className={linkClass} href={`/${locale}/terms`}>{t('terms')}</Link>
          </FooterColumn>
        </div>

        <div className="sm-footer-bottom">
          <div>© {year} SystemMaster Automations. {t('rights')}</div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/919027965956"
              target="_blank"
              rel="noreferrer"
              className="sm-footer-bottom-link"
            >
              <MessageCircle size={15} />
              {t('whatsapp')}
            </a>
            <Link href={`/${locale}/contact`} className="sm-footer-bottom-link strong">
              {t('bookDemo')}
              <ArrowUpRight size={15} />
            </Link>
          </div>
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
    <div className="sm-footer-column">
      <h4>{title}</h4>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}
