"use server";

import { revalidatePath } from "next/cache";
import {
  normalizeDiscountCode,
  type DiscountCode,
} from "@/lib/billing/config";
import { createClient } from "@/lib/supabase/server";

function optionalDate(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();
  return raw || null;
}

export async function createDiscountCode(formData: FormData) {
  const code = normalizeDiscountCode(String(formData.get("code") ?? ""));
  const label = String(formData.get("label") ?? "").trim() || null;
  const type = String(formData.get("type") ?? "amount");
  const value = Number(formData.get("value"));
  const maxUsesRaw = String(formData.get("max_uses") ?? "").trim();
  const maxUses = maxUsesRaw ? Number(maxUsesRaw) : null;
  const adminNotes = String(formData.get("admin_notes") ?? "").trim() || null;

  if (!code || !Number.isInteger(value) || value <= 0) return;
  if (type !== "amount" && type !== "percent") return;
  if (type === "percent" && value > 100) return;
  if (maxUses !== null && (!Number.isInteger(maxUses) || maxUses <= 0)) return;

  const supabase = await createClient();
  await supabase.from("discount_codes").insert({
    code,
    label,
    type,
    value,
    max_uses: maxUses,
    valid_from: optionalDate(formData.get("valid_from")),
    valid_until: optionalDate(formData.get("valid_until")),
    admin_notes: adminNotes,
  });

  revalidatePath("/admin/slevy");
}

export async function toggleDiscountCode(id: string, active: boolean) {
  const supabase = await createClient();
  await supabase.from("discount_codes").update({ active: !active }).eq("id", id);
  revalidatePath("/admin/slevy");
}

export async function deleteDiscountCode(id: string) {
  const supabase = await createClient();
  await supabase.from("discount_codes").delete().eq("id", id);
  revalidatePath("/admin/slevy");
}

export async function updateDiscountCode(id: string, formData: FormData) {
  const code = normalizeDiscountCode(String(formData.get("code") ?? ""));
  const label = String(formData.get("label") ?? "").trim() || null;
  const type = String(formData.get("type") ?? "amount");
  const value = Number(formData.get("value"));
  const maxUsesRaw = String(formData.get("max_uses") ?? "").trim();
  const maxUses = maxUsesRaw ? Number(maxUsesRaw) : null;
  const adminNotes = String(formData.get("admin_notes") ?? "").trim() || null;

  if (!code || !Number.isInteger(value) || value <= 0) return;
  if (type !== "amount" && type !== "percent") return;
  if (type === "percent" && value > 100) return;
  if (maxUses !== null && (!Number.isInteger(maxUses) || maxUses <= 0)) return;

  const update: Partial<DiscountCode> = {
    code,
    label,
    type: type as DiscountCode["type"],
    value,
    max_uses: maxUses,
    valid_from: optionalDate(formData.get("valid_from")),
    valid_until: optionalDate(formData.get("valid_until")),
    admin_notes: adminNotes,
  };

  const supabase = await createClient();
  await supabase.from("discount_codes").update(update).eq("id", id);
  revalidatePath("/admin/slevy");
}
