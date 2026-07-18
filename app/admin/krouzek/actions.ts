"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { STATUS_LABELS, type RegistrationStatus } from "@/lib/types";

export async function updateStatus(id: string, formData: FormData) {
  const status = formData.get("status") as RegistrationStatus;
  if (!(status in STATUS_LABELS)) return;

  const supabase = await createClient();
  await supabase
    .from("club_registrations")
    .update({ status })
    .eq("id", id);

  revalidatePath(`/admin/krouzek/${id}`);
  revalidatePath("/admin/krouzek");
  revalidatePath("/admin");
}

export async function updateNotes(id: string, formData: FormData) {
  const raw = (formData.get("admin_notes") as string | null) ?? "";
  const admin_notes = raw.trim() === "" ? null : raw;

  const supabase = await createClient();
  await supabase
    .from("club_registrations")
    .update({ admin_notes })
    .eq("id", id);

  revalidatePath(`/admin/krouzek/${id}`);
}

export async function deleteRegistration(id: string) {
  const supabase = await createClient();
  await supabase.from("club_registrations").delete().eq("id", id);

  revalidatePath("/admin/krouzek");
  revalidatePath("/admin");
  redirect("/admin/krouzek");
}
