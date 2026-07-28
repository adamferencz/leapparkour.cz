import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Invoice } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("camp_registration_id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Faktura nebyla nalezena." }, { status: 404 });
  }

  const invoice = data as Invoice;
  const downloaded = await supabase.storage
    .from("invoices")
    .download(invoice.storage_path);

  if (downloaded.error || !downloaded.data) {
    return NextResponse.json({ error: "PDF faktury se nepodařilo stáhnout." }, { status: 404 });
  }

  return new NextResponse(await downloaded.data.arrayBuffer(), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="faktura-${invoice.invoice_number}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
