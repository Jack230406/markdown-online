"use client";

import { useState, useMemo, useCallback } from "react";
import MarkdownIt from "markdown-it";

const SAMPLE = `# Hello World

This is a **Markdown** document. Convert it to clean HTML instantly.

## Features

- Live preview
- One-click copy
- Download as .html file

> Blockquotes work too!

\`\`\`javascript
console.log("Hello from Markdown!");
\`\`\`

| Feature | Status |
|---------|--------|
| Tables | ✅ |
| Links | ✅ |
| Images | ✅ |
`;

export default function MarkdownToHtmlPage() {
  const [content, setContent] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"input" | "output">("input");

  const md = useMemo(
    () => MarkdownIt({ html: true, linkify: true, typographer: true }),
    []
  );

  const renderedHtml = useMemo(() => md.render(content), [md, content]);

  const copyHtml = useCallback(async () => {
    await navigator.clipboard.writeText(renderedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [renderedHtml]);

  const downloadHtml = useCallback(() => {
    const full = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Converted Document</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;max-width:800px;margin:0 auto;padding:2rem;line-height:1.7;color:#1a1a2e}h1,h2{border-bottom:1px solid #e2e8f0;padding-bottom:.3em}code{background:#f1f5f9;padding:.2em .4em;border-radius:3px;font-size:.9em}pre{background:#f1f5f9;padding:1em;border-radius:6px;overflow-x:auto}pre code{background:none;padding:0}blockquote{border-left:4px solid #3b82f6;margin:1em 0;padding:.5em 1em;background:#f1f5f9}table{border-collapse:collapse;width:100%}th,td{border:1px solid #e2e8f0;padding:.5em 1em;text-align:left}th{background:#f1f5f9}img{max-width:100%}a{color:#3b82f6}</style>
</head><body>${renderedHtml}</body></html>`;
    const blob = new Blob([full], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    a.click();
    URL.revokeObjectURL(url);
  }, [renderedHtml]);

  const faqData = [
    { q: "Is this Markdown to HTML converter free?", a: "Yes, completely free with no signup required. All conversion happens in your browser." },
    { q: "Is my data safe?", a: "Absolutely. Your Markdown content never leaves your browser. We don't store or transmit any of your data." },
    { q: "What Markdown features are supported?", a: "We support standard Markdown syntax including headings, bold, italic, links, images, code blocks, tables, blockquotes, and lists." },
    { q: "Can I use this offline?", a: "Once the page is loaded, the converter works entirely in your browser, so it works even with a slow connection." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Ad placeholder top */}
        <div className="ad-placeholder mb-4 flex h-[90px] items-center justify-center rounded border text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }} />

        <h1 className="mb-2 text-3xl font-bold">Markdown to HTML Converter</h1>
        <p className="mb-6" style={{ color: "var(--muted)" }}>
          Convert your Markdown to clean, semantic HTML instantly. Free, no signup required.
        </p>

        {/* Action buttons */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={copyHtml}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            {copied ? "✓ Copied!" : "Copy HTML"}
          </button>
          <button
            onClick={downloadHtml}
            className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--surface-alt)]"
            style={{ borderColor: "var(--border)" }}
          >
            ↓ Download .html
          </button>
        </div>

        {/* Mobile tabs */}
        <div className="mb-4 flex border-b md:hidden" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={() => setActiveTab("input")}
            className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "input" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}
          >
            Markdown Input
          </button>
          <button
            onClick={() => setActiveTab("output")}
            className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "output" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}
          >
            HTML Output
          </button>
        </div>

        {/* Editor panels */}
        <div className="grid gap-4 md:grid-cols-2" style={{ minHeight: 400 }}>
          <div className={`${activeTab === "output" ? "hidden md:block" : ""}`}>
            <label className="mb-1 block text-sm font-medium">Markdown Input</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-[400px] w-full rounded-lg border p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
              spellCheck={false}
            />
          </div>
          <div className={`${activeTab === "input" ? "hidden md:block" : ""}`}>
            <label className="mb-1 block text-sm font-medium">HTML Output</label>
            <pre
              className="h-[400px] overflow-auto rounded-lg border p-3 text-sm"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <code>{renderedHtml}</code>
            </pre>
          </div>
        </div>

        {/* SEO Content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">How to Convert Markdown to HTML Online</h2>
          <p className="mb-4 leading-relaxed">
            Our free Markdown to HTML converter transforms your Markdown text into clean, semantic HTML code instantly. Whether you&apos;re a developer building a website, a technical writer preparing documentation, or a blogger formatting content, this tool makes the conversion process effortless and fast.
          </p>
          <h3 className="mb-2 text-xl font-semibold">How to Use This Tool</h3>
          <ol className="mb-6 list-inside list-decimal space-y-2">
            <li>Paste or type your Markdown content in the left panel</li>
            <li>The HTML output appears instantly in the right panel</li>
            <li>Click &quot;Copy HTML&quot; to copy the generated code to your clipboard</li>
            <li>Or click &quot;Download .html&quot; to save a complete HTML file with styling</li>
          </ol>
          <h3 className="mb-2 text-xl font-semibold">Why Use Markdown to HTML Conversion?</h3>
          <p className="mb-4 leading-relaxed">
            Markdown is a lightweight markup language that&apos;s easy to write and read. However, web browsers render HTML, not Markdown. Converting Markdown to HTML allows you to use your Markdown content on websites, in emails, in CMS platforms, and anywhere HTML is accepted. Our converter preserves all formatting including headings, lists, tables, code blocks, blockquotes, links, and images.
          </p>
          <p className="mb-4 leading-relaxed">
            Unlike other converters that require you to upload files or create an account, our tool works entirely in your browser. Your content is never sent to any server, ensuring complete privacy and security. The conversion happens in real-time as you type, so you can see the HTML output immediately and make adjustments on the fly.
          </p>
          <h3 className="mb-2 text-xl font-semibold">Supported Markdown Features</h3>
          <p className="mb-4 leading-relaxed">
            This converter supports the full CommonMark specification plus popular extensions. You can use headings (H1-H6), bold and italic text, ordered and unordered lists, task lists, tables with alignment, fenced code blocks with syntax highlighting hints, blockquotes, horizontal rules, inline code, links, images, and HTML pass-through. The output is clean, well-structured HTML that&apos;s ready to use in any web project.
          </p>

          {/* Related tools */}
          <div className="mt-8 rounded-lg border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h3 className="mb-2 font-semibold">Related Tools</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/" className="text-blue-500 hover:underline">Markdown Editor</a> — Full-featured online Markdown editor with live preview</li>
              <li><a href="/markdown-to-pdf/" className="text-blue-500 hover:underline">Markdown to PDF</a> — Convert Markdown to PDF documents</li>
              <li><a href="/markdown-to-word/" className="text-blue-500 hover:underline">Markdown to Word</a> — Export Markdown as .docx files</li>
            </ul>
          </div>

          {/* FAQ */}
          <h2 className="mb-4 mt-10 text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((f, i) => (
              <details key={i} className="rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Ad placeholder bottom */}
        <div className="ad-placeholder mt-8 flex h-[90px] items-center justify-center rounded border text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }} />
      </div>
    </>
  );
}
