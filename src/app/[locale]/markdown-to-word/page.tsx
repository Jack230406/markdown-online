"use client";

import Link from "next/link";
import { useState, useMemo, useCallback, useRef } from "react";
import MarkdownIt from "markdown-it";

const SAMPLE = `# Meeting Notes

**Date:** March 6, 2026
**Owner:** Product Team

## Agenda

1. Status updates
2. Delivery risks
3. Next steps

## Notes

- Final review scheduled for Friday
- Docs export is part of the release checklist
- Client handoff requires a .docx copy

> Word export is useful when the receiver expects an editable file.

| Item | Owner | Status |
|------|-------|--------|
| Spec | Alan | Ready |
| Review | Team | Pending |
| Handoff | Ops | Planned |
`;

export default function MarkdownToWordPage() {
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

  const exportWord = useCallback(async () => {
    setConverting(true);
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import("docx");
      const { saveAs } = await import("file-saver");

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
        } else if (line.trim() === "") {
          children.push(new Paragraph({ text: "" }));
        } else {
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
    { q: "When should I export Markdown to Word?", a: "Use Word export when the final receiver expects an editable .docx file for review, collaboration, or formal delivery." },
    { q: "What formatting is preserved?", a: "Headings, bold text, lists, blockquotes, and common paragraph structure are preserved. Complex table formatting may vary." },
    { q: "Will the output open in Microsoft Word and Google Docs?", a: "Yes. The generated file is a standard .docx document compatible with Word, Google Docs, and LibreOffice." },
    { q: "Does the export happen locally?", a: "Yes. The .docx file is generated in your browser, so your Markdown content is not uploaded." },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="mb-8 rounded-2xl border px-6 py-8" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h1 className="text-3xl font-bold sm:text-4xl">Markdown to Word Converter</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          Export Markdown as an editable .docx file for handoff, client delivery, schoolwork, business docs, and team review workflows.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={exportWord} disabled={converting} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            {converting ? "Converting..." : "Download .docx"}
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
          <label className="mb-2 block text-sm font-medium">Document preview</label>
          <div className="markdown-preview h-[440px] overflow-auto rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }} dangerouslySetInnerHTML={{ __html: renderedHtml }} />
        </div>
      </div>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div>
          <h2 className="mb-3 text-2xl font-bold">Best for editable delivery, not just viewing</h2>
          <p className="mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
            Use Word export when Markdown is your writing format but the final receiver wants a document they can open, edit, comment on, or pass around in a familiar office workflow.
          </p>

          <h3 className="mb-2 text-xl font-semibold">Good fit for these tasks</h3>
          <ul className="mb-6 list-inside list-disc space-y-2" style={{ color: "var(--muted)" }}>
            <li>Meeting notes that need to be shared in Word format</li>
            <li>Project docs, proposals, and internal handoff files</li>
            <li>Assignments or reports that require a .docx submission</li>
            <li>Teams that write in Markdown but deliver outside developer tools</li>
          </ul>

          <h3 className="mb-2 text-xl font-semibold">What to expect from the export</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Standard .docx output",
              "Readable heading hierarchy",
              "Lists and bold text preserved",
              "Generated in browser without upload",
            ].map((item) => (
              <div key={item} className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h3 className="mb-2 font-semibold">Compatibility notes</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--muted)" }}>
              <li>Opens in Microsoft Word</li>
              <li>Compatible with Google Docs</li>
              <li>Works with LibreOffice</li>
              <li>Best for editable delivery workflows</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h3 className="mb-2 font-semibold">Related tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/markdown-to-html/" className="text-blue-500 hover:underline">Markdown to HTML</Link></li>
              <li><Link href="/markdown-to-pdf/" className="text-blue-500 hover:underline">Markdown to PDF</Link></li>
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
