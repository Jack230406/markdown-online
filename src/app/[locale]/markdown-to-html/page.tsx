"use client";

import Link from "next/link";
import { useState, useMemo, useCallback, useRef } from "react";
import MarkdownIt from "markdown-it";

const SAMPLE = `# Product Update

Ship changes faster with **Markdown** and turn them into clean HTML.

## What shipped

- Faster onboarding flow
- Updated pricing table
- Bug fixes for export

> Reuse the generated HTML in a CMS, blog post, email, or static site.

\`\`\`html
<section>
  <h2>Launch Notes</h2>
</section>
\`\`\`

| Channel | Status |
|---------|--------|
| Blog | Ready |
| CMS | Ready |
| Email | Ready |
`;

const HTML_FILE_STYLE = `body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;max-width:860px;margin:0 auto;padding:2rem;line-height:1.7;color:#1a1a2e}h1,h2,h3{margin-top:1.5em}h1,h2{border-bottom:1px solid #e2e8f0;padding-bottom:.3em}code{background:#f1f5f9;padding:.2em .4em;border-radius:4px;font-size:.9em}pre{background:#f8fafc;padding:1rem;border-radius:8px;overflow-x:auto}pre code{background:none;padding:0}blockquote{border-left:4px solid #3b82f6;margin:1em 0;padding:.5em 1em;background:#eff6ff}table{border-collapse:collapse;width:100%;margin:1rem 0}th,td{border:1px solid #e2e8f0;padding:.65em .9em;text-align:left}th{background:#f8fafc}img{max-width:100%;height:auto}a{color:#2563eb}`;

export default function MarkdownToHtmlPage() {
  const [content, setContent] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"input" | "output">("input");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const md = useMemo(() => MarkdownIt({ html: true, linkify: true, typographer: true }), []);
  const renderedHtml = useMemo(() => md.render(content), [md, content]);

  const copyHtml = useCallback(async () => {
    await navigator.clipboard.writeText(renderedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [renderedHtml]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") setContent(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  const downloadHtml = useCallback(() => {
    const full = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Converted Document</title><style>${HTML_FILE_STYLE}</style></head><body>${renderedHtml}</body></html>`;
    const blob = new Blob([full], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    a.click();
    URL.revokeObjectURL(url);
  }, [renderedHtml]);

  const faqData = [
    { q: "Can I use the output in a CMS or static site?", a: "Yes. The output is clean HTML that works well in blogs, CMS editors, landing pages, and static site workflows." },
    { q: "Does it support tables and code blocks?", a: "Yes. Headings, lists, tables, code blocks, blockquotes, links, and common Markdown formatting are supported." },
    { q: "Can I download a full HTML file with styles?", a: "Yes. Use the download button to export a complete .html file with readable default styling included." },
    { q: "Is my Markdown uploaded anywhere?", a: "No. Conversion runs entirely in your browser, so your content stays local to your device." },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="mb-8 rounded-2xl border px-6 py-8" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h1 className="text-3xl font-bold sm:text-4xl">Markdown to HTML Converter</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          Turn Markdown into clean HTML you can publish, paste into a CMS, send in an email, or reuse in a static site build — all in your browser.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={copyHtml} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            {copied ? "✓ Copied" : "Copy HTML"}
          </button>
          <button onClick={downloadHtml} className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>
            Download .html
          </button>
          <input ref={fileInputRef} type="file" accept=".md,.markdown,.txt" onChange={handleFileUpload} className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>
            Upload Markdown
          </button>
        </div>
      </section>

      <div className="mb-4 flex border-b md:hidden" style={{ borderColor: "var(--border)" }}>
        <button onClick={() => setActiveTab("input")} className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "input" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}>
          Markdown
        </button>
        <button onClick={() => setActiveTab("output")} className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "output" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}>
          HTML
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2" style={{ minHeight: 440 }}>
        <div className={`${activeTab === "output" ? "hidden md:block" : ""}`}>
          <label className="mb-2 block text-sm font-medium">Markdown input</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-[440px] w-full rounded-2xl border p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500"
            style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
            spellCheck={false}
          />
        </div>
        <div className={`${activeTab === "input" ? "hidden md:block" : ""}`}>
          <label className="mb-2 block text-sm font-medium">HTML output</label>
          <pre className="h-[440px] overflow-auto rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <code>{renderedHtml}</code>
          </pre>
        </div>
      </div>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div>
          <h2 className="mb-3 text-2xl font-bold">Built for publishing tasks, not just conversion</h2>
          <p className="mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
            Use this page when you already have Markdown and need usable HTML fast. Paste notes, docs, or a README draft on the left, then copy the generated HTML for a blog, CMS, email template, product update, or internal knowledge base.
          </p>

          <h3 className="mb-2 text-xl font-semibold">What you can do with the HTML output</h3>
          <ul className="mb-6 list-inside list-disc space-y-2" style={{ color: "var(--muted)" }}>
            <li>Paste clean HTML into a CMS or static site workflow</li>
            <li>Reuse converted content in product announcements or email drafts</li>
            <li>Export a full HTML file with default styles for quick sharing</li>
            <li>Check how tables, code blocks, and links will render before publishing</li>
          </ul>

          <h3 className="mb-2 text-xl font-semibold">Markdown to HTML example</h3>
          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)" }}>
            <div className="grid md:grid-cols-2">
              <div className="border-b p-4 md:border-b-0 md:border-r" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <p className="mb-2 text-sm font-medium">Markdown</p>
                <pre className="overflow-auto text-sm"><code>{`## Launch checklist\n\n- Update docs\n- Ship pricing table\n- Publish release notes`}</code></pre>
              </div>
              <div className="p-4" style={{ background: "var(--surface)" }}>
                <p className="mb-2 text-sm font-medium">HTML</p>
                <pre className="overflow-auto text-sm"><code>{`<h2>Launch checklist</h2>\n<ul>\n  <li>Update docs</li>\n  <li>Ship pricing table</li>\n  <li>Publish release notes</li>\n</ul>`}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h3 className="mb-2 font-semibold">Output notes</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--muted)" }}>
              <li>HTML output is semantic and readable</li>
              <li>Tables, links, lists, and code blocks are preserved</li>
              <li>Download includes a full HTML file with default styling</li>
              <li>No uploads and no account required</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h3 className="mb-2 font-semibold">Related tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/markdown-to-pdf/" className="text-blue-500 hover:underline">Markdown to PDF</Link></li>
              <li><Link href="/markdown-to-word/" className="text-blue-500 hover:underline">Markdown to Word</Link></li>
              <li><Link href="/markdown-table-generator/" className="text-blue-500 hover:underline">Markdown Table Generator</Link></li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="mt-12 max-w-4xl">
        <h2 className="mb-4 text-2xl font-bold">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqData.map((f, i) => (
            <details key={i} className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
