import type { Metadata } from "next";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";

const PATHNAME = "/markdown-cheat-sheet";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Markdown Cheat Sheet - Quick Reference | Markdown Online",
    description:
      "Complete Markdown syntax cheat sheet. Quick reference for headings, links, images, tables, code blocks, and more.",
    alternates: {
      canonical: getCanonicalUrl(PATHNAME, locale),
      languages: getHreflangAlternates(PATHNAME),
    },
    openGraph: {
      title: "Markdown Cheat Sheet - Quick Reference",
      description:
        "Complete Markdown syntax cheat sheet with copyable examples.",
      type: "website",
      url: getCanonicalUrl(PATHNAME, locale),
    },
    twitter: {
      card: "summary_large_image",
      title: "Markdown Cheat Sheet - Quick Reference",
      description:
        "Complete Markdown syntax cheat sheet with copyable examples.",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
