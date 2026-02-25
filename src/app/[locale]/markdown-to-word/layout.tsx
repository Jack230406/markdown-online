import type { Metadata } from "next";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";

const PATHNAME = "/markdown-to-word";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Markdown to Word Converter - Free Online Tool | Markdown Online",
    description:
      "Convert Markdown to Word (.docx) for free. No signup required. Export your Markdown documents to Word files instantly.",
    alternates: {
      canonical: getCanonicalUrl(PATHNAME, locale),
      languages: getHreflangAlternates(PATHNAME),
    },
    openGraph: {
      title: "Markdown to Word Converter - Free Online Tool",
      description:
        "Convert Markdown to Word (.docx) for free. Export your documents instantly.",
      type: "website",
      url: getCanonicalUrl(PATHNAME, locale),
    },
    twitter: {
      card: "summary_large_image",
      title: "Markdown to Word Converter - Free Online Tool",
      description:
        "Convert Markdown to Word (.docx) for free. Export your documents instantly.",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
