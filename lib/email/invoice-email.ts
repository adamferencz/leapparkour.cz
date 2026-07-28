import { CAMP, SITE } from "@/lib/config";
import {
  BILLING,
  formatCzk,
} from "@/lib/billing/config";
import type { InvoicePdfData } from "@/lib/billing/invoice-pdf";
import { sendEmail } from "./mailer";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layout(title: string, body: string) {
  return `<!doctype html>
<html lang="cs">
  <body style="margin:0;background:#f8fafc;font-family:Arial,sans-serif;color:#334155">
    <div style="max-width:680px;margin:0 auto;padding:28px 16px">
      <div style="background:white;border-radius:16px;padding:28px;border:1px solid #e5e7eb">
        <h1 style="margin:0 0 18px;color:#1c244b;font-size:25px;line-height:1.25">${escapeHtml(title)}</h1>
        ${body}
      </div>
      <p style="margin:18px 0 0;text-align:center;font-size:12px;color:#64748b">
        ${escapeHtml(SITE.name)} · ${escapeHtml(SITE.email)}
      </p>
    </div>
  </body>
</html>`;
}

export async function sendCampInvoiceEmail({
  to,
  childName,
  invoice,
  pdf,
}: {
  to: string;
  childName: string;
  invoice: InvoicePdfData;
  pdf: Buffer;
}) {
  const discountLine =
    invoice.discountAmountCzk > 0
      ? `Slevový kód: ${invoice.discountCode} (-${formatCzk(invoice.discountAmountCzk)})`
      : "Slevový kód: neuplatněn";

  const parentText = [
    "Dobrý den,",
    "",
    `děkujeme za přihlášení dítěte ${childName} na ${CAMP.label}.`,
    `Prosíme o uhrazení částky ${formatCzk(invoice.totalAmountCzk)} do ${new Intl.DateTimeFormat("cs-CZ").format(
      new Date(invoice.dueDate),
    )}.`,
    "",
    `Číslo účtu: ${BILLING.bankAccount}`,
    `Variabilní symbol: ${invoice.variableSymbol}`,
    `IBAN: ${BILLING.iban}`,
    `BIC/SWIFT: ${BILLING.bic}`,
    discountLine,
    "",
    "Fakturu posíláme v příloze.",
    "",
    `Pokud potřebujete cokoliv upravit, napište nám na ${SITE.email}.`,
    "",
    "Leap Parkour",
  ].join("\n");

  await sendEmail({
    to,
    replyTo: SITE.email,
    subject: `Platba a faktura za ${CAMP.label} - ${childName}`,
    text: parentText,
    html: layout(
      `Platba za ${CAMP.label}`,
      `<p>Dobrý den,</p>
       <p>děkujeme za přihlášení dítěte <strong>${escapeHtml(
         childName,
       )}</strong> na <strong>${escapeHtml(CAMP.label)}</strong>.</p>
       <p>Prosíme o uhrazení částky <strong style="font-size:20px;color:#1c244b">${escapeHtml(
         formatCzk(invoice.totalAmountCzk),
       )}</strong> do <strong>${escapeHtml(
         new Intl.DateTimeFormat("cs-CZ").format(new Date(invoice.dueDate)),
       )}</strong>.</p>
       <div style="background:#f1f5f9;border-radius:14px;padding:16px;margin:20px 0">
         <p style="margin:0 0 8px"><strong>Číslo účtu:</strong> ${escapeHtml(
           BILLING.bankAccount,
         )}</p>
         <p style="margin:0 0 8px"><strong>Variabilní symbol:</strong> ${escapeHtml(
           invoice.variableSymbol,
         )}</p>
         <p style="margin:0 0 8px"><strong>IBAN:</strong> ${escapeHtml(BILLING.iban)}</p>
         <p style="margin:0"><strong>BIC/SWIFT:</strong> ${escapeHtml(BILLING.bic)}</p>
       </div>
       ${
         invoice.discountAmountCzk > 0
           ? `<p>Uplatněná sleva: <strong>${escapeHtml(
               invoice.discountCode ?? "",
             )}</strong> (-${escapeHtml(formatCzk(invoice.discountAmountCzk))}).</p>`
           : ""
       }
       <p>Fakturu posíláme v příloze.</p>
       <p>Pokud potřebujete cokoliv upravit, napište nám na <a href="mailto:${escapeHtml(
         SITE.email,
       )}" style="color:#2f63d4">${escapeHtml(SITE.email)}</a>.</p>`,
    ),
    attachments: [
      {
        filename: `faktura-${invoice.invoiceNumber}.pdf`,
        content: pdf.toString("base64"),
      },
    ],
  });
}

export async function sendClubInvoiceEmail({
  to,
  childName,
  seasonLabel,
  invoice,
  pdf,
}: {
  to: string;
  childName: string;
  seasonLabel: string;
  invoice: InvoicePdfData;
  pdf: Buffer;
}) {
  const dueDate = new Intl.DateTimeFormat("cs-CZ").format(new Date(invoice.dueDate));
  const parentText = [
    "Dobrý den,",
    "",
    `děkujeme za přihlášení dítěte ${childName} na parkourový kroužek ${seasonLabel}.`,
    `Prosíme o uhrazení částky ${formatCzk(invoice.totalAmountCzk)} do ${dueDate}.`,
    "",
    `Číslo účtu: ${BILLING.bankAccount}`,
    `Variabilní symbol: ${invoice.variableSymbol}`,
    `IBAN: ${BILLING.iban}`,
    `BIC/SWIFT: ${BILLING.bic}`,
    "",
    "Fakturu posíláme v příloze.",
    "",
    `Pokud potřebujete cokoliv upravit, napište nám na ${SITE.email}.`,
    "",
    "Leap Parkour",
  ].join("\n");

  await sendEmail({
    to,
    replyTo: SITE.email,
    subject: `Platba a faktura za kroužek - ${childName}`,
    text: parentText,
    html: layout(
      "Platba za parkourový kroužek",
      `<p>Dobrý den,</p>
       <p>děkujeme za přihlášení dítěte <strong>${escapeHtml(
         childName,
       )}</strong> na parkourový kroužek <strong>${escapeHtml(seasonLabel)}</strong>.</p>
       <p>Prosíme o uhrazení částky <strong style="font-size:20px;color:#1c244b">${escapeHtml(
         formatCzk(invoice.totalAmountCzk),
       )}</strong> do <strong>${escapeHtml(dueDate)}</strong>.</p>
       <div style="background:#f1f5f9;border-radius:14px;padding:16px;margin:20px 0">
         <p style="margin:0 0 8px"><strong>Číslo účtu:</strong> ${escapeHtml(
           BILLING.bankAccount,
         )}</p>
         <p style="margin:0 0 8px"><strong>Variabilní symbol:</strong> ${escapeHtml(
           invoice.variableSymbol,
         )}</p>
         <p style="margin:0 0 8px"><strong>IBAN:</strong> ${escapeHtml(BILLING.iban)}</p>
         <p style="margin:0"><strong>BIC/SWIFT:</strong> ${escapeHtml(BILLING.bic)}</p>
       </div>
       <p>Fakturu posíláme v příloze.</p>
       <p>Pokud potřebujete cokoliv upravit, napište nám na <a href="mailto:${escapeHtml(
         SITE.email,
       )}" style="color:#2f63d4">${escapeHtml(SITE.email)}</a>.</p>`,
    ),
    attachments: [
      {
        filename: `faktura-${invoice.invoiceNumber}.pdf`,
        content: pdf.toString("base64"),
      },
    ],
  });
}
