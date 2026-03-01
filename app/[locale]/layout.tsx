import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navigation from "@/components/Navigation";
import "../globals.css";

export const metadata: Metadata = {
  title: "My Blog",
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

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation />
          <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
