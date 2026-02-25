"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();

  useEffect(() => setMounted(true), []);

  const toolLinks = [
    { href: "/markdown-to-html" as const, label: t("toHtml") },
    { href: "/markdown-to-pdf" as const, label: t("toPdf") },
    { href: "/markdown-to-word" as const, label: t("toWord") },
    { href: "/markdown-viewer" as const, label: t("viewer") },
    { href: "/markdown-cheat-sheet" as const, label: t("cheatSheet") },
    { href: "/markdown-table-generator" as const, label: t("tableGenerator") },
  ];

  const locales = [
    { code: "en", label: "EN", href: "/" },
    { code: "es", label: "ES", href: "/es/" },
    { code: "zh", label: "中文", href: "/zh/" },
  ] as const;

  const otherLocales = locales.filter((l) => l.code !== locale);

  return (
    <header className="border-b" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Markdown Online logo">
              <title>Markdown Online</title>
              <path d="M2 3h20v18H2z" />
              <path d="M6 9l3 3-3 3" />
              <path d="M13 15h5" />
            </svg>
            <span className="text-primary">Markdown</span>
            <span>Online</span>
          </Link>
          <nav className="hidden items-center gap-4 text-sm md:flex" style={{ color: "var(--muted)" }}>
            <Link href="/" className="transition-colors hover:text-primary">{t("editor")}</Link>
            <div className="group relative">
              <button className="transition-colors hover:text-primary">{t("tools")} ▾</button>
              <div className="invisible absolute left-0 top-full z-50 min-w-[220px] rounded-lg border py-1 shadow-lg group-hover:visible" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                {toolLinks.map((tool) => (
                  <Link key={tool.href} href={tool.href} className="block px-4 py-2 text-sm transition-colors hover:bg-[var(--surface-alt)]">{tool.label}</Link>
                ))}
              </div>
            </div>
            <Link href="/about" className="transition-colors hover:text-primary">{t("about")}</Link>
            <Link href="/contact" className="transition-colors hover:text-primary">{t("contact")}</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="group relative">
            <button className="rounded-lg px-2 py-1 text-xs font-medium transition-colors hover:bg-[var(--surface-alt)]">
              {locales.find((l) => l.code === locale)?.label ?? "EN"} ▾
            </button>
            <div className="invisible absolute right-0 top-full z-50 min-w-[80px] rounded-lg border py-1 shadow-lg group-hover:visible" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
              {otherLocales.map((l) => (
                <a
                  key={l.code}
                  href={l.href}
                  className="block px-4 py-2 text-xs font-medium transition-colors hover:bg-[var(--surface-alt)]"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
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
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 transition-colors hover:bg-[var(--surface-alt)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12h18" />
                  <path d="M3 6h18" />
                  <path d="M3 18h18" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t px-4 py-3 md:hidden" style={{ borderColor: "var(--border)" }}>
          <nav className="flex flex-col gap-1 text-sm" style={{ color: "var(--muted)" }}>
            <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 transition-colors hover:bg-[var(--surface-alt)] hover:text-primary">
              {t("editor")}
            </Link>
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide opacity-60">
              {t("tools")}
            </div>
            {toolLinks.map((tool) => (
              <Link key={tool.href} href={tool.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 pl-6 transition-colors hover:bg-[var(--surface-alt)] hover:text-primary">
                {tool.label}
              </Link>
            ))}
            <Link href="/about" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 transition-colors hover:bg-[var(--surface-alt)] hover:text-primary">
              {t("about")}
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 transition-colors hover:bg-[var(--surface-alt)] hover:text-primary">
              {t("contact")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
