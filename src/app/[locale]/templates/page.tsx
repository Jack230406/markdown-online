import type { Metadata } from "next";
import Link from "next/link";
import { MARKDOWN_TEMPLATES } from "@/lib/templates";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Markdown Templates",
    description: "Start faster with ready-made Markdown templates for README files, docs, blog posts, and meeting notes.",
    alternates: {
      canonical: getCanonicalUrl("/templates/", locale),
      languages: getHreflangAlternates("/templates/"),
    },
    openGraph: {
      title: "Markdown Templates",
      description: "Ready-made Markdown templates for common writing tasks.",
      url: getCanonicalUrl("/templates/", locale),
    },
  };
}

export default async function TemplatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="mb-10 rounded-2xl border px-6 py-8" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h1 className="text-3xl font-bold sm:text-4xl">Markdown Templates</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          Skip the blank page. Start with a ready-made Markdown template for the most common writing tasks, then edit and export in the main editor.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {MARKDOWN_TEMPLATES.map((template) => (
          <article key={template.id} className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h2 className="text-lg font-semibold">{template.title}</h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{template.description}</p>
            <Link href={`${localePrefix}/?template=${template.id}`} className="mt-4 inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Use template
            </Link>
          </article>
        ))}
      </div>

      <section className="mt-12 max-w-4xl">
        <h2 className="mb-3 text-2xl font-bold">Templates built for real Markdown work</h2>
        <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
          These templates help users get to a useful structure faster. They are especially useful for README files, internal docs, meeting notes, and blog drafts where the initial outline matters more than raw formatting features.
        </p>
      </section>
    </div>
  );
}
