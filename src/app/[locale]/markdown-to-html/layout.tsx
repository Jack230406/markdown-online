import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";

const PATHNAME = "/markdown-to-html";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("toHtml");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getCanonicalUrl(PATHNAME, locale),
      languages: getHreflangAlternates(PATHNAME),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      url: getCanonicalUrl(PATHNAME, locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
