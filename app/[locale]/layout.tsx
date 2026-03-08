import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Lightbox from "@/components/Lightbox";
import Analytics from "@/components/Analytics";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  ),
  title: {
    default: "Jimmy's Blog",
    template: "%s | Jimmy's Blog",
  },
  description: "个人博客 | Personal Blog",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jimmy's Blog",
    url: siteUrl,
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
  };

  return (
    <html lang={locale} className={`${inter.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        {/* RSS feed discovery */}
        <link rel="alternate" type="application/rss+xml" title="Jimmy's Blog RSS" href="/feed.xml" />
        <Analytics />
        {/* Inline script: apply .dark class before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=localStorage.getItem('blog-color-scheme')||'dark';var sys=window.matchMedia('(prefers-color-scheme:dark)').matches;if(d==='dark'||(d==='auto'&&sys))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation />
          <main className="max-w-3xl mx-auto px-6 py-10 flex-1 w-full">{children}</main>
          <Footer />
          <BackToTop />
          <Lightbox />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
