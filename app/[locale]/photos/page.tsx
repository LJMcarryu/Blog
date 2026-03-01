import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function getPhotos(): string[] {
  const photosDir = path.join(process.cwd(), "public", "photos");
  if (!fs.existsSync(photosDir)) return [];
  return fs
    .readdirSync(photosDir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .map((f) => `/photos/${f}`);
}

function altFromPath(src: string): string {
  const name = src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "photo";
  return name.replace(/[-_]/g, " ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "photos" });
  return { title: t("title") };
}

export default async function PhotosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "photos" });
  const photos = getPhotos();

  return (
    <div className="prose m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-base slide-enter-2" style={{ color: "var(--fg-light)" }}>
        {t("subtitle")}
      </p>

      {photos.length === 0 ? (
        <div className="not-prose mt-8 text-center py-20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 slide-enter-3">
          <p className="text-sm" style={{ color: "var(--fg-light)" }}>{t("empty")}</p>
        </div>
      ) : (
        <div className="not-prose mt-8 columns-2 sm:columns-3 gap-3 slide-enter-3">
          {photos.map((src) => (
            <div key={src} className="break-inside-avoid mb-3">
              <Image
                src={src}
                alt={altFromPath(src)}
                width={800}
                height={600}
                sizes="(max-width: 640px) 50vw, 33vw"
                className="w-full rounded-lg object-cover"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
