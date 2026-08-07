'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {Languages, Menu, Moon, Sun, X} from 'lucide-react';
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const {resolvedTheme, setTheme} = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

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

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        scrolled
          ? 'border-[var(--line)] bg-[color:var(--surface)]/90 shadow-lg backdrop-blur-2xl'
          : 'border-transparent bg-[color:var(--bg)]/75 backdrop-blur-xl'
      }`}
    >
      <div className="container flex min-h-[78px] items-center justify-between gap-5">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label="SystemMaster home">
          <Image
            src="/logo/systemmaster.png"
            alt="SystemMaster Automations"
            width={72}
            height={72}
            className="h-14 w-14 object-contain"
            priority
          />
          <div>
            <div className="display text-[1.05rem] font-extrabold">SystemMaster</div>
            <div className="text-[10px] font-bold uppercase tracking-[.18em] text-[var(--gold)]">
              Automations
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
          {links.map(([key, route]) => {
            const href = `/${locale}/${route}`;
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={key}
                href={href}
                className={`rounded-full px-3 py-2 text-sm font-bold transition ${
                  active
                    ? 'bg-[var(--surface-strong)] text-[var(--text)]'
                    : 'text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]'
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <button
            type="button"
            onClick={switchLocale}
            className="btn btn-ghost !min-h-10 !px-3"
            aria-label="Change language"
          >
            <Languages size={17} />
            {locale.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="btn btn-ghost !min-h-10 !px-3"
            aria-label="Toggle color theme"
          >
            {resolvedTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link href={`/${locale}/contact`} className="btn btn-primary !min-h-11">
            {t('demo')}
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line)] xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="container border-t border-[var(--line)] pb-5 pt-2 xl:hidden">
          <nav aria-label="Mobile navigation">
            {links.map(([key, route]) => (
              <Link
                key={key}
                href={`/${locale}/${route}`}
                className="block border-b border-[var(--line)] py-3.5 font-bold"
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-2">
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
              Theme
            </button>
          </div>

          <Link href={`/${locale}/contact`} className="btn btn-primary mt-3 w-full">
            {t('demo')}
          </Link>
        </div>
      )}
    </header>
  );
}
