import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "About Markdown Online",
  description:
    "Learn about Markdown Online, a free browser-based Markdown editor with live preview, export options, and auto-save. No signup or installation required.",
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">About Markdown Online</h1>

      <div className="space-y-6 leading-relaxed" style={{ color: "var(--foreground)" }}>
        <p>
          Markdown Online is a free, open-access Markdown editor built for writers, developers,
          students, and anyone who works with text. Our mission is simple: provide the fastest,
          most intuitive way to write and preview Markdown directly in your browser, with zero
          friction and zero cost.
        </p>

        <h2 className="text-2xl font-semibold">What is Markdown?</h2>
        <p>
          Markdown is a lightweight markup language created by John Gruber in 2004. It allows you
          to write formatted text using a plain-text syntax that is easy to read and easy to write.
          Markdown is widely used for documentation, README files, blog posts, notes, and much more.
          It converts cleanly to HTML, making it a favorite among developers and technical writers
          worldwide.
        </p>

        <h2 className="text-2xl font-semibold">Why Markdown Online?</h2>
        <p>
          There are many Markdown editors available, but most require you to download software,
          create an account, or pay for premium features. Markdown Online takes a different approach.
          Everything runs entirely in your browser. Your content never leaves your device. There are
          no servers processing your text, no accounts to manage, and no subscriptions to worry about.
          Just open the site and start writing.
        </p>

        <h2 className="text-2xl font-semibold">Key Features</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Live Preview:</strong> See your Markdown rendered in real-time as you type.
            The split-pane layout shows your source on the left and the formatted output on the right.
          </li>
          <li>
            <strong>Toolbar Shortcuts:</strong> Quickly insert bold, italic, headings, links, images,
            code blocks, lists, and blockquotes with a single click.
          </li>
          <li>
            <strong>Export Options:</strong> Download your work as a <code>.md</code> file or export
            it as a fully styled HTML document. You can also copy raw Markdown or rendered HTML
            directly to your clipboard.
          </li>
          <li>
            <strong>Auto-Save:</strong> Your content is automatically saved to your browser&apos;s
            local storage every two seconds. Come back later and pick up right where you left off.
          </li>
          <li>
            <strong>Dark Mode:</strong> Toggle between light and dark themes to match your
            preference or system settings.
          </li>
          <li>
            <strong>Mobile Friendly:</strong> The responsive design adapts to any screen size,
            with a tabbed interface on smaller devices.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">Privacy First</h2>
        <p>
          We believe your writing is your own. Markdown Online processes everything client-side.
          Your documents are stored only in your browser&apos;s local storage and are never
          transmitted to any server. We do not collect, store, or have access to any of your
          content. Read our <a href="/privacy/" className="text-primary underline">Privacy Policy</a> for
          more details.
        </p>

        <h2 className="text-2xl font-semibold">Built with Modern Technology</h2>
        <p>
          Markdown Online is built with Next.js, React, and Tailwind CSS. We use the markdown-it
          library for fast, spec-compliant Markdown rendering. The site is statically exported and
          served via a global CDN for the fastest possible load times, no matter where you are in
          the world.
        </p>
      </div>

      {/* Ad placeholder */}
      <div className="ad-placeholder mt-12 flex items-center justify-center rounded border py-8 text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
        {/* AdSense content ad slot */}
      </div>
    </div>
  );
}
