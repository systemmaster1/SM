'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {Languages, Menu, Moon, Sun, X} from 'lucide-react';
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';
import {DemoModal} from '@/components/demo-modal';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const {resolvedTheme, setTheme} = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'hi' : 'en';
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/') || `/${nextLocale}`);
  };

  const links = [
    ['products', 'products'],
    ['services', 'services'],
    ['industries', 'industries'],
    ['portfolio', 'portfolio'],
    ['pricing', 'pricing'],
    ['resources', 'resources'],
    ['about', 'about']
  ] as const;

  const isActive = (route: string) => {
    const href = `/${locale}/${route}`;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className={`sm-site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container sm-header-inner">
          <Link
            href={`/${locale}`}
            className="sm-brand"
            aria-label="SystemMaster Automations home"
          >
            <Image
              src="/logo/systemmaster.png"
              alt="SystemMaster Automations"
              width={72}
              height={72}
              className="sm-brand-logo"
              priority
            />
            <span className="min-w-0">
              <span className="sm-brand-name">SystemMaster</span>
              <span className="sm-brand-sub">Automations</span>
            </span>
          </Link>

          <nav className="sm-desktop-nav" aria-label="Primary navigation">
            {links.map(([key, route]) => (
              <Link
                key={key}
                href={`/${locale}/${route}`}
                className={`sm-nav-link ${isActive(route) ? 'is-active' : ''}`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="sm-header-actions">
            <button
              type="button"
              onClick={switchLocale}
              className="sm-header-icon sm-language-button"
              aria-label={locale === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              title={locale === 'en' ? 'हिंदी' : 'English'}
            >
              <Languages size={17} />
              <span>{locale.toUpperCase()}</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="sm-header-icon"
              aria-label="Toggle color theme"
              title="Theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              className="btn btn-primary sm-header-demo"
            >
              {t('demo')}
            </button>
          </div>

          <button
            type="button"
            className="sm-mobile-menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div
        className={`sm-mobile-overlay ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        className={`sm-mobile-drawer ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="sm-mobile-drawer-head">
          <div>
            <div className="sm-brand-name">SystemMaster</div>
            <div className="sm-brand-sub">Automations</div>
          </div>
          <button
            type="button"
            className="sm-mobile-menu-button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="sm-mobile-nav" aria-label="Mobile navigation">
          {links.map(([key, route]) => (
            <Link
              key={key}
              href={`/${locale}/${route}`}
              className={`sm-mobile-nav-link ${isActive(route) ? 'is-active' : ''}`}
            >
              <span>{t(key)}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>

        <div className="sm-mobile-tools">
          <button type="button" onClick={switchLocale} className="btn btn-ghost">
            <Languages size={17} />
            {locale === 'en' ? 'हिंदी' : 'English'}
          </button>
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="btn btn-ghost"
          >
            {resolvedTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setDemoOpen(true);
          }}
          className="btn btn-primary mt-4 w-full"
        >
          {t('demo')}
        </button>
      </aside>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
