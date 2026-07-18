import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog a články o parkouru",
  description:
    "Přečtěte si články o parkouru pro děti, bezpečnosti na trénincích, o našem letním táboře Leap Camp a dalších tématech z komunity Leap Parkour.",
  path: "/blog",
  image: "/images/blog/blog-18.webp",
  imageAlt: "Blog Leap Parkour - články o parkouru, tréninku a táborech",
});

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-site">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold md:text-5xl">Blog a články</h1>
          <p className="mt-4 text-lg text-steel">
            Zajímavosti ze světa parkouru, rady pro rodiče a aktuality z naší komunity.
          </p>
        </header>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <Link href={`/blog/${post.slug}`} className="relative aspect-video overflow-hidden bg-slate-100">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-steel/80">
                  <time>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-3 text-xl font-bold leading-snug text-navy group-hover:text-brand">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-3 line-clamp-3 text-sm text-steel">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-dark"
                  >
                    Číst dál
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
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
