import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'zh'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'as-needed'  // en = no prefix, es = /es/
  }
});
