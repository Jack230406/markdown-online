import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-sm sm:flex-row sm:justify-between" style={{ color: "var(--muted)" }}>
        <p>&copy; {new Date().getFullYear()} Markdown Online. Free online Markdown editor.</p>
        <nav className="flex gap-4">
          <Link href="/about/" className="transition-colors hover:text-primary">About</Link>
          <Link href="/privacy/" className="transition-colors hover:text-primary">Privacy</Link>
          <Link href="/contact/" className="transition-colors hover:text-primary">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
