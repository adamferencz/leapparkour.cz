import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Invoice } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const invoiceId = new URL(request.url).searchParams.get("invoice");
  const supabase = await createClient();
  const query = supabase.from("invoices").select("*").eq("club_registration_id", id);
  const { data, error } = invoiceId
    ? await query.eq("id", invoiceId).maybeSingle()
    : await query.order("created_at", { ascending: true }).limit(1).maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Faktura nebyla nalezena." }, { status: 404 });
  }

  const invoice = data as Invoice;
  const downloaded = await supabase.storage
    .from("invoices")
    .download(invoice.storage_path);

  if (downloaded.error || !downloaded.data) {
    return NextResponse.json({ error: "PDF faktury se nepodařilo načíst." }, { status: 404 });
  }

  return new NextResponse(await downloaded.data.arrayBuffer(), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="faktura-${invoice.invoice_number}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
