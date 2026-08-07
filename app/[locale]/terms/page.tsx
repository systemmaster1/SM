import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {LegalPage} from '@/components/pages/legal-page';

const sectionKeys = [
  'website',
  'information',
  'products',
  'custom',
  'payment',
  'ip',
  'demo',
  'thirdParty',
  'liability',
  'changes'
] as const;

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const currentLocale = locale === 'hi' ? 'hi' : 'en';
  const t = await getTranslations({locale: currentLocale, namespace: 'legalPages.terms'});
  const canonical = `https://systemmaster.in/${currentLocale}/terms`;

  return {
    title: `${t('title')} | SystemMaster Automations`,
    description: t('intro'),
    alternates: {
      canonical,
      languages: {
        en: 'https://systemmaster.in/en/terms',
        hi: 'https://systemmaster.in/hi/terms'
      }
    }
  };
}

export default async function Page({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const currentLocale = locale === 'hi' ? 'hi' : 'en';
  const common = await getTranslations({locale: currentLocale, namespace: 'legalPages.common'});
  const t = await getTranslations({locale: currentLocale, namespace: 'legalPages.terms'});

  return (
    <LegalPage
      eyebrow={t('eyebrow')}
      title={t('title')}
      intro={t('intro')}
      lastUpdated={common('lastUpdated')}
      sections={sectionKeys.map((key) => ({
        title: t(`sections.${key}.title`),
        body: t(`sections.${key}.body`)
      }))}
      contactTitle={common('contactTitle')}
      contactDesc={common('contactDesc')}
      email={common('email')}
      backLabel={common('back')}
      contactLabel={common('contact')}
      locale={currentLocale}
    />
  );
}
