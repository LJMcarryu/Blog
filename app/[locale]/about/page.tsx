import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SKILLS } from "@/data/skills";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="prose m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-base slide-enter-2" style={{ color: "var(--fg-light)" }}>
        {t("subtitle")}
      </p>

      <div className="slide-enter-3">
        <p>{t("bio1")}</p>
        <p>{t("bio2")}</p>
      </div>

      <div className="slide-enter-4">
        <h3>{t("skills")}</h3>
        <div className="not-prose flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm rounded-full border"
              style={{
                color: "var(--fg-light)",
                borderColor: "var(--border)"
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="slide-enter-5">
        <hr />
        <h3>{t("elsewhere")}</h3>
        <div className="not-prose flex flex-col gap-3">
          <Link
            href="/now"
            className="text-sm transition-opacity opacity-60 hover:opacity-100"
            style={{ color: "var(--fg)" }}
          >
            {t("nowLink")}
          </Link>
          <Link
            href="/uses"
            className="text-sm transition-opacity opacity-60 hover:opacity-100"
            style={{ color: "var(--fg)" }}
          >
            {t("usesLink")}
          </Link>
          <Link
            href="/books"
            className="text-sm transition-opacity opacity-60 hover:opacity-100"
            style={{ color: "var(--fg)" }}
          >
            {t("booksLink")}
          </Link>
          <Link
            href="/links"
            className="text-sm transition-opacity opacity-60 hover:opacity-100"
            style={{ color: "var(--fg)" }}
          >
            {t("linksLink")}
          </Link>
        </div>
      </div>
    </div>
  );
}
