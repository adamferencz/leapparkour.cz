import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Děkujeme za přihlášku",
  description:
    "Vaši přihlášku na parkourový kroužek jsme přijali. Brzy se vám ozveme s platebními údaji.",
};

export default function DekujemePage() {
  return (
    <div className="container-site py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 text-3xl font-bold md:text-4xl">
            Děkujeme za přihlášku!
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 text-steel">
            Vaši přihlášku na kroužek jsme v pořádku přijali. Brzy se vám ozveme
            na uvedený e-mail s platebními údaji a dalšími informacemi. Pokud od
            nás e-mail neuvidíte, zkontrolujte prosím i složku spam.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-brand px-6 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]"
            >
              Zpět na hlavní stránku
            </Link>
            <Link
              href="/krouzek"
              className="inline-block py-2.5 font-semibold text-brand hover:underline"
            >
              Více o kroužku →
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
