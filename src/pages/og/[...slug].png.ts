import type { APIRoute, GetStaticPaths } from "astro";
import { LOCALES, type Locale } from "@/i18n/ui";
import { renderOgImage } from "@/lib/og-image";
import { PAGE_IDS, ogSlug, type PageId } from "@/lib/seo";

interface Props {
  lang: Locale;
  id: PageId;
}

// One PNG per page per locale, generated at build time: /og/home.png, /og/en/about-me.png, ...
export const getStaticPaths = (() =>
  LOCALES.flatMap((lang) =>
    PAGE_IDS.map((id) => ({ params: { slug: ogSlug(lang, id) }, props: { lang, id } })),
  )) satisfies GetStaticPaths;

export const GET: APIRoute<Props> = async ({ props }) => {
  const png = await renderOgImage(props.lang, props.id);
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
