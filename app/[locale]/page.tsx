import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <div>
        <p className="text-lg text-gray-500 dark:text-gray-400">{t("greeting")}</p>
        <h1 className="text-4xl font-bold mt-1">{t("name")}</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-300 max-w-md">{t("bio")}</p>
      <Link
        href="/blog"
        className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-colors"
      >
        {t("viewPosts")}
      </Link>
    </div>
  );
}
