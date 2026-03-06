"use client";

import Link from "next/link";
import { useState, useMemo, useCallback, useRef } from "react";
import MarkdownIt from "markdown-it";

const SAMPLE = `# Project Report

## Summary

Convert Markdown into a polished PDF for sharing, printing, or archiving.

## Included in this sample

- Headings and paragraphs
- Code blocks
- Tables and lists
- Blockquotes for callouts

> PDF is useful when the document needs to look stable everywhere.

\`\`\`ts
export const status = "ready for review";
\`\`\`

| Section | Status |
|--------|--------|
| Intro | Ready |
| Charts | Ready |
| Notes | Ready |
`;

const PDF_STYLE = `
  h1,h2,h3{margin-top:1.4em}
  h1,h2{border-bottom:1px solid #e2e8f0;padding-bottom:.3em}
  p{margin:1em 0;line-height:1.7}
  code{background:#f1f5f9;padding:.2em .4em;border-radius:4px;font-size:.9em}
  pre{background:#f8fafc;padding:1em;border-radius:8px;overflow-x:auto}
  pre code{background:none;padding:0}
  blockquote{border-left:4px solid #3b82f6;margin:1em 0;padding:.5em 1em;background:#eff6ff}
  table{border-collapse:collapse;width:100%;margin:1em 0}
  th,td{border:1px solid #e2e8f0;padding:.6em .9em;text-align:left}
  th{background:#f8fafc}
  ul,ol{padding-left:1.25rem}
  img{max-width:100%;height:auto}
`;

export default function MarkdownToPdfPage() {
  const [content, setContent] = useState(SAMPLE);
  const [activeTab, setActiveTab] = useState<"input" | "preview">("input");
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const md = useMemo(() => MarkdownIt({ html: true, linkify: true, typographer: true }), []);
  const renderedHtml = useMemo(() => md.render(content), [md, content]);

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

  const exportPdf = useCallback(async () => {
    setConverting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const container = document.createElement("div");
      container.innerHTML = `<style>${PDF_STYLE}</style>${renderedHtml}`;
      container.style.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';
      container.style.lineHeight = "1.7";
      container.style.color = "#1a1a2e";
      container.style.maxWidth = "800px";
      await html2pdf().set({
        margin: [15, 15, 15, 15],
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      }).from(container).save();
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("PDF export failed. Please try again.");
    } finally {
      setConverting(false);
    }
  }, [renderedHtml]);

  const faqData = [
    { q: "What paper size does the exported PDF use?", a: "The export uses A4 with print-friendly margins by default." },
    { q: "Will headings, code blocks, and tables keep their formatting?", a: "Yes. The PDF export keeps common Markdown structure such as headings, code blocks, lists, tables, and blockquotes." },
    { q: "Is this useful for reports and assignments?", a: "Yes. This page is designed for documents that need to be shared, printed, submitted, or archived." },
    { q: "Does my Markdown get uploaded to a server?", a: "No. PDF generation runs in your browser, so private content stays local." },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="mb-8 rounded-2xl border px-6 py-8" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h1 className="text-3xl font-bold sm:text-4xl">Markdown to PDF Converter</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          Export Markdown as a polished PDF for reports, assignments, printable docs, handoff files, and anything else that needs a stable layout.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={exportPdf} disabled={converting} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            {converting ? "Converting..." : "Download PDF"}
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
        <button onClick={() => setActiveTab("preview")} className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "preview" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}>
          Preview
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2" style={{ minHeight: 440 }}>
        <div className={`${activeTab === "preview" ? "hidden md:block" : ""}`}>
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
          <label className="mb-2 block text-sm font-medium">PDF preview</label>
          <div className="markdown-preview h-[440px] overflow-auto rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }} dangerouslySetInnerHTML={{ __html: renderedHtml }} />
        </div>
      </div>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div>
          <h2 className="mb-3 text-2xl font-bold">Best for documents that need to be shared or printed</h2>
          <p className="mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
            Markdown is great for writing, but PDF is better for delivery. Use this page when the document needs a stable format for review, handoff, printing, downloading, or archiving.
          </p>

          <h3 className="mb-2 text-xl font-semibold">What the export is optimized for</h3>
          <ul className="mb-6 list-inside list-disc space-y-2" style={{ color: "var(--muted)" }}>
            <li>A4 page output with print-friendly margins</li>
            <li>Clear heading hierarchy for long documents</li>
            <li>Readable code blocks and formatted tables</li>
            <li>Useful for reports, coursework, documentation, and handoff files</li>
          </ul>

          <h3 className="mb-2 text-xl font-semibold">Typical use cases</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Project reports and internal docs",
              "Assignments and study notes",
              "Printable proposals or briefs",
              "Shared archives of Markdown content",
            ].map((item) => (
              <div key={item} className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h3 className="mb-2 font-semibold">PDF export notes</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--muted)" }}>
              <li>Styled for printing and sharing</li>
              <li>A4 output with balanced margins</li>
              <li>Common Markdown formatting preserved</li>
              <li>Generated entirely in browser</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h3 className="mb-2 font-semibold">Related tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/markdown-to-html/" className="text-blue-500 hover:underline">Markdown to HTML</Link></li>
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
