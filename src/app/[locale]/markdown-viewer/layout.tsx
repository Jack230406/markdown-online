import type { Metadata } from "next";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";

const PATHNAME = "/markdown-viewer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Markdown Viewer - Free Online Tool | Markdown Online",
    description:
      "Paste any Markdown and see it rendered instantly. Free online Markdown viewer with full CommonMark support. No signup required.",
    alternates: {
      canonical: getCanonicalUrl(PATHNAME, locale),
      languages: getHreflangAlternates(PATHNAME),
    },
    openGraph: {
      title: "Markdown Viewer - Free Online Tool",
      description:
        "Paste any Markdown and see it rendered instantly. Free, no signup required.",
      type: "website",
      url: getCanonicalUrl(PATHNAME, locale),
    },
    twitter: {
      card: "summary_large_image",
      title: "Markdown Viewer - Free Online Tool",
      description:
        "Paste any Markdown and see it rendered instantly. Free, no signup required.",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
