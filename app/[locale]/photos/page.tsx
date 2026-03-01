import { getTranslations } from "next-intl/server";
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

export default async function PhotosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "photos" });
  const photos = getPhotos();

  return (
    <div className="prose prose-gray dark:prose-invert m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-base text-gray-500 dark:text-gray-400 slide-enter-2">
        {t("subtitle")}
      </p>

      {photos.length === 0 ? (
        <div className="not-prose mt-8 text-center py-20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 slide-enter-3">
          <p className="text-gray-400 text-sm">{t("empty")}</p>
        </div>
      ) : (
        // CSS columns 实现瀑布流布局
        <div className="not-prose mt-8 columns-2 sm:columns-3 gap-3 slide-enter-3">
          {photos.map((src) => (
            <div key={src} className="break-inside-avoid mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full rounded-lg object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
