"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import MarkdownIt from "markdown-it";
import { DEFAULT_MARKDOWN } from "@/lib/default-content";
import { toolbarActions, insertMarkdown } from "@/lib/toolbar-actions";

const STORAGE_KEY = "markdown-online-content";
const SAVE_DELAY = 2000;

export function MarkdownEditor() {
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "idle">("idle");
  const [copied, setCopied] = useState<string | null>(null);
  const [syncScroll, setSyncScroll] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollingRef = useRef<"editor" | "preview" | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const md = useMemo(
    () => MarkdownIt({ html: true, linkify: true, typographer: true }),
    []
  );

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setContent(saved ?? DEFAULT_MARKDOWN);
    if (saved) setSaveStatus("saved");
  }, []);

  // Debounced auto-save
  useEffect(() => {
    if (!content) return;
    setSaveStatus("saving");
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, content);
      setSaveStatus("saved");
    }, SAVE_DELAY);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [content]);

  const renderedHtml = useMemo(() => md.render(content), [md, content]);

  // Word & character count
  const wordCount = useMemo(() => {
    const trimmed = content.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [content]);
  const charCount = content.length;

  const handleToolbarClick = useCallback(
    (index: number) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const action = toolbarActions[index];
      const newContent = insertMarkdown(textarea, action);
      setContent(newContent);
    },
    []
  );

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const shortcuts: Record<string, number> = {
        b: 0, // Bold
        i: 1, // Italic
        h: 2, // Heading
        k: 3, // Link
      };
      const index = shortcuts[e.key.toLowerCase()];
      if (index !== undefined) {
        e.preventDefault();
        handleToolbarClick(index);
      }
    },
    [handleToolbarClick]
  );

  // Sync scroll between editor and preview
  const handleEditorScroll = useCallback(() => {
    if (!syncScroll || scrollingRef.current === "preview") return;
    scrollingRef.current = "editor";
    const textarea = textareaRef.current;
    const preview = previewRef.current;
    if (!textarea || !preview) return;
    const ratio = textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight || 1);
    preview.scrollTop = ratio * (preview.scrollHeight - preview.clientHeight);
    requestAnimationFrame(() => { scrollingRef.current = null; });
  }, [syncScroll]);

  const handlePreviewScroll = useCallback(() => {
    if (!syncScroll || scrollingRef.current === "editor") return;
    scrollingRef.current = "preview";
    const textarea = textareaRef.current;
    const preview = previewRef.current;
    if (!textarea || !preview) return;
    const ratio = preview.scrollTop / (preview.scrollHeight - preview.clientHeight || 1);
    textarea.scrollTop = ratio * (textarea.scrollHeight - textarea.clientHeight);
    requestAnimationFrame(() => { scrollingRef.current = null; });
  }, [syncScroll]);

  // Export functions
  const downloadFile = useCallback(
    (filename: string, contentStr: string, mime: string) => {
      const blob = new Blob([contentStr], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    },
    []
  );

  const downloadMd = useCallback(() => {
    downloadFile("document.md", content, "text/markdown");
  }, [content, downloadFile]);

  const downloadHtml = useCallback(() => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Markdown Export</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.7; color: #1a1a2e; }
h1, h2 { border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3em; }
code { background: #f1f5f9; padding: 0.2em 0.4em; border-radius: 3px; font-size: 0.9em; }
pre { background: #f1f5f9; padding: 1em; border-radius: 6px; overflow-x: auto; }
pre code { background: none; padding: 0; }
blockquote { border-left: 4px solid #3b82f6; margin: 1em 0; padding: 0.5em 1em; background: #f1f5f9; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #e2e8f0; padding: 0.5em 1em; text-align: left; }
th { background: #f1f5f9; }
img { max-width: 100%; }
a { color: #3b82f6; }
</style>
</head>
<body>${renderedHtml}</body>
</html>`;
    downloadFile("document.html", html, "text/html");
  }, [renderedHtml, downloadFile]);

  const downloadPdf = useCallback(async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const container = document.createElement("div");
    container.innerHTML = renderedHtml;
    container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    container.style.lineHeight = "1.7";
    container.style.color = "#1a1a2e";
    html2pdf()
      .set({
        margin: 15,
        filename: "markdown-export.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(container)
      .save();
  }, [renderedHtml]);

  const copyToClipboard = useCallback(
    async (text: string, label: string) => {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    },
    []
  );

  // Upload .md file
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result;
        if (typeof text === "string") setContent(text);
      };
      reader.readAsText(file);
      e.target.value = "";
    },
    []
  );

  // Reset editor
  const handleReset = useCallback(() => {
    if (window.confirm("Clear the editor and start fresh?")) {
      setContent(DEFAULT_MARKDOWN);
      localStorage.removeItem(STORAGE_KEY);
      setSaveStatus("idle");
    }
  }, []);

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div style={{ background: "var(--surface)" }}>
        {/* Row 1: File operations + Status bar */}
        <div
          className="flex flex-wrap items-center gap-1 border-b px-3 py-1.5"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Copy group */}
          <div className="flex items-center gap-1">
            <span className="mr-1 text-[10px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Copy</span>
            <button onClick={() => copyToClipboard(content, "md")} title="Copy Markdown" className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-sm transition-colors hover:bg-gray-200 hover:text-primary dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
              {copied === "md" ? "✓ Copied" : "MD"}
            </button>
            <button onClick={() => copyToClipboard(renderedHtml, "html")} title="Copy HTML" className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-sm transition-colors hover:bg-gray-200 hover:text-primary dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
              {copied === "html" ? "✓ Copied" : "HTML"}
            </button>
          </div>

          {/* File operations group */}
          <div className="flex items-center gap-1">
            <span className="mr-1 text-[10px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>File</span>
            <button onClick={downloadMd} title="Download .md" className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-sm transition-colors hover:bg-gray-200 hover:text-primary dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
              ↓ .md
            </button>
            <button onClick={downloadHtml} title="Export HTML" className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-sm transition-colors hover:bg-gray-200 hover:text-primary dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
              ↓ .html
            </button>
            <button onClick={downloadPdf} title="Export PDF" className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-sm transition-colors hover:bg-gray-200 hover:text-primary dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
              ↓ PDF
            </button>
            <input ref={fileInputRef} type="file" accept=".md,.markdown,.txt" onChange={handleFileUpload} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} title="Upload .md file" className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-sm transition-colors hover:bg-gray-200 hover:text-primary dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
              ↑ Upload
            </button>
            <button onClick={handleReset} title="Reset editor" className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-sm transition-colors hover:bg-gray-200 hover:text-primary dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
              ⟲ Reset
            </button>
          </div>

          {/* Status bar */}
          <div className="ml-auto flex items-center gap-3 text-xs" style={{ color: "var(--muted)" }}>
            <label className="flex cursor-pointer items-center gap-1 select-none">
              <input type="checkbox" checked={syncScroll} onChange={(e) => setSyncScroll(e.target.checked)} className="accent-blue-500" />
              Sync Scroll
            </label>
            <span>{wordCount} words · {charCount} chars</span>
            {saveStatus === "saved" && (
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                Saved
              </span>
            )}
            {saveStatus === "saving" && (
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
                Saving...
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Formatting buttons */}
        <div
          className="flex flex-wrap items-center gap-1 border-b px-3 py-1.5"
          style={{ borderColor: "var(--border)" }}
        >
          {toolbarActions.map((action, i) => (
            <button
              key={action.label}
              onClick={() => handleToolbarClick(i)}
              title={action.label}
              className="rounded px-2 py-1 text-sm font-medium transition-colors hover:bg-[var(--surface-alt)] hover:text-primary"
              style={{ minWidth: 32 }}
            >
              {action.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="flex border-b md:hidden" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={() => setActiveTab("editor")}
          className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
            activeTab === "editor" ? "border-b-2 border-primary text-primary" : ""
          }`}
          style={activeTab !== "editor" ? { color: "var(--muted)" } : undefined}
        >
          Editor
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
            activeTab === "preview" ? "border-b-2 border-primary text-primary" : ""
          }`}
          style={activeTab !== "preview" ? { color: "var(--muted)" } : undefined}
        >
          Preview
        </button>
      </div>

      {/* Editor + Preview split pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor pane */}
        <div
          className={`flex-1 ${activeTab === "preview" ? "hidden md:flex" : "flex"} flex-col`}
          style={{ borderRight: "1px solid var(--border)" }}
        >
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleEditorScroll}
            className="editor-textarea h-full w-full flex-1 border-none bg-transparent p-4 outline-none"
            placeholder="Type your Markdown here..."
            spellCheck={false}
          />
        </div>

        {/* Preview pane */}
        <div
          ref={previewRef}
          onScroll={handlePreviewScroll}
          className={`flex-1 ${activeTab === "editor" ? "hidden md:block" : "block"} overflow-auto p-4`}
        >
          <div
            className="markdown-preview mx-auto max-w-none"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>
    </div>
  );
}
