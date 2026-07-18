"use client";

import { useState } from "react";

interface YouTubeProps {
  id: string;
  title: string;
}

/** Lehký YouTube embed — načte iframe až po kliknutí (rychlejší stránka). */
export function YouTube({ id, title }: YouTubeProps) {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <div className="aspect-video overflow-hidden rounded-2xl">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-navy"
      aria-label={`Přehrát video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={title}
        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-60"
        loading="lazy"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform group-hover:scale-110">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.14v13.72L19 12 8 5.14z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
