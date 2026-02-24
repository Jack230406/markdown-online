import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown to PDF Converter - Free Online Tool | Markdown Online",
  description:
    "Convert Markdown to PDF for free. Paste your Markdown, preview it live, and download a beautifully formatted PDF. No signup required.",
  openGraph: {
    title: "Markdown to PDF Converter - Free Online Tool | Markdown Online",
    description:
      "Convert Markdown to PDF for free. Paste your Markdown, preview it live, and download a beautifully formatted PDF.",
    type: "website",
    url: "https://markdownonline.com/markdown-to-pdf/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
