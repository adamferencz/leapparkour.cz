"use client";

import { useEffect, useState } from "react";
import { CLUB_SEASON, SITE } from "@/lib/config";

/** Tlačítko „Vyzkoušet první trénink" — místo přesměrování na přihlášku otevře popup s instrukcemi. */
export function TrialTrainingButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex rounded-full border border-navy/20 bg-white px-6 py-3 font-semibold text-navy transition-[border-color,background-color,transform] duration-200 hover:border-brand hover:bg-blue-50 active:scale-[0.98]"
      >
        Vyzkoušet první trénink
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trial-training-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-7 shadow-xl md:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="trial-training-title" className="text-2xl font-bold text-navy">
                Těšíme se na vás!
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Zavřít"
                className="shrink-0 rounded-full p-1.5 text-steel transition-colors hover:bg-slate-100 hover:text-navy"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="mt-5 space-y-4 leading-relaxed text-steel">
              <p>Na první trénink můžete přijít kdykoliv — stačí, abychom o vás předem věděli.</p>

              <div>
                <p className="font-semibold text-navy">Termíny kroužku:</p>
                <ul className="mt-2 space-y-1.5">
                  {CLUB_SEASON.terms.map((term) => (
                    <li key={term.id} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>
                        <span className="font-medium text-navy">{term.label}</span> — {term.level}, {term.age}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p>Všechno ostatní domluvíme individuálně přímo na kroužku.</p>

              <p>
                Ozvěte se nám prosím předem na telefon{" "}
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="font-semibold text-brand hover:underline">
                  {SITE.phone}
                </a>{" "}
                nebo e-mail{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-brand hover:underline">
                  {SITE.email}
                </a>
                .
              </p>

              <p className="font-semibold text-navy">
                Jakmile se domluvíme, můžete rovnou dorazit — budeme se na vás těšit!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
