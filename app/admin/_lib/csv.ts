/**
 * Sestavení CSV pro české Excelové prostředí:
 * oddělovač středník, UTF-8 s BOM, CRLF konce řádků.
 */

type CsvValue = string | number | null | undefined;

/** UTF-8 BOM — díky němu Excel správně rozpozná kódování i diakritiku. */
const BOM = String.fromCharCode(0xfeff);

function csvField(value: CsvValue): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function buildCsv(headers: string[], rows: CsvValue[][]): string {
  const lines = [headers, ...rows].map((row) => row.map(csvField).join(";"));
  return BOM + lines.join("\r\n") + "\r\n";
}

export function csvResponse(csv: string, filename: string): Response {
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
