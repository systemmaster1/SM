'use client';

import {useEffect} from 'react';

export function LocaleDocumentLanguage({locale}: {locale: string}) {
  useEffect(() => {
    document.documentElement.lang = locale === 'hi' ? 'hi' : 'en';
  }, [locale]);

  return null;
}
