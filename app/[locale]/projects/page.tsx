import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PROJECTS } from "@/data/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title") };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <div className="prose m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-base slide-enter-2" style={{ color: "var(--fg-light)" }}>
        {t("subtitle")}
      </p>

      <div className="not-prose mt-8 flex flex-col gap-4 slide-enter-3">
        {PROJECTS.map((project) => (
          <div
            key={project.name}
            className="p-5 rounded-xl border transition-colors"
            style={{
              borderColor: "rgba(125, 125, 125, 0.2)"
            }}
          >
            <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
            <p className="text-sm mb-3" style={{ color: "var(--fg-light)" }}>
              {project.description[locale as "zh" | "en"]}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs rounded-full"
                  style={{
                    color: "var(--fg-light)",
                    backgroundColor: "rgba(125, 125, 125, 0.1)"
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-opacity opacity-60 hover:opacity-100"
                  style={{ color: "var(--fg)" }}
                >
                  {t("github")} ↗
                </a>
              )}
              {project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-opacity opacity-60 hover:opacity-100"
                  style={{ color: "var(--fg)" }}
                >
                  {t("live")} ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
