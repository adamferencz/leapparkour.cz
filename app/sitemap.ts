import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";

const UPDATED_AT = new Date("2026-07-28");

function parseCzechDate(value: string) {
  const match = value.match(/(\d{1,2})\.(\d{1,2})\.\s*(\d{4})/);
  if (!match) return UPDATED_AT;

  const [, day, month, year] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://leapparkour.cz";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/krouzek`,
      lastModified: UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/krouzek/prihlaska`,
      lastModified: UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/krouzek/informace`,
      lastModified: UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tabor`,
      lastModified: UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tabor/prihlaska`,
      lastModified: UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tabor/informace`,
      lastModified: UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: UPDATED_AT,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/prihlaska`,
      lastModified: UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/obchodni-podminky`,
      lastModified: UPDATED_AT,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ochrana-osobnich-udaju`,
      lastModified: UPDATED_AT,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: UPDATED_AT,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: parseCzechDate(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
