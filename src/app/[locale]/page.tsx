import type { Metadata } from "next";
import Link from "next/link";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("home");
  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: {
      canonical: getCanonicalUrl("/", locale),
      languages: getHreflangAlternates("/"),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: getCanonicalUrl("/", locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const primaryCtas = [
    { href: `${localePrefix}/markdown-to-pdf/`, label: t("ctaPdf") },
    { href: `${localePrefix}/markdown-to-html/`, label: t("ctaHtml") },
    { href: `${localePrefix}/markdown-to-word/`, label: t("ctaWord") },
    { href: `${localePrefix}/markdown-table-generator/`, label: t("ctaTable") },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Markdown Online",
    url: "https://markdownonline.app",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online Markdown editor with live preview, export options, and auto-save. No signup required.",
    featureList: [
      "Live Markdown preview",
      "Export to HTML and Markdown",
      "Auto-save to browser storage",
      "Dark mode support",
      "Mobile responsive",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b px-4 py-8" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t("h1")}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--muted)" }}>
            {t("heroDesc")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {primaryCtas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                {cta.label}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>{t("seoFeatures")}</p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="h-[calc(100vh-14rem)] overflow-hidden rounded-lg border-2" style={{ borderColor: "var(--border)" }}>
          <MarkdownEditor />
        </div>
      </div>

      {/* SEO content section */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        {/* Intro */}
        <h2 className="mb-3 text-xl font-semibold">{t("seoTitle")}</h2>
        <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--muted)" }}>{t("seoDesc")}</p>

        {/* Why choose */}
        <h2 className="mb-3 text-xl font-semibold">{t("whyTitle")}</h2>
        <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--muted)" }}>{t("whyDesc")}</p>

        {/* Features grid */}
        <h2 className="mb-4 text-xl font-semibold">{t("featuresTitle")}</h2>
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          {(["feature1", "feature2", "feature3", "feature4"] as const).map((key) => (
            <div key={key} className="rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
              <h3 className="mb-2 text-base font-semibold">{t(`${key}Title`)}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{t(`${key}Desc`)}</p>
            </div>
          ))}
        </div>

        {/* Use cases */}
        <h2 className="mb-3 text-xl font-semibold">{t("useCasesTitle")}</h2>
        <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--muted)" }}>{t("useCasesDesc")}</p>

        {/* How it works */}
        <h2 className="mb-4 text-xl font-semibold">{t("howItWorksTitle")}</h2>
        <ol className="mb-8 list-inside list-decimal space-y-3 text-base" style={{ color: "var(--muted)" }}>
          <li>{t("howStep1")}</li>
          <li>{t("howStep2")}</li>
          <li>{t("howStep3")}</li>
          <li>{t("howStep4")}</li>
        </ol>

        {/* FAQ */}
        <h2 className="mb-4 text-xl font-semibold">{t("faqTitle")}</h2>
        <div className="space-y-4">
          {(["faq1", "faq2", "faq3", "faq4"] as const).map((key) => (
            <details key={key} className="rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
              <summary className="cursor-pointer text-base font-medium">{t(`${key}q`)}</summary>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{t(`${key}a`)}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
