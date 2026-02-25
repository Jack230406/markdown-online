const BASE_URL = "https://markdownonline.app";

/**
 * Build locale-aware canonical URL.
 * English (default) has no prefix; es → /es/; zh → /zh/
 */
export function getCanonicalUrl(pathname: string, locale: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const path = pathname === "/" ? "/" : `${pathname}/`;
  return `${BASE_URL}${prefix}${path}`;
}

/**
 * Build hreflang alternates for a given pathname.
 * Returns { "en": url, "es": url, "zh": url, "x-default": url }
 */
export function getHreflangAlternates(pathname: string) {
  const enUrl = `${BASE_URL}${pathname === "/" ? "/" : `${pathname}/`}`;
  const esUrl = `${BASE_URL}/es${pathname === "/" ? "/" : `${pathname}/`}`;
  const zhUrl = `${BASE_URL}/zh${pathname === "/" ? "/" : `${pathname}/`}`;

  return {
    en: enUrl,
    es: esUrl,
    zh: zhUrl,
    "x-default": enUrl,
  };
}
