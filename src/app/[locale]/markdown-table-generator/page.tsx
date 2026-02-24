"use client";

import { useState, useCallback, useMemo } from "react";

export default function MarkdownTableGeneratorPage() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [data, setData] = useState<string[][]>(() =>
    Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 4 }, (_, c) => (r === 0 ? `Header ${c + 1}` : ""))
    )
  );
  const [align, setAlign] = useState<("left"|"center"|"right")[]>(() => Array(4).fill("left"));
  const [copied, setCopied] = useState(false);

  const updateCell = (r: number, c: number, val: string) => {
    setData(prev => { const n = prev.map(row => [...row]); n[r][c] = val; return n; });
  };
  const addRow = () => { setRows(r => r + 1); setData(prev => [...prev, Array(cols).fill("")]); };
  const addCol = () => { setCols(c => c + 1); setData(prev => prev.map(row => [...row, ""])); setAlign(prev => [...prev, "left"]); };
  const removeRow = () => { if (rows <= 2) return; setRows(r => r - 1); setData(prev => prev.slice(0, -1)); };
  const removeCol = () => { if (cols <= 2) return; setCols(c => c - 1); setData(prev => prev.map(row => row.slice(0, -1))); setAlign(prev => prev.slice(0, -1)); };
  const cycleAlign = (c: number) => {
    const order: ("left"|"center"|"right")[] = ["left", "center", "right"];
    setAlign(prev => { const n = [...prev]; n[c] = order[(order.indexOf(n[c]) + 1) % 3]; return n; });
  };

  const markdown = useMemo(() => {
    if (!data.length) return "";
    const w = Array.from({ length: cols }, (_, c) => Math.max(3, ...data.map(r => (r[c]||"").length)));
    const pad = (s: string, len: number) => s + " ".repeat(Math.max(0, len - s.length));
    const hdr = "| " + data[0].map((cell, c) => pad(cell||"", w[c])).join(" | ") + " |";
    const sep = "| " + w.map((ww, c) => {
      const d = "-".repeat(ww);
      if (align[c] === "center") return ":" + d.slice(1,-1) + ":";
      if (align[c] === "right") return d.slice(0,-1) + ":";
      return d;
    }).join(" | ") + " |";
    const body = data.slice(1).map(row => "| " + row.map((cell, c) => pad(cell||"", w[c])).join(" | ") + " |");
    return [hdr, sep, ...body].join("\n");
  }, [data, cols, align]);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  const alignIcon = (a: string) => a === "left" ? "⬅" : a === "center" ? "↔" : "➡";

  const faqData = [
    { q: "How do I create a Markdown table?", a: "Use our visual editor above. Fill in the cells, adjust alignment, then copy the generated Markdown code." },
    { q: "Can I change column alignment?", a: "Yes! Click the alignment button above each column to cycle between left, center, and right alignment." },
    { q: "Is this tool free?", a: "Yes, completely free with no signup required. All processing happens in your browser." },
    { q: "What is Markdown table syntax?", a: "Markdown tables use pipes (|) to separate columns and hyphens (-) for the header separator row. Colons (:) control alignment." },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="ad-placeholder mb-4 flex h-[90px] items-center justify-center rounded border text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }} />
      <h1 className="mb-2 text-3xl font-bold">Markdown Table Generator</h1>
      <p className="mb-6" style={{ color: "var(--muted)" }}>Create Markdown tables visually. Edit cells, set alignment, and copy the generated code.</p>

      {/* Controls */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={addRow} className="rounded border px-3 py-1 text-sm hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>+ Row</button>
        <button onClick={removeRow} className="rounded border px-3 py-1 text-sm hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>- Row</button>
        <button onClick={addCol} className="rounded border px-3 py-1 text-sm hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>+ Column</button>
        <button onClick={removeCol} className="rounded border px-3 py-1 text-sm hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)" }}>- Column</button>
        <button onClick={copy} className="rounded-lg bg-blue-500 px-4 py-1 text-sm font-medium text-white hover:bg-blue-600">
          {copied ? "✓ Copied!" : "Copy Markdown"}
        </button>
      </div>

      {/* Alignment buttons */}
      <div className="mb-2 flex gap-1">
        {Array.from({ length: cols }, (_, c) => (
          <button key={c} onClick={() => cycleAlign(c)} className="flex-1 rounded border px-1 py-1 text-center text-xs hover:bg-[var(--surface-alt)]" style={{ borderColor: "var(--border)", minWidth: 60 }} title={`Align: ${align[c]}`}>
            {alignIcon(align[c])} {align[c]}
          </button>
        ))}
      </div>

      {/* Table editor */}
      <div className="mb-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className="border p-0" style={{ borderColor: "var(--border)" }}>
                    <input type="text" value={cell} onChange={(e) => updateCell(r, c, e.target.value)}
                      className={`w-full border-none px-2 py-1.5 text-sm outline-none ${r === 0 ? "font-bold" : ""}`}
                      style={{ background: r === 0 ? "var(--surface-alt)" : "var(--surface)", color: "var(--foreground)", minWidth: 80 }}
                      placeholder={r === 0 ? "Header" : "Cell"} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generated Markdown */}
      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium">Generated Markdown</label>
        <pre className="overflow-auto rounded-lg border p-3 text-sm" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <code>{markdown}</code>
        </pre>
      </div>

      {/* SEO Content */}
      <section className="mt-12 max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold">How to Create Markdown Tables</h2>
        <p className="mb-4 leading-relaxed">Our free Markdown Table Generator lets you create perfectly formatted Markdown tables visually. No need to manually type pipes and dashes — just fill in the cells, adjust column alignment, and copy the generated code. It works entirely in your browser with no signup required.</p>
        <h3 className="mb-2 text-xl font-semibold">Markdown Table Syntax</h3>
        <p className="mb-4 leading-relaxed">Markdown tables use pipes (|) to separate columns and hyphens (-) for the header separator. You can control alignment with colons: left-aligned (default), center-aligned (:---:), or right-aligned (---:). Our generator handles all the formatting automatically so you can focus on your content.</p>
        <p className="mb-4 leading-relaxed">Tables are supported in GitHub Flavored Markdown (GFM), most static site generators, documentation platforms, and Markdown editors. They render as clean HTML tables in the final output, making them perfect for data presentation in README files, documentation, and blog posts.</p>
        <p className="mb-4 leading-relaxed">This tool is ideal for developers writing documentation, students formatting data for reports, and anyone who needs to create structured tables quickly. The visual editor makes it easy to see your table structure while the generated Markdown stays perfectly formatted.</p>
      </section>

      <div className="mt-8 max-w-3xl rounded-lg border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h3 className="mb-2 font-semibold">Related Tools</h3>
        <ul className="space-y-1 text-sm">
          <li><a href="/" className="text-blue-500 hover:underline">Markdown Editor</a> — Full-featured online Markdown editor</li>
          <li><a href="/markdown-to-html/" className="text-blue-500 hover:underline">Markdown to HTML</a> — Convert Markdown to HTML code</li>
          <li><a href="/markdown-cheat-sheet/" className="text-blue-500 hover:underline">Markdown Cheat Sheet</a> — Quick reference guide</li>
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