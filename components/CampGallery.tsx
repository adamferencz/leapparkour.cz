"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryPhoto = {
  src: string;
  alt: string;
};

export default function CampGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + photos.length) % photos.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % photos.length,
        );
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, photos.length]);

  function showPrevious() {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + photos.length) % photos.length,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % photos.length,
    );
  }

  return (
    <>
      <div className="mt-12 flex gap-5 overflow-x-auto pb-4 [scroll-snap-type:x_mandatory]">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] w-[78vw] shrink-0 overflow-hidden rounded-2xl bg-slate-200 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand sm:w-[46vw] lg:w-[31%] [scroll-snap-align:start]"
            aria-label={`Zvětšit fotku ${index + 1}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw"
            />
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
              Zvětšit
            </span>
          </button>
        ))}
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label="Zvětšená fotka z LeapCampu"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/12 text-2xl font-semibold text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Zavřít galerii"
          >
            ×
          </button>

          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-3xl font-semibold text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Předchozí fotka"
          >
            ‹
          </button>

          <div className="relative h-[72vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl">
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-3xl font-semibold text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Další fotka"
          >
            ›
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white">
            {(activeIndex ?? 0) + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
