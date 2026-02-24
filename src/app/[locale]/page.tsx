import { MarkdownEditor } from "@/components/MarkdownEditor";
import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
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
      <div className="flex h-[calc(100vh-8rem)] flex-col">
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
    </>
  );
}
