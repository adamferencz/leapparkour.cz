import { CAMP, CLUB_SEASON, SITE } from "@/lib/config";

export const BILLING = {
  baseAmountCzk: CAMP.priceCzk,
  currency: "CZK",
  bankAccount: "341788799/0300",
  iban: "CZ1103000000000341788799",
  bic: "CEKOCZPP",
  dueInDays: 14,
  itemName: `Členský příspěvek na LEAP camp ${CAMP.year} v termínu 3.7.-10.7.2027`,
  supplier: {
    name: SITE.legalName,
    addressLines: ["Práčat 1886", "58001 Havlíčkův Brod", "Česká republika"],
    ico: SITE.ico,
    registry: SITE.registry,
    vatNote: SITE.vatNote,
  },
} as const;

export const CLUB_BILLING = {
  itemName: `Členský příspěvek na parkourový kroužek ${CLUB_SEASON.label}`,
  onceWeekAmountCzk: CLUB_SEASON.priceOnceWeekCzk,
  twiceWeekAmountCzk: CLUB_SEASON.priceTwiceWeekCzk,
} as const;

export function getClubAmountCzk(terms: string[]) {
  return terms.length >= 2
    ? CLUB_BILLING.twiceWeekAmountCzk
    : CLUB_BILLING.onceWeekAmountCzk;
}

export type DiscountCode = {
  id: string;
  code: string;
  label: string | null;
  type: "amount" | "percent";
  value: number;
  active: boolean;
  max_uses: number | null;
  used_count: number;
  valid_from: string | null;
  valid_until: string | null;
  admin_notes: string | null;
};

export function normalizeDiscountCode(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function formatCzk(amount: number) {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatInvoiceCzk(amount: number) {
  return `${new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)} CZK`;
}

export function calculateDiscountAmount(discount: DiscountCode | null, baseAmount: number) {
  if (!discount) return 0;

  const amount =
    discount.type === "percent"
      ? Math.round((baseAmount * discount.value) / 100)
      : discount.value;

  return Math.max(0, Math.min(baseAmount, amount));
}

export function isDiscountUsable(discount: DiscountCode) {
  const today = new Date().toISOString().slice(0, 10);

  if (!discount.active) return false;
  if (discount.valid_from && discount.valid_from > today) return false;
  if (discount.valid_until && discount.valid_until < today) return false;
  if (discount.max_uses !== null && discount.used_count >= discount.max_uses) return false;

  return true;
}

export function buildInvoiceNumber(sequence: number, year = CAMP.year) {
  return `${year}${String(sequence).padStart(4, "0")}`;
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

export function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function buildSpayd({
  amount,
  variableSymbol,
  message,
}: {
  amount: number;
  variableSymbol: string;
  message: string;
}) {
  const sanitizedMessage = message
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 ._-]/g, "")
    .slice(0, 60);

  return [
    "SPD*1.0",
    `ACC:${BILLING.iban}+${BILLING.bic}`,
    `AM:${amount.toFixed(2)}`,
    `CC:${BILLING.currency}`,
    `X-VS:${variableSymbol}`,
    `MSG:${sanitizedMessage}`,
  ].join("*");
}
