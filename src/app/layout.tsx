import type { Metadata } from "next";
import { getHreflangAlternates } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Markdown Online - Free Markdown Editor",
    template: "%s | Markdown Online",
  },
  description:
    "Free online Markdown editor with live preview, syntax highlighting, and export options. No signup required.",
  metadataBase: new URL("https://markdownonline.app"),
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
    languages: getHreflangAlternates("/"),
  },
  openGraph: {
    type: "website",
    siteName: "Markdown Online",
    title: "Markdown Online - Free Markdown Editor",
    description:
      "Free online Markdown editor with live preview, syntax highlighting, and export options. No signup required.",
    url: "https://markdownonline.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Online - Free Markdown Editor",
    description:
      "Free online Markdown editor with live preview, syntax highlighting, and export options. No signup required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* TODO: Google AdSense */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" /> */}
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
