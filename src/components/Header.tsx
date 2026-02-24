"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="border-b" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h20v18H2z" />
              <path d="M6 9l3 3-3 3" />
              <path d="M13 15h5" />
            </svg>
            <span className="text-primary">Markdown</span>
            <span>Online</span>
          </Link>
          <nav className="hidden items-center gap-4 text-sm md:flex" style={{ color: "var(--muted)" }}>
            <Link href="/" className="transition-colors hover:text-primary">Editor</Link>
            <div className="group relative">
              <button className="transition-colors hover:text-primary">Tools ▾</button>
              <div className="invisible absolute left-0 top-full z-50 min-w-[200px] rounded-lg border py-1 shadow-lg group-hover:visible" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <Link href="/markdown-to-html/" className="block px-4 py-2 text-sm transition-colors hover:bg-[var(--surface-alt)]">Markdown to HTML</Link>
                <Link href="/markdown-to-pdf/" className="block px-4 py-2 text-sm transition-colors hover:bg-[var(--surface-alt)]">Markdown to PDF</Link>
                <Link href="/markdown-to-word/" className="block px-4 py-2 text-sm transition-colors hover:bg-[var(--surface-alt)]">Markdown to Word</Link>
              </div>
            </div>
            <Link href="/about/" className="transition-colors hover:text-primary">About</Link>
            <Link href="/contact/" className="transition-colors hover:text-primary">Contact</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg p-2 transition-colors hover:bg-[var(--surface-alt)]"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          )}
          <nav className="flex items-center gap-2 md:hidden">
            <Link href="/about/" className="rounded-lg p-2 text-sm transition-colors hover:bg-[var(--surface-alt)]">About</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
