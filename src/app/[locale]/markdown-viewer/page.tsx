"use client";

import { useState, useMemo, useCallback } from "react";
import MarkdownIt from "markdown-it";

const SAMPLE = `# Welcome to Markdown Viewer

Paste any Markdown content here to see it rendered beautifully.

## Features

- **Instant rendering** — see formatted output as you paste
- **Full Markdown support** — headings, lists, tables, code blocks
- **Dark mode** — easy on the eyes
- **Free & private** — everything runs in your browser

## Example Code

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Example Table

| Language | Typing | Popular For |
|----------|--------|-------------|
| JavaScript | Dynamic | Web development |
| Python | Dynamic | Data science |
| TypeScript | Static | Large applications |

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci
`;

export default function MarkdownViewerPage() {
  const [content, setContent] = useState(SAMPLE);
  const [activeTab, setActiveTab] = useState<"input" | "preview">("preview");

  const md = useMemo(
    () => MarkdownIt({ html: true, linkify: true, typographer: true }),
    []
  );
  const renderedHtml = useMemo(() => md.render(content), [md, content]);

  const [copied, setCopied] = useState(false);
  const copyHtml = useCallback(async () => {
    await navigator.clipboard.writeText(renderedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [renderedHtml]);

  const faqData = [
    { q: "What is a Markdown viewer?", a: "A Markdown viewer renders raw Markdown text into formatted, readable HTML output so you can see how your document will look." },
    { q: "Is this viewer free?", a: "Yes, completely free with no signup. All rendering happens in your browser." },
    { q: "Can I paste Markdown from GitHub?", a: "Yes! Paste any GitHub-flavored Markdown and it will render correctly, including tables, task lists, and code blocks." },
    { q: "Is my content private?", a: "Absolutely. Your content never leaves your browser. We don't store or transmit any data." },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="ad-placeholder mb-4 flex h-[90px] items-center justify-center rounded border text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }} />

      <h1 className="mb-2 text-3xl font-bold">Markdown Viewer</h1>
      <p className="mb-6" style={{ color: "var(--muted)" }}>
        Paste your Markdown to see it rendered instantly. Free, no signup required.
      </p>

      <div className="mb-4">
        <button onClick={copyHtml} className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
          {copied ? "✓ Copied HTML!" : "Copy HTML"}
        </button>
      </div>

      {/* Mobile tabs */}
      <div className="mb-4 flex border-b md:hidden" style={{ borderColor: "var(--border)" }}>
        <button onClick={() => setActiveTab("input")} className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "input" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}>
          Markdown
        </button>
        <button onClick={() => setActiveTab("preview")} className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "preview" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}>
          Preview
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2" style={{ minHeight: 400 }}>
        <div className={`${activeTab === "preview" ? "hidden md:block" : ""}`}>
          <label className="mb-1 block text-sm font-medium">Markdown Input</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}
            className="h-[500px] w-full rounded-lg border p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500"
            style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
            spellCheck={false} />
        </div>
        <div className={`${activeTab === "input" ? "hidden md:block" : ""}`}>
          <label className="mb-1 block text-sm font-medium">Rendered Preview</label>
          <div className="markdown-preview h-[500px] overflow-auto rounded-lg border p-4"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            dangerouslySetInnerHTML={{ __html: renderedHtml }} />
        </div>
      </div>

      <section className="mt-12 max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold">Online Markdown Viewer</h2>
        <p className="mb-4 leading-relaxed">
          Our free Markdown Viewer lets you paste any Markdown text and instantly see the rendered output. Perfect for previewing README files, documentation, blog posts, or any Markdown content before publishing.
        </p>
        <p className="mb-4 leading-relaxed">
          The viewer supports the full CommonMark specification plus GitHub Flavored Markdown extensions including tables, task lists, strikethrough, and fenced code blocks. All rendering happens locally in your browser — your content is never sent to any server.
        </p>
        <p className="mb-4 leading-relaxed">
          Use this tool to quickly check how your Markdown will look when rendered, verify table formatting, preview code blocks, or share formatted content by copying the HTML output. It works on desktop and mobile devices with a responsive split-pane layout.
        </p>
      </section>

      <div className="mt-8 max-w-3xl rounded-lg border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h3 className="mb-2 font-semibold">Related Tools</h3>
        <ul className="space-y-1 text-sm">
          <li><a href="/" className="text-blue-500 hover:underline">Markdown Editor</a> — Write and edit Markdown with live preview</li>
          <li><a href="/markdown-to-html/" className="text-blue-500 hover:underline">Markdown to HTML</a> — Get the raw HTML code</li>
          <li><a href="/markdown-cheat-sheet/" className="text-blue-500 hover:underline">Cheat Sheet</a> — Quick Markdown syntax reference</li>
        </ul>
      </div>

      <section className="mt-10 max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((f, i) => (
            <details key={i} className="rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="ad-placeholder mt-8 flex h-[90px] items-center justify-center rounded border text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }} />
    </div>
  );
}