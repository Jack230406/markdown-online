import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'as-needed'  // en = no prefix, es = /es/
  }
});
