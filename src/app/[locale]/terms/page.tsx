import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("terms");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getCanonicalUrl("/terms", locale),
      languages: getHreflangAlternates("/terms"),
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  const sections = [
    { title: "useTitle", desc: ["useDesc"] },
    { title: "contentTitle", desc: ["contentDesc"] },
    { title: "ipTitle", desc: ["ipDesc"] },
    { title: "disclaimerTitle", desc: ["disclaimerDesc"] },
    { title: "limitationTitle", desc: ["limitationDesc"] },
    { title: "thirdPartyTitle", desc: ["thirdPartyDesc"] },
    { title: "changesTitle", desc: ["changesDesc"] },
    { title: "governingTitle", desc: ["governingDesc"] },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">{t("title")}</h1>
      <p className="mb-4 text-sm" style={{ color: "var(--muted)" }}>{t("lastUpdated")}</p>

      <div className="space-y-6 leading-relaxed" style={{ color: "var(--foreground)" }}>
        <p>{t("intro")}</p>

        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-2xl font-semibold">{t(s.title)}</h2>
            {s.desc.map((d) => (
              <p key={d} className="mt-2">{t(d)}</p>
            ))}
          </div>
        ))}

        <h2 className="text-2xl font-semibold">{t("contactTitle")}</h2>
        <p>
          {t("contactDesc")}{" "}
          <Link href="/contact" className="text-primary underline">
            Contact
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
