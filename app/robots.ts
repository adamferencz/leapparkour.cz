import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin/*", "/_next/", "/static/"],
    },
    sitemap: "https://leapparkour.cz/sitemap.xml",
  };
}
