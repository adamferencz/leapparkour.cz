import type { Metadata } from "next";

const SITE_URL = "https://leapparkour.cz";
const SITE_NAME = "Leap Parkour";
const DEFAULT_IMAGE = "/images/2024_08_krouzek.jpg";

type SeoOptions = {
  title: string | Metadata["title"];
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  robots?: Metadata["robots"];
};

function metadataTitleToString(title: SeoOptions["title"]) {
  if (typeof title === "string") return title;
  if (title && typeof title === "object") {
    if ("absolute" in title && typeof title.absolute === "string") return title.absolute;
    if ("default" in title && typeof title.default === "string") return title.default;
  }
  return SITE_NAME;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  imageAlt = "Leap Parkour - parkourové kroužky a tábor pro děti",
  type = "website",
  robots,
}: SeoOptions): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const titleText = metadataTitleToString(title);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: titleText,
      description,
      url,
      siteName: SITE_NAME,
      locale: "cs_CZ",
      type,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description,
      images: [image],
    },
    robots,
  };
}
