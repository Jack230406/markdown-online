import type { Metadata } from "next";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("home");
  return {
    title: t("title"),
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
      {/* H1 for SEO - visually compact */}
      <div className="border-b px-4 py-3 text-center" style={{ borderColor: "var(--border)" }}>
        <h1 className="text-lg font-bold sm:text-xl">{t("h1")}</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{t("seoFeatures")}</p>
      </div>

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
