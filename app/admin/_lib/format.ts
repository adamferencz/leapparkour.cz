import { CLUB_SEASON, WHATSAPP_CHOICES } from "@/lib/config";
import type { ClubRegistration } from "@/lib/types";

/** Mapa id termínu → lidský label (z centrální konfigurace sezóny) */
const TERM_LABELS: Record<string, string> = Object.fromEntries(
  CLUB_SEASON.terms.map((t) => [t.id, t.label])
);

export function termLabel(id: string): string {
  return TERM_LABELS[id] ?? id;
}

export function termLabels(ids: string[]): string {
  return ids.map(termLabel).join(", ");
}

const WHATSAPP_LABELS: Record<string, string> = Object.fromEntries(
  WHATSAPP_CHOICES.map((c) => [c.value, c.label])
);

/** Lidský popis volby WhatsApp skupiny včetně případné vlastní odpovědi */
export function whatsappLabel(
  reg: Pick<ClubRegistration, "whatsapp_choice" | "whatsapp_other">
): string {
  if (reg.whatsapp_choice === "other") {
    return reg.whatsapp_other
      ? `Jiná odpověď: ${reg.whatsapp_other}`
      : "Jiná odpověď";
  }
  return WHATSAPP_LABELS[reg.whatsapp_choice] ?? reg.whatsapp_choice;
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Prague",
  });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "Europe/Prague",
  });
}

/** České skloňování počtu přihlášek */
export function pluralRegistrations(n: number): string {
  if (n === 1) return "1 přihláška";
  if (n >= 2 && n <= 4) return `${n} přihlášky`;
  return `${n} přihlášek`;
}
