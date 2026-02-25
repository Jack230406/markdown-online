"use client";

import { useState, useMemo, useCallback } from "react";
import MarkdownIt from "markdown-it";

const SAMPLE = `# Project Report

## Introduction

This is a sample document to demonstrate **Markdown to PDF** conversion.

## Key Features

- Clean typography
- Proper page formatting
- Code block support
- Table rendering

> "The best way to predict the future is to create it." — Peter Drucker

### Code Example

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`

### Data Table

| Metric | Q1 | Q2 | Q3 |
|--------|-----|-----|-----|
| Revenue | $10K | $15K | $22K |
| Users | 1000 | 2500 | 5000 |

## Conclusion

Markdown makes document creation simple and efficient.
`;

export default function MarkdownToPdfPage() {
  const [content, setContent] = useState(SAMPLE);
  const [activeTab, setActiveTab] = useState<"input" | "preview">("input");
  const [converting, setConverting] = useState(false);

  const md = useMemo(
    () => MarkdownIt({ html: true, linkify: true, typographer: true }),
    []
  );
  const renderedHtml = useMemo(() => md.render(content), [md, content]);

  const exportPdf = useCallback(async () => {
    setConverting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const container = document.createElement("div");
      container.innerHTML = renderedHtml;
      container.style.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';
      container.style.lineHeight = "1.7";
      container.style.color = "#1a1a2e";
      container.style.padding = "0";

      const style = document.createElement("style");
      style.textContent = `
        h1,h2{border-bottom:1px solid #e2e8f0;padding-bottom:.3em}
        code{background:#f1f5f9;padding:.2em .4em;border-radius:3px;font-size:.9em}
        pre{background:#f1f5f9;padding:1em;border-radius:6px;overflow-x:auto}
        pre code{background:none;padding:0}
        blockquote{border-left:4px solid #3b82f6;margin:1em 0;padding:.5em 1em;background:#f1f5f9}
        table{border-collapse:collapse;width:100%}
        th,td{border:1px solid #e2e8f0;padding:.5em 1em;text-align:left}
        th{background:#f1f5f9}
        img{max-width:100%}
        a{color:#3b82f6}
      `;
      container.prepend(style);

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
    { q: "Is this Markdown to PDF converter free?", a: "Yes, 100% free with no signup, no watermarks, and no file limits." },
    { q: "Is my data secure?", a: "All conversion happens locally in your browser. Your content is never uploaded to any server." },
    { q: "What paper size is used?", a: "The default output is A4 size with 15mm margins. The PDF is optimized for printing." },
    { q: "Can I convert large documents?", a: "Yes, but very large documents may take a few seconds to process since the conversion runs in your browser." },
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

        <h1 className="mb-2 text-3xl font-bold">Markdown to PDF Converter</h1>
        <p className="mb-6" style={{ color: "var(--muted)" }}>
          Convert your Markdown documents to high-quality PDF files. Free, no signup required.
        </p>

        <div className="mb-4">
          <button
            onClick={exportPdf}
            disabled={converting}
            className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
          >
            {converting ? "Converting..." : "⬇ Download PDF"}
          </button>
        </div>

        {/* Mobile tabs */}
        <div className="mb-4 flex border-b md:hidden" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={() => setActiveTab("input")}
            className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "input" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}
          >
            Markdown
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "preview" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}
          >
            Preview
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2" style={{ minHeight: 400 }}>
          <div className={`${activeTab === "preview" ? "hidden md:block" : ""}`}>
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
            <label className="mb-1 block text-sm font-medium">PDF Preview</label>
            <div
              className="markdown-preview h-[400px] overflow-auto rounded-lg border p-4"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>
        </div>

        {/* SEO Content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">How to Convert Markdown to PDF Online</h2>
          <p className="mb-4 leading-relaxed">
            Our free Markdown to PDF converter lets you transform Markdown documents into professionally formatted PDF files directly in your browser. No software installation, no account creation, and no file uploads required. Your documents stay private because all processing happens locally on your device.
          </p>
          <h3 className="mb-2 text-xl font-semibold">Simple 3-Step Process</h3>
          <ol className="mb-6 list-inside list-decimal space-y-2">
            <li>Paste or type your Markdown content in the editor</li>
            <li>Preview the formatted output in the right panel</li>
            <li>Click &quot;Download PDF&quot; to save your document</li>
          </ol>
          <h3 className="mb-2 text-xl font-semibold">Why Convert Markdown to PDF?</h3>
          <p className="mb-4 leading-relaxed">
            PDF is the universal document format for sharing and printing. While Markdown is excellent for writing, you often need to share documents with people who don&apos;t use Markdown editors. Converting to PDF gives you a polished, professional document that looks great on any device and can be easily printed. Our converter produces clean PDFs with proper typography, code formatting, and table rendering.
          </p>
          <p className="mb-4 leading-relaxed">
            This tool is perfect for developers who write documentation in Markdown and need to share it with non-technical stakeholders, students preparing reports, or anyone who wants to create professional-looking documents from simple Markdown text. The generated PDF includes proper headings hierarchy, styled code blocks, formatted tables, and clean blockquotes.
          </p>

          <div className="mt-8 rounded-lg border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h3 className="mb-2 font-semibold">Related Tools</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/" className="text-blue-500 hover:underline">Markdown Editor</a> — Full-featured online Markdown editor</li>
              <li><a href="/markdown-to-html/" className="text-blue-500 hover:underline">Markdown to HTML</a> — Convert Markdown to HTML code</li>
              <li><a href="/markdown-to-word/" className="text-blue-500 hover:underline">Markdown to Word</a> — Export Markdown as .docx files</li>
            </ul>
          </div>

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

      </div>
    </>
  );
}
