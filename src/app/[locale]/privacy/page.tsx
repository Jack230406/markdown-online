import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("privacy");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getCanonicalUrl("/privacy", locale),
      languages: getHreflangAlternates("/privacy"),
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  const sections = [
    { title: "infoTitle", desc: ["infoDesc1", "infoDesc2"] },
    { title: "cookiesTitle", desc: ["cookiesDesc"] },
    { title: "analyticsTitle", desc: ["analyticsDesc"] },
    { title: "localStorageTitle", desc: ["localStorageDesc"] },
    { title: "thirdPartyTitle", desc: ["thirdPartyDesc"] },
    { title: "childrenTitle", desc: ["childrenDesc"] },
    { title: "changesTitle", desc: ["changesDesc"] },
  ];

  const highlights = [
    {
      title: "What stays local?",
      desc: "Your Markdown text, live preview rendering, and export actions all run in your browser.",
    },
    {
      title: "How does autosave work?",
      desc: "Drafts are saved to your own browser local storage so you can continue later on the same device.",
    },
    {
      title: "Is anything uploaded during export?",
      desc: "No. HTML, PDF, and Word exports are generated client-side using the content already in your editor.",
    },
    {
      title: "Do I need an account?",
      desc: "No. You can write, preview, and export without signing up or submitting documents to a server.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="mb-10 rounded-2xl border px-6 py-8" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-3 max-w-3xl leading-relaxed" style={{ color: "var(--muted)" }}>
          Markdown Online is built to keep writing private by default. This page explains what stays on your device, how browser autosave works, and what happens when you export files.
        </p>
        <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>{t("lastUpdated")}</p>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h2 className="text-base font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
          </div>
        ))}
      </section>

      <div className="space-y-8 leading-relaxed">
        <p>{t("intro")}</p>

        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-2xl font-semibold">{t(s.title)}</h2>
            {s.desc.map((d) => (
              <p key={d} className="mt-2">{t(d)}</p>
            ))}
          </section>
        ))}

        <section>
          <h2 className="text-2xl font-semibold">{t("contactTitle")}</h2>
          <p className="mt-2">
            {t("contactDesc")} <Link href="/contact" className="text-primary underline">Contact</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
