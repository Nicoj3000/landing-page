import { SITE } from "@/data/site";
import { HTML_LANG } from "@/lib/seo";
import type { Locale } from "@/i18n/ui";

interface PersonInput {
  origin: string;
  lang: Locale;
  name: string;
  jobTitle: string;
  description: string;
  /** Absolute URL of the portrait. */
  image: string;
  knowsAbout: readonly string[];
}

/** Person + WebSite as one linked graph, for every page. */
export function buildJsonLd({ origin, lang, name, jobTitle, description, image, knowsAbout }: PersonInput) {
  const base = origin.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${base}/#person`,
        name,
        alternateName: SITE.brand,
        jobTitle,
        description,
        url: base,
        image,
        email: `mailto:${SITE.mail}`,
        sameAs: [SITE.github, SITE.linkedin],
        knowsAbout,
        address: { "@type": "PostalAddress", addressCountry: "CO" },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: SITE.brand,
        url: base,
        inLanguage: HTML_LANG[lang],
        publisher: { "@id": `${base}/#person` },
      },
    ],
  };
}

/** JSON for an inline <script>: `<` is escaped so no value can close the tag. */
export const serializeJsonLd = (data: unknown): string => JSON.stringify(data).replace(/</g, "\\u003c");
