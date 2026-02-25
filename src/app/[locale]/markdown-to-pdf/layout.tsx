import type { Metadata } from "next";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";

const PATHNAME = "/markdown-to-pdf";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Markdown to PDF Converter - Free Online Tool | Markdown Online",
    description:
      "Convert Markdown to PDF for free. Paste your Markdown, preview it live, and download a beautifully formatted PDF. No signup required.",
    alternates: {
      canonical: getCanonicalUrl(PATHNAME, locale),
      languages: getHreflangAlternates(PATHNAME),
    },
    openGraph: {
      title: "Markdown to PDF Converter - Free Online Tool",
      description:
        "Convert Markdown to PDF for free. Preview live and download a beautifully formatted PDF.",
      type: "website",
      url: getCanonicalUrl(PATHNAME, locale),
    },
    twitter: {
      card: "summary_large_image",
      title: "Markdown to PDF Converter - Free Online Tool",
      description:
        "Convert Markdown to PDF for free. Preview live and download a beautifully formatted PDF.",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
