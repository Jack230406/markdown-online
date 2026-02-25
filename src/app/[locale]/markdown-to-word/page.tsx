"use client";

import { useState, useMemo, useCallback } from "react";
import MarkdownIt from "markdown-it";

const SAMPLE = `# Meeting Notes

**Date:** February 24, 2026
**Attendees:** Alice, Bob, Charlie

## Agenda

1. Project status update
2. Budget review
3. Next steps

## Discussion

The team discussed the current progress on the **Q1 deliverables**. Key points:

- Frontend development is 80% complete
- API integration testing starts next week
- Design review scheduled for Friday

> Action item: Bob to prepare the budget report by Thursday.

## Budget Summary

| Category | Allocated | Spent | Remaining |
|----------|-----------|-------|-----------|
| Development | $50,000 | $35,000 | $15,000 |
| Design | $20,000 | $18,000 | $2,000 |
| Testing | $15,000 | $5,000 | $10,000 |

## Next Meeting

Scheduled for **March 3, 2026** at 10:00 AM.
`;

export default function MarkdownToWordPage() {
  const [content, setContent] = useState(SAMPLE);
  const [activeTab, setActiveTab] = useState<"input" | "preview">("input");
  const [converting, setConverting] = useState(false);

  const md = useMemo(
    () => MarkdownIt({ html: true, linkify: true, typographer: true }),
    []
  );
  const renderedHtml = useMemo(() => md.render(content), [md, content]);

  const exportWord = useCallback(async () => {
    setConverting(true);
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import("docx");
      const { saveAs } = await import("file-saver");

      // Parse markdown into lines and create paragraphs
      const lines = content.split("\n");
      const children: InstanceType<typeof Paragraph>[] = [];

      for (const line of lines) {
        if (line.startsWith("# ")) {
          children.push(new Paragraph({ text: line.slice(2), heading: HeadingLevel.HEADING_1 }));
        } else if (line.startsWith("## ")) {
          children.push(new Paragraph({ text: line.slice(3), heading: HeadingLevel.HEADING_2 }));
        } else if (line.startsWith("### ")) {
          children.push(new Paragraph({ text: line.slice(4), heading: HeadingLevel.HEADING_3 }));
        } else if (line.startsWith("> ")) {
          children.push(new Paragraph({
            children: [new TextRun({ text: line.slice(2), italics: true, color: "666666" })],
            indent: { left: 720 },
          }));
        } else if (line.startsWith("- ") || line.startsWith("* ")) {
          children.push(new Paragraph({ text: line.slice(2), bullet: { level: 0 } }));
        } else if (/^\d+\.\s/.test(line)) {
          children.push(new Paragraph({ text: line.replace(/^\d+\.\s/, ""), numbering: { reference: "default-numbering", level: 0 } }));
        } else if (line.startsWith("**") && line.endsWith("**")) {
          children.push(new Paragraph({
            children: [new TextRun({ text: line.slice(2, -2), bold: true })],
          }));
        } else if (line.trim() === "") {
          children.push(new Paragraph({ text: "" }));
        } else {
          // Handle inline bold
          const parts: InstanceType<typeof TextRun>[] = [];
          const regex = /\*\*(.+?)\*\*/g;
          let lastIndex = 0;
          let match;
          while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
              parts.push(new TextRun({ text: line.slice(lastIndex, match.index) }));
            }
            parts.push(new TextRun({ text: match[1], bold: true }));
            lastIndex = regex.lastIndex;
          }
          if (lastIndex < line.length) {
            parts.push(new TextRun({ text: line.slice(lastIndex) }));
          }
          children.push(new Paragraph({ children: parts.length > 0 ? parts : [new TextRun({ text: line })] }));
        }
      }

      const doc = new Document({
        numbering: {
          config: [{
            reference: "default-numbering",
            levels: [{ level: 0, format: "decimal" as const, text: "%1.", alignment: AlignmentType.START }],
          }],
        },
        sections: [{ properties: {}, children }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "document.docx");
    } catch (err) {
      console.error("Word export failed:", err);
      alert("Word export failed. Please try again.");
    } finally {
      setConverting(false);
    }
  }, [content]);

  const faqData = [
    { q: "Is this Markdown to Word converter free?", a: "Yes, completely free. No signup, no watermarks, no limits." },
    { q: "Is my data safe?", a: "All conversion happens in your browser. Your content never leaves your device." },
    { q: "Does it support tables?", a: "Basic table content is preserved as text. Complex table formatting may vary in the Word output." },
    { q: "What Word format is generated?", a: "The tool generates standard .docx files compatible with Microsoft Word, Google Docs, and LibreOffice." },
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

        <h1 className="mb-2 text-3xl font-bold">Markdown to Word Converter</h1>
        <p className="mb-6" style={{ color: "var(--muted)" }}>
          Convert Markdown to .docx Word documents instantly. Free, no signup required.
        </p>

        <div className="mb-4">
          <button
            onClick={exportWord}
            disabled={converting}
            className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
          >
            {converting ? "Converting..." : "⬇ Download .docx"}
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
            <label className="mb-1 block text-sm font-medium">Document Preview</label>
            <div
              className="markdown-preview h-[400px] overflow-auto rounded-lg border p-4"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>
        </div>

        {/* SEO Content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">How to Convert Markdown to Word Online</h2>
          <p className="mb-4 leading-relaxed">
            Our free Markdown to Word converter transforms your Markdown text into professional .docx documents that open in Microsoft Word, Google Docs, and LibreOffice. No software to install, no account to create — just paste your Markdown and download the Word file.
          </p>
          <h3 className="mb-2 text-xl font-semibold">Simple 3-Step Process</h3>
          <ol className="mb-6 list-inside list-decimal space-y-2">
            <li>Paste or type your Markdown content in the editor</li>
            <li>Preview the formatted output in the right panel</li>
            <li>Click &quot;Download .docx&quot; to save your Word document</li>
          </ol>
          <h3 className="mb-2 text-xl font-semibold">Why Convert Markdown to Word?</h3>
          <p className="mb-4 leading-relaxed">
            While Markdown is the preferred format for developers and technical writers, many workplaces and clients expect documents in Word format. Converting Markdown to .docx bridges this gap, letting you write in the format you love while delivering in the format others expect. The generated Word documents preserve headings, bold and italic text, lists, blockquotes, and basic formatting.
          </p>
          <p className="mb-4 leading-relaxed">
            This tool is ideal for preparing meeting notes, project documentation, reports, and proposals. Write efficiently in Markdown, then export a polished Word document ready for sharing with colleagues, clients, or stakeholders who prefer the familiar .docx format. All processing happens locally in your browser, so your sensitive documents remain completely private.
          </p>

          <div className="mt-8 rounded-lg border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h3 className="mb-2 font-semibold">Related Tools</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/" className="text-blue-500 hover:underline">Markdown Editor</a> — Full-featured online Markdown editor</li>
              <li><a href="/markdown-to-html/" className="text-blue-500 hover:underline">Markdown to HTML</a> — Convert Markdown to HTML code</li>
              <li><a href="/markdown-to-pdf/" className="text-blue-500 hover:underline">Markdown to PDF</a> — Export Markdown as PDF files</li>
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
