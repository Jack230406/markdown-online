import type { Metadata } from "next";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: getCanonicalUrl("/", locale),
      languages: getHreflangAlternates("/"),
    },
    openGraph: {
      title: "Markdown Online - Free Markdown Editor",
      description: "Free online Markdown editor with live preview, syntax highlighting, and export options. No signup required.",
      url: getCanonicalUrl("/", locale),
    },
    twitter: {
      card: "summary_large_image",
      title: "Markdown Online - Free Markdown Editor",
      description: "Free online Markdown editor with live preview, syntax highlighting, and export options. No signup required.",
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
    url: "https://markdownonline.com",
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
        <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>{t("seoFeatures")}</p>
      </div>

      <div className="flex h-[calc(100vh-12rem)] flex-col">
        {/* Ad placeholder - top banner */}
        <div className="ad-placeholder flex items-center justify-center border-b py-2 text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          {/* AdSense banner ad slot */}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Ad placeholder - left sidebar */}
          <div className="ad-placeholder hidden w-[160px] shrink-0 items-center justify-center border-r xl:flex" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            {/* AdSense sidebar ad slot */}
          </div>

          {/* Main editor */}
          <div className="flex-1 overflow-hidden">
            <MarkdownEditor />
          </div>

          {/* Ad placeholder - right sidebar */}
          <div className="ad-placeholder hidden w-[160px] shrink-0 items-center justify-center border-l xl:flex" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            {/* AdSense sidebar ad slot */}
          </div>
        </div>
      </div>

      {/* SEO content section */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        {/* Intro */}
        <h2 className="mb-3 text-lg font-semibold">{t("seoTitle")}</h2>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{t("seoDesc")}</p>

        {/* Why choose */}
        <h2 className="mb-3 text-lg font-semibold">{t("whyTitle")}</h2>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{t("whyDesc")}</p>

        {/* Features grid */}
        <h2 className="mb-4 text-lg font-semibold">{t("featuresTitle")}</h2>
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          {(["feature1", "feature2", "feature3", "feature4"] as const).map((key) => (
            <div key={key} className="rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
              <h3 className="mb-2 text-sm font-semibold">{t(`${key}Title`)}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{t(`${key}Desc`)}</p>
            </div>
          ))}
        </div>

        {/* Use cases */}
        <h2 className="mb-3 text-lg font-semibold">{t("useCasesTitle")}</h2>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{t("useCasesDesc")}</p>

        {/* How it works */}
        <h2 className="mb-4 text-lg font-semibold">{t("howItWorksTitle")}</h2>
        <ol className="mb-8 list-inside list-decimal space-y-2 text-sm" style={{ color: "var(--muted)" }}>
          <li>{t("howStep1")}</li>
          <li>{t("howStep2")}</li>
          <li>{t("howStep3")}</li>
          <li>{t("howStep4")}</li>
        </ol>

        {/* FAQ */}
        <h2 className="mb-4 text-lg font-semibold">{t("faqTitle")}</h2>
        <div className="space-y-4">
          {(["faq1", "faq2", "faq3", "faq4"] as const).map((key) => (
            <details key={key} className="rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
              <summary className="cursor-pointer text-sm font-medium">{t(`${key}q`)}</summary>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{t(`${key}a`)}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
