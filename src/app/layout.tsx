import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Markdown Online - Free Markdown Editor",
    template: "%s | Markdown Online",
  },
  description:
    "Free online Markdown editor with live preview, syntax highlighting, and export options. Write, edit, and preview Markdown in real-time. No signup required.",
  keywords: [
    "markdown editor",
    "online markdown",
    "markdown preview",
    "free markdown editor",
    "markdown to html",
  ],
  metadataBase: new URL("https://markdownonline.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://markdownonline.com",
    siteName: "Markdown Online",
    title: "Markdown Online - Free Markdown Editor",
    description:
      "Free online Markdown editor with live preview and export options. No signup required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Online - Free Markdown Editor",
    description:
      "Free online Markdown editor with live preview and export options.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* TODO: Google Analytics */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" /> */}

        {/* TODO: Google AdSense */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" /> */}
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
