"use client";

import { useState } from "react";

export default function CopyEmailsButton({ emails }: { emails: string[] }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const unique = Array.from(
    new Set(emails.map((e) => e.trim().toLowerCase()).filter(Boolean)),
  );

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(unique.join(", "));
      setState("copied");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 3000);
  }

  if (unique.length === 0) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-slate-50"
    >
      {state === "copied"
        ? `Zkopírováno (${unique.length} e-mailů)`
        : state === "error"
          ? "Kopírování se nepovedlo"
          : `Kopírovat e-maily (${unique.length})`}
    </button>
  );
}
