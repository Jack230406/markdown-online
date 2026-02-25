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
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="mb-3 text-base font-semibold">{t("seoTitle")}</h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{t("seoDesc")}</p>
      </section>
    </>
  );
}
