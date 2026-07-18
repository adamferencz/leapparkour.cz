import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog";

const BLOG_SLUG_ALIASES: Record<string, string> = {
  "useful-mikiny": "bud-silny-abys-byl-uzitecny",
};

function parseCzechDate(date: string) {
  const match = date.match(/^(\d{1,2})\.(\d{1,2})\.\s*(\d{4})$/);
  if (!match) return undefined;

  const [, day, month, year] = match;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    ...BLOG_POSTS.map((post) => ({
      slug: post.slug,
    })),
    ...Object.keys(BLOG_SLUG_ALIASES).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = BLOG_SLUG_ALIASES[slug] ?? slug;
  const post = BLOG_POSTS.find((p) => p.slug === canonicalSlug);
  if (!post) return {};
  const url = `https://leapparkour.cz/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url,
      type: "article",
      publishedTime: parseCzechDate(post.date),
      siteName: "Leap Parkour",
      locale: "cs_CZ",
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const canonicalSlug = BLOG_SLUG_ALIASES[slug] ?? slug;
  const post = BLOG_POSTS.find((p) => p.slug === canonicalSlug);
  if (!post) notFound();
  const publishedDate = parseCzechDate(post.date);

  // JSON-LD Article Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://leapparkour.cz${post.coverImage}`,
    ...(publishedDate ? { "datePublished": publishedDate } : {}),
    "author": {
      "@type": "Organization",
      "name": "Leap Parkour",
      "logo": "https://leapparkour.cz/images/logo.svg",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Leap Parkour",
      "logo": {
        "@type": "ImageObject",
        "url": "https://leapparkour.cz/images/logo.svg",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://leapparkour.cz/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-dark"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Zpět na blog
          </Link>

          <header className="mt-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-steel">
              <span>{post.author}</span>
              <span>•</span>
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <div className="relative mt-8 aspect-video overflow-hidden rounded-3xl bg-slate-100 shadow-sm">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
            />
          </div>

          <div 
            className="prose prose-slate prose-brand mt-10 max-w-none text-navy leading-relaxed
                       [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-navy
                       [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-navy
                       [&_p]:mb-6 [&_p]:text-steel/90
                       [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-steel/90
                       [&_li]:mb-2
                       [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-brand [&_blockquote]:my-8
                       [&_a]:text-brand [&_a]:font-bold [&_a]:underline hover:[&_a]:text-brand-dark
                       [&_figure.blog-inline-photo]:my-8
                       [&_figure.blog-inline-photo_img]:aspect-video [&_figure.blog-inline-photo_img]:w-full [&_figure.blog-inline-photo_img]:rounded-2xl [&_figure.blog-inline-photo_img]:object-cover [&_figure.blog-inline-photo_img]:shadow-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  );
}
