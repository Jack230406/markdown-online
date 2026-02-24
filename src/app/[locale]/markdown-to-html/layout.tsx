import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown to HTML Converter - Free Online Tool | Markdown Online",
  description:
    "Convert Markdown to clean HTML code for free. Paste your Markdown, get the HTML output instantly. Copy or download the HTML file. No signup required.",
  openGraph: {
    title: "Markdown to HTML Converter - Free Online Tool | Markdown Online",
    description:
      "Convert Markdown to clean HTML code for free. Copy or download the HTML output instantly.",
    type: "website",
    url: "https://markdownonline.com/markdown-to-html/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
