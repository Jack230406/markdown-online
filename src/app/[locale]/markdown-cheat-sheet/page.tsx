"use client";

import { useState } from "react";

const sections = [
  {
    title: "Headings",
    items: [
      { syntax: "# Heading 1", desc: "Largest heading" },
      { syntax: "## Heading 2", desc: "Second level heading" },
      { syntax: "### Heading 3", desc: "Third level heading" },
      { syntax: "#### Heading 4", desc: "Fourth level heading" },
    ],
  },
  {
    title: "Text Formatting",
    items: [
      { syntax: "**bold text**", desc: "Bold" },
      { syntax: "*italic text*", desc: "Italic" },
      { syntax: "***bold and italic***", desc: "Bold and italic" },
      { syntax: "~~strikethrough~~", desc: "Strikethrough" },
      { syntax: "`inline code`", desc: "Inline code" },
    ],
  },
  {
    title: "Links & Images",
    items: [
      { syntax: "[link text](https://url.com)", desc: "Hyperlink" },
      { syntax: "![alt text](image.jpg)", desc: "Image" },
      { syntax: "[link text](url \"title\")", desc: "Link with title" },
    ],
  },
  {
    title: "Lists",
    items: [
      { syntax: "- Item 1\\n- Item 2\\n- Item 3", desc: "Unordered list" },
      { syntax: "1. First\\n2. Second\\n3. Third", desc: "Ordered list" },
      { syntax: "- [x] Done\\n- [ ] Todo", desc: "Task list" },
    ],
  },
  {
    title: "Blockquotes & Rules",
    items: [
      { syntax: "> This is a quote", desc: "Blockquote" },
      { syntax: ">> Nested quote", desc: "Nested blockquote" },
      { syntax: "---", desc: "Horizontal rule" },
    ],
  },
  {
    title: "Code Blocks",
    items: [
      { syntax: "```language\\ncode here\\n```", desc: "Fenced code block" },
      { syntax: "    indented code", desc: "Indented code block" },
    ],
  },
  {
    title: "Tables",
    items: [
      { syntax: "| H1 | H2 |\\n|---|---|\\n| A | B |", desc: "Basic table" },
      { syntax: "| Left | Center | Right |\\n|:---|:---:|---:|", desc: "Aligned table" },
    ],
  },
];

export default function MarkdownCheatSheetPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copySnippet = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text.replace(/\\n/g, "\n"));
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">

      <h1 className="mb-2 text-3xl font-bold">Markdown Cheat Sheet</h1>
      <p className="mb-8" style={{ color: "var(--muted)" }}>
        A quick reference guide for Markdown syntax. Click any example to copy it.
      </p>

      {/* Syntax sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-3 text-xl font-bold">{section.title}</h2>
            <div className="space-y-2">
              {section.items.map((item, i) => {
                const key = `${section.title}-${i}`;
                return (
                  <div key={key} className="flex items-center gap-3 rounded-lg border p-3" style={{ borderColor: "var(--border)" }}>
                    <code className="flex-1 whitespace-pre-wrap rounded px-2 py-1 text-sm" style={{ background: "var(--surface-alt)" }}>
                      {item.syntax.replace(/\\n/g, "\n")}
                    </code>
                    <span className="shrink-0 text-sm" style={{ color: "var(--muted)" }}>{item.desc}</span>
                    <button
                      onClick={() => copySnippet(item.syntax, key)}
                      className="shrink-0 rounded border px-2 py-1 text-xs hover:bg-[var(--surface-alt)]"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {copied === key ? "✓" : "Copy"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* SEO Content */}
      <section className="mt-12 max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold">Complete Markdown Syntax Guide</h2>
        <p className="mb-4 leading-relaxed">
          Markdown is a lightweight markup language created by John Gruber in 2004. It lets you format text using simple, readable syntax that converts to HTML. This cheat sheet covers all the essential Markdown syntax you need for writing documentation, README files, blog posts, and more.
        </p>
        <p className="mb-4 leading-relaxed">
          The syntax shown above works in GitHub Flavored Markdown (GFM), most static site generators like Next.js and Hugo, documentation platforms like GitBook and Notion, and virtually every Markdown editor available today. Click any example to copy it to your clipboard and paste it directly into your editor.
        </p>
        <p className="mb-4 leading-relaxed">
          For a hands-on experience, try our free online Markdown editor where you can write Markdown and see the rendered output in real-time. You can also export your documents to HTML, PDF, or Word format directly from your browser.
        </p>
      </section>

      <div className="mt-8 max-w-3xl rounded-lg border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h3 className="mb-2 font-semibold">Related Tools</h3>
        <ul className="space-y-1 text-sm">
          <li><a href="/" className="text-blue-500 hover:underline">Markdown Editor</a> — Write and preview Markdown in real-time</li>
          <li><a href="/markdown-table-generator/" className="text-blue-500 hover:underline">Table Generator</a> — Create Markdown tables visually</li>
          <li><a href="/markdown-to-html/" className="text-blue-500 hover:underline">Markdown to HTML</a> — Convert Markdown to HTML code</li>
        </ul>
      </div>

    </div>
  );
}