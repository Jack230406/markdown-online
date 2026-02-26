const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://markdownonline.app';
const LOCALES = ['en', 'es', 'zh'];
const DEFAULT_LOCALE = 'en';
const LOCALE_DIR = path.join(__dirname, '..', 'src', 'app', '[locale]');
const OUTPUT = path.join(__dirname, '..', 'public', 'sitemap.xml');

function discoverRoutes(dir, prefix = '') {
  const routes = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      routes.push(...discoverRoutes(path.join(dir, entry.name), `${prefix}/${entry.name}`));
    } else if (entry.name === 'page.tsx') {
      routes.push(prefix || '/');
    }
  }
  return routes;
}

function buildUrl(route, locale) {
  if (locale === DEFAULT_LOCALE) {
    return route === '/' ? `${DOMAIN}/` : `${DOMAIN}${route}/`;
  }
  return route === '/' ? `${DOMAIN}/${locale}/` : `${DOMAIN}/${locale}${route}/`;
}

function getPriority(route) {
  if (route === '/') return '1.0';
  if (route.includes('markdown-')) return '0.9';
  return '0.7';
}

function generate() {
  const routes = discoverRoutes(LOCALE_DIR).sort();
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for (const route of routes) {
    for (const locale of LOCALES) {
      const loc = buildUrl(route, locale);
      xml += '  <url>\n';
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <priority>${getPriority(route)}</priority>\n`;
      for (const alt of LOCALES) {
        const href = buildUrl(route, alt);
        xml += `    <xhtml:link rel="alternate" hreflang="${alt}" href="${href}" />\n`;
      }
      xml += '  </url>\n';
    }
  }

  xml += '</urlset>\n';

  fs.writeFileSync(OUTPUT, xml, 'utf-8');
  console.log(`Sitemap generated: ${OUTPUT} (${routes.length} routes × ${LOCALES.length} locales = ${routes.length * LOCALES.length} URLs)`);
}

generate();
