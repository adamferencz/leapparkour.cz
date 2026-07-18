"use client";

import Link from "next/link";
import { SUPABASE_CONFIG_ERROR } from "@/lib/supabase/config";

export default function AdminError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const isConfigError = error.message === SUPABASE_CONFIG_ERROR;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center px-5 py-12">
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Administrace
        </p>
        <h1 className="mt-2 text-2xl font-bold text-navy">
          {isConfigError ? "Chybí napojení na Supabase" : "Administrace se nenačetla"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-steel">
          {isConfigError
            ? SUPABASE_CONFIG_ERROR
            : "Zkuste stránku obnovit. Pokud problém trvá, zkontrolujte logy nasazení."}
        </p>
        {isConfigError && (
          <div className="mt-5 rounded-xl bg-slate-50 p-4 font-mono text-xs text-navy">
            <p>NEXT_PUBLIC_SUPABASE_URL</p>
            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
          </div>
        )}
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Zpět na web
        </Link>
      </div>
    </main>
  );
}
