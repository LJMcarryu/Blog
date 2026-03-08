import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <div className="prose m-auto text-center py-20">
      <h1 className="slide-enter-1">404</h1>
      <p
        className="slide-enter-2"
        style={{ color: "var(--fg-light)" }}
      >
        {t("title")}
      </p>
      <Link
        href="/"
        className="not-prose text-sm slide-enter-3 inline-block transition-opacity opacity-50 hover:opacity-100"
        style={{ color: "var(--fg)" }}
      >
        ← {t("backHome")}
      </Link>
    </div>
  );
}
