import type { Metadata } from "next";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";

const PATHNAME = "/markdown-table-generator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Markdown Table Generator - Free Online Tool | Markdown Online",
    description:
      "Create Markdown tables visually. Edit cells, set column alignment, and copy the generated Markdown code. Free, no signup required.",
    alternates: {
      canonical: getCanonicalUrl(PATHNAME, locale),
      languages: getHreflangAlternates(PATHNAME),
    },
    openGraph: {
      title: "Markdown Table Generator - Free Online Tool",
      description:
        "Create Markdown tables visually. Edit cells, set alignment, and copy the code.",
      type: "website",
      url: getCanonicalUrl(PATHNAME, locale),
    },
    twitter: {
      card: "summary_large_image",
      title: "Markdown Table Generator - Free Online Tool",
      description:
        "Create Markdown tables visually. Edit cells, set alignment, and copy the code.",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
