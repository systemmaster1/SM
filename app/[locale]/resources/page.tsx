import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {ResourcesPage} from '@/components/pages/resources-page';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const currentLocale = locale === 'hi' ? 'hi' : 'en';
  const t = await getTranslations({
    locale: currentLocale,
    namespace: 'resourcesPage'
  });

  const canonical = `https://systemmaster.in/${currentLocale}/resources`;

  return {
    title: `${t('seoTitle')} | SystemMaster`,
    description: t('seoDescription'),
    alternates: {
      canonical,
      languages: {
        en: 'https://systemmaster.in/en/resources',
        hi: 'https://systemmaster.in/hi/resources'
      }
    },
    openGraph: {
      title: `${t('seoTitle')} | SystemMaster`,
      description: t('seoDescription'),
      url: canonical,
      siteName: 'SystemMaster Automations',
      type: 'website'
    }
  };
}

export default function Page() {
  return <ResourcesPage />;
}
