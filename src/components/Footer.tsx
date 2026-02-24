"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t py-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-sm sm:flex-row sm:justify-between" style={{ color: "var(--muted)" }}>
        <p>{t("copyright")}</p>
        <nav className="flex gap-4">
          <Link href="/about" className="transition-colors hover:text-primary">{t("resources")}</Link>
          <Link href="/privacy" className="transition-colors hover:text-primary">{t("legal")}</Link>
          <Link href="/contact" className="transition-colors hover:text-primary">{t("resources")}</Link>
        </nav>
      </div>
    </footer>
  );
}
