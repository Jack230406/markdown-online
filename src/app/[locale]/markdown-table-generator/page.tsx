"use client";

import Link from "next/link";
import { useState, useCallback, useMemo, useRef } from "react";

export default function MarkdownTableGeneratorPage() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [data, setData] = useState<string[][]>(() =>
    Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 4 }, (_, c) => (r === 0 ? `Header ${c + 1}` : ""))
    )
  );
  const [align, setAlign] = useState<("left" | "center" | "right")[]>(() => Array(4).fill("left"));
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const updateCell = (r: number, c: number, val: string) => {
    setData((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = val;
      return next;
    });
  };

  const addRow = () => {
    setRows((r) => r + 1);
    setData((prev) => [...prev, Array(cols).fill("")]);
  };

  const addCol = () => {
    setCols((c) => c + 1);
    setData((prev) => prev.map((row) => [...row, ""]));
    setAlign((prev) => [...prev, "left"]);
  };

  const removeRow = () => {
    if (rows <= 2) return;
    setRows((r) => r - 1);
    setData((prev) => prev.slice(0, -1));
  };

  const removeCol = () => {
    if (cols <= 2) return;
    setCols((c) => c - 1);
    setData((prev) => prev.map((row) => row.slice(0, -1)));
    setAlign((prev) => prev.slice(0, -1));
  };

  const clearTable = () => {
    setRows(4);
    setCols(4);
    setData(Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (_, c) => (r === 0 ? `Header ${c + 1}` : ""))));
    setAlign(Array(4).fill("left"));
  };

  const cycleAlign = (c: number) => {
    const order: ("left" | "center" | "right")[] = ["left", "center", "right"];
    setAlign((prev) => {
      const next = [...prev];
      next[c] = order[(order.indexOf(next[c]) + 1) % 3];
      return next;
    });
  };

  const parseTableText = (text: string): string[][] => {
    const lines = text.trim().split(/\r?\n/).filter((l) => l.trim());
    if (!lines.length) return [];
    const firstLine = lines[0];
    let delimiter = "\t";
    if (!firstLine.includes("\t")) delimiter = firstLine.includes("|") ? "|" : ",";

    return lines
      .filter((l) => !/^[\s|:-]+$/.test(l))
      .map((l) => {
        let row = l.split(delimiter).map((cell) => cell.trim());
        if (delimiter === "|" && row[0] === "") row = row.slice(1);
        if (delimiter === "|" && row[row.length - 1] === "") row = row.slice(0, -1);
        return row;
      });
  };

  const applyImport = (parsed: string[][]) => {
    if (!parsed.length) return;
    const maxCols = Math.max(...parsed.map((r) => r.length));
    const normalized = parsed.map((r) => {
      const padded = [...r];
      while (padded.length < maxCols) padded.push("");
      return padded;
    });
    setData(normalized);
    setRows(normalized.length);
    setCols(maxCols);
    setAlign(Array(maxCols).fill("left"));
    setImportText("");
    setShowImport(false);
  };

  const handleImportPaste = () => {
    const parsed = parseTableText(importText);
    if (parsed.length) applyImport(parsed);
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") {
        const parsed = parseTableText(text);
        if (parsed.length) applyImport(parsed);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const formatTable = () => setData((prev) => prev.map((row) => row.map((cell) => cell.trim())));

  const markdown = useMemo(() => {
    if (!data.length) return "";
    const widths = Array.from({ length: cols }, (_, c) => Math.max(3, ...data.map((row) => (row[c] || "").length)));
    const pad = (s: string, len: number) => s + " ".repeat(Math.max(0, len - s.length));
    const header = "| " + data[0].map((cell, c) => pad(cell || "", widths[c])).join(" | ") + " |";
    const separator = "| " + widths.map((w, c) => {
      const dashes = "-".repeat(w);
      if (align[c] === "center") return `:${dashes.slice(1, -1)}:`;
      if (align[c] === "right") return `${dashes.slice(0, -1)}:`;
      return dashes;
    }).join(" | ") + " |";
    const body = data.slice(1).map((row) => "| " + row.map((cell, c) => pad(cell || "", widths[c])).join(" | ") + " |");
    return [header, separator, ...body].join("\n");
  }, [data, cols, align]);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  const downloadMd = useCallback(() => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table.md";
    a.click();
    URL.revokeObjectURL(url);
  }, [markdown]);

  const alignIcon = (a: string) => (a === "left" ? "⬅" : a === "center" ? "↔" : "➡");

  const faqData = [
    { q: "Can I paste data directly from Excel or Google Sheets?", a: "Yes. Paste tab-separated data directly into the import box, or upload a CSV file." },
    { q: "Can I control column alignment?", a: "Yes. Each column has a quick alignment toggle for left, center, and right alignment." },
    { q: "Does it format the final Markdown table for me?", a: "Yes. The generated Markdown is padded and aligned so it stays readable and ready to copy." },
    { q: "Is this useful for README files and docs?", a: "Yes. It is built for practical table creation in README files, documentation, blog posts, and notes." },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="mb-8 rounded-2xl border px-6 py-8" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h1 className="text-3xl font-bold sm:text-4xl">Markdown Table Generator</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          Build Markdown tables visually, paste data from Excel or CSV, switch alignment with one click, and copy clean table syntax for README files, docs, and posts.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={copy} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            {copied ? "✓ Copied" : "Copy Markdown"}
          </button>
          <button onClick={downloadMd} className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>
            Download .md
          </button>
          <button onClick={formatTable} className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>
            Format cells
          </button>
          <button onClick={() => setShowImport(!showImport)} className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>
            Import data
          </button>
          <input ref={csvInputRef} type="file" accept=".csv,.tsv,.txt" onChange={handleCsvUpload} className="hidden" />
          <button onClick={() => csvInputRef.current?.click()} className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>
            Upload CSV
          </button>
          <button onClick={clearTable} className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>
            Clear table
          </button>
        </div>
      </section>

      {showImport && (
        <div className="mb-6 rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <label className="mb-2 block text-sm font-medium">Paste CSV, TSV, or spreadsheet data</label>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            className="mb-3 w-full rounded-xl border p-3 text-sm outline-none"
            style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)", minHeight: 120 }}
            placeholder={"Name\tRole\tStatus\nAlice\tEditor\tReady\nBob\tReviewer\tPending"}
          />
          <div className="flex gap-2">
            <button onClick={handleImportPaste} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Import data</button>
            <button onClick={() => { setShowImport(false); setImportText(""); }} className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>Cancel</button>
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={addRow} className="rounded-full border px-3 py-1.5 text-sm hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>+ Row</button>
        <button onClick={removeRow} className="rounded-full border px-3 py-1.5 text-sm hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>- Row</button>
        <button onClick={addCol} className="rounded-full border px-3 py-1.5 text-sm hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>+ Column</button>
        <button onClick={removeCol} className="rounded-full border px-3 py-1.5 text-sm hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>- Column</button>
      </div>

      <div className="mb-1 flex" style={{ paddingLeft: 40 }}>
        {Array.from({ length: cols }, (_, c) => (
          <div key={c} className="flex flex-1 justify-center" style={{ minWidth: 90 }}>
            <button onClick={() => cycleAlign(c)} className="rounded-full border px-3 py-1 text-xs hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>
              {alignIcon(align[c])} {align[c]}
            </button>
          </div>
        ))}
      </div>

      <div className="mb-8 overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border)" }}>
        <table className="w-full border-collapse">
          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                <td className="w-[40px] p-0 text-center text-xs align-middle" style={{ color: "var(--muted)" }}>{r + 1}</td>
                {row.map((cell, c) => (
                  <td key={c} className="border p-0" style={{ borderColor: "var(--border)" }}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => updateCell(r, c, e.target.value)}
                      className={`w-full border-none px-3 py-2 text-sm outline-none ${r === 0 ? "font-semibold" : ""}`}
                      style={{ background: r === 0 ? "var(--surface-alt)" : "var(--surface)", color: "var(--foreground)", minWidth: 100, textAlign: align[c] }}
                      placeholder={r === 0 ? "Header" : "Cell"}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-10">
        <label className="mb-2 block text-sm font-medium">Generated Markdown</label>
        <pre className="overflow-auto rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <code>{markdown}</code>
        </pre>
      </div>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div>
          <h2 className="mb-3 text-2xl font-bold">Built for one of the most annoying Markdown tasks</h2>
          <p className="mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
            Hand-writing Markdown tables is slow and error-prone. This page turns table creation into a quick visual task: paste your data, adjust alignment, then copy a clean Markdown table that is ready for GitHub, docs, or publishing.
          </p>

          <h3 className="mb-2 text-xl font-semibold">Best ways to use it</h3>
          <ul className="mb-6 list-inside list-disc space-y-2" style={{ color: "var(--muted)" }}>
            <li>Paste directly from Excel, Sheets, CSV, or TSV</li>
            <li>Format a README pricing table or feature matrix</li>
            <li>Generate aligned docs tables without hand-editing separators</li>
            <li>Copy clean Markdown instantly for publishing or commit-ready docs</li>
          </ul>

          <h3 className="mb-2 text-xl font-semibold">Why this page matters</h3>
          <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
            Unlike generic editors, this tool solves a specific job. It is especially useful when you already have spreadsheet data and need a Markdown-friendly version fast.
          </p>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h3 className="mb-2 font-semibold">Quick wins</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--muted)" }}>
              <li>CSV / TSV import</li>
              <li>One-click alignment changes</li>
              <li>Readable generated syntax</li>
              <li>Copy or download in one step</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h3 className="mb-2 font-semibold">Related tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-blue-500 hover:underline">Markdown Editor</Link></li>
              <li><Link href="/markdown-to-html/" className="text-blue-500 hover:underline">Markdown to HTML</Link></li>
              <li><Link href="/markdown-cheat-sheet/" className="text-blue-500 hover:underline">Markdown Cheat Sheet</Link></li>
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
