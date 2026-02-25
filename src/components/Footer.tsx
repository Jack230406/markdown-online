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
          <Link href="/about" className="transition-colors hover:text-primary">{t("about")}</Link>
          <Link href="/privacy" className="transition-colors hover:text-primary">{t("privacy")}</Link>
          <Link href="/terms" className="transition-colors hover:text-primary">{t("terms")}</Link>
          <Link href="/contact" className="transition-colors hover:text-primary">{t("contact")}</Link>
        </nav>
      </div>
    </footer>
  );
}
