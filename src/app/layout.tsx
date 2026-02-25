import type { Metadata } from "next";
import Script from "next/script";
import { getHreflangAlternates } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Markdown Online - Free Markdown Editor & Converter with Live Preview",
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
    title: "Markdown Online - Free Markdown Editor & Converter with Live Preview",
    description:
      "Free online Markdown editor with live preview, syntax highlighting, and export options. No signup required.",
    url: "https://markdownonline.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Online - Free Markdown Editor & Converter with Live Preview",
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
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4R8T9CBRZG" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-4R8T9CBRZG');`}
        </Script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
