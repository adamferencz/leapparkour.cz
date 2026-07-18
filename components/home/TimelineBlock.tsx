import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface TimelineImage {
  src: string;
  alt: string;
  /** Pro GIFy — next/image je nesmí optimalizovat */
  unoptimized?: boolean;
}

interface TimelineBlockProps {
  title: string;
  /** Fotka bloku (výchozí médium vpravo od textu) */
  image?: TimelineImage;
  /** Vlastní médium místo fotky (např. video embed) */
  media?: ReactNode;
  /** Médium vlevo od textu (na mobilu je vždy pod textem) */
  mediaLeft?: boolean;
  /** Tlačítka pod textem */
  actions?: ReactNode;
  children: ReactNode;
}

/**
 * Jeden blok příběhové časové osy „O nás“ — text + fotka/video.
 * Svislou čáru kreslí rodičovský seznam (viz app/page.tsx), blok přidává tečku.
 * Sloupce se odhalují z opačných stran podle svého umístění (tečka se objeví s blokem).
 */
export function TimelineBlock({
  title,
  image,
  media,
  mediaLeft = false,
  actions,
  children,
}: TimelineBlockProps) {
  const mediaNode =
    media ??
    (image ? (
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-slate-100 shadow-md">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          unoptimized={image.unoptimized}
          sizes="(min-width: 768px) 34rem, 100vw"
          className="object-cover"
        />
      </div>
    ) : null);

  return (
    <li className="relative pl-10 md:pl-0">
      {/* tečka na časové ose */}
      <span
        aria-hidden
        className="absolute left-0 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-brand shadow ring-1 ring-brand/30 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
      />

      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-20">
        <Reveal
          from={mediaLeft ? "right" : "left"}
          className={mediaLeft ? "md:order-2" : undefined}
        >
          <h3 className="text-2xl font-bold md:text-3xl">{title}</h3>
          <div className="mt-4 space-y-4 leading-relaxed [&_strong]:font-semibold [&_strong]:text-navy">
            {children}
          </div>
          {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
        </Reveal>

        {mediaNode && (
          <Reveal
            from={mediaLeft ? "left" : "right"}
            className={mediaLeft ? "md:order-1" : undefined}
          >
            {mediaNode}
          </Reveal>
        )}
      </div>
    </li>
  );
}
