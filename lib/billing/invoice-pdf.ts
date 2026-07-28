import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { BILLING, formatInvoiceCzk } from "./config";

export type InvoicePdfData = {
  invoiceNumber: string;
  variableSymbol: string;
  issueDate: string;
  dueDate: string;
  buyerName: string;
  buyerAddress: string;
  buyerEmail: string;
  itemName: string;
  baseAmountCzk: number;
  discountCode: string | null;
  discountAmountCzk: number;
  totalAmountCzk: number;
};

function findFont(fileName = "NotoSans-Regular.ttf") {
  const candidates = [
    path.join(process.cwd(), `public/fonts/${fileName}`),
    path.join(
      process.cwd(),
      "node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf",
    ),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

function findLogo() {
  const candidates = [
    path.join(process.cwd(), "public/images/logo-invoice.png"),
    path.join(process.cwd(), "public/images/logo2019-1-1024x213.png"),
    path.join(process.cwd(), "public/images/2024_08_logo-black-png.png"),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("cs-CZ").format(new Date(value));
}

function drawRow(
  doc: PDFKit.PDFDocument,
  y: number,
  label: string,
  qty: string,
  price: string,
  total: string,
) {
  const labelHeight = doc.heightOfString(label, { width: 300 });
  doc
    .fontSize(9)
    .fillColor("#111827")
    .text(label, 46, y, { width: 300 })
    .text(qty, 354, y, { width: 44, align: "right" })
    .text(price, 414, y, { width: 72, align: "right" })
    .text(total, 502, y, { width: 48, align: "right" });
  return Math.max(17, labelHeight + 6);
}

export async function generateInvoicePdf(data: InvoicePdfData) {
  const fontPath = findFont();
  const boldFontPath = findFont("NotoSans-Bold.ttf");
  const logoPath = findLogo();
  const doc = new PDFDocument({
    size: "A4",
    margin: 46,
    bufferPages: true,
    ...(fontPath ? { font: fontPath } : {}),
    info: {
      Title: `Faktura ${data.invoiceNumber}`,
      Author: BILLING.supplier.name,
      Subject: data.itemName,
    },
  });

  if (fontPath) {
    doc.registerFont("LeapRegular", fontPath);
    doc.font("LeapRegular");
  }
  if (boldFontPath) {
    doc.registerFont("LeapBold", boldFontPath);
  }

  const font = (style: "regular" | "bold" = "regular") => {
    if (style === "bold" && boldFontPath) {
      doc.font("LeapBold");
      return;
    }
    if (fontPath) doc.font("LeapRegular");
  };

  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(chunk as Buffer));
  const done = new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  if (logoPath) {
    doc.image(logoPath, 46, 48, { width: 112 });
  } else {
    font("bold");
    doc.fillColor("#111827").fontSize(26).text("LEAP", 46, 48);
    font();
    doc.fontSize(7).fillColor("#6b7280").text("SINCE 2015", 89, 80);
  }

  font();
  doc
    .fontSize(18)
    .fillColor("#111827")
    .text("Zjednodušená faktura", 338, 48, { width: 212, align: "right" });
  font("bold");
  doc
    .fontSize(14)
    .fillColor("#000000")
    .text(data.invoiceNumber, 338, 78, { width: 212, align: "right" });

  font();
  doc
    .fontSize(8)
    .fillColor("#6b7280")
    .text("DODAVATEL", 46, 138);
  font("bold");
  doc
    .fontSize(13)
    .fillColor("#000000")
    .text(BILLING.supplier.name, 46, 158);
  font();
  doc
    .fontSize(9.5)
    .text(BILLING.supplier.addressLines.join("\n"), 46, 178, { lineGap: 1.5 })
    .text(`IČO: ${BILLING.supplier.ico}`, 46, 232)
    .text(BILLING.supplier.vatNote, 148, 232)
    .fontSize(7.5)
    .fillColor("#374151")
    .text(BILLING.supplier.registry, 46, 252, { width: 225 });

  doc.roundedRect(302, 128, 248, 112, 2).fill("#f1f3f5");
  font();
  doc
    .fillColor("#6b7280")
    .fontSize(8)
    .text("ODBĚRATEL", 322, 150);
  font("bold");
  doc
    .fillColor("#000000")
    .fontSize(11.5)
    .text(data.buyerName || data.buyerEmail, 322, 170, {
      width: 206,
      height: 28,
    });
  font();
  doc
    .fontSize(8.5)
    .fillColor("#111827")
    .text(data.buyerAddress, 322, 200, {
      width: 206,
      height: 24,
    })
    .fontSize(8.5)
    .fillColor("#374151")
    .text(data.buyerEmail, 322, 222, { width: 206 });

  doc.rect(0, 286, 595, 104).fill("#f1f3f5");
  font();
  doc
    .fillColor("#000000")
    .fontSize(9)
    .text("Datum vystavení:", 46, 312)
    .text("Datum splatnosti:", 46, 330)
    .text(formatDate(data.issueDate), 204, 312, { width: 80, align: "right" });
  font("bold");
  doc.text(formatDate(data.dueDate), 204, 330, { width: 80, align: "right" });
  font();
  doc
    .text("Způsob platby:", 46, 362)
    .text("bankovní převod", 188, 362);

  font();
  doc
    .fontSize(9)
    .text("Číslo účtu:", 324, 310)
    .text("Variabilní symbol:", 324, 328)
    .text("IBAN:", 324, 346)
    .text("BIC/SWIFT:", 324, 364);
  font("bold");
  doc
    .text(BILLING.bankAccount, 424, 310, { width: 126, align: "right" })
    .text(data.variableSymbol, 424, 328, { width: 126, align: "right" });
  font();
  doc
    .fontSize(8.3)
    .text(BILLING.iban, 386, 346, { width: 164, align: "right" })
    .text(BILLING.bic, 424, 364, { width: 126, align: "right" });

  font("bold");
  doc
    .fontSize(9.5)
    .text("K úhradě:", 324, 382)
    .fontSize(18)
    .fillColor("#000000")
    .text(formatInvoiceCzk(data.totalAmountCzk), 392, 374, {
      width: 158,
      align: "right",
    });

  const tableTop = 462;
  doc
    .moveTo(46, tableTop + 22)
    .lineTo(550, tableTop + 22)
    .strokeColor("#d1d5db")
    .lineWidth(0.9)
    .stroke();

  font("bold");
  doc
    .fontSize(9)
    .fillColor("#111827")
    .text("Název položky", 46, tableTop)
    .text("Množství", 354, tableTop, { width: 44, align: "right" })
    .text("Cena za položku", 414, tableTop, { width: 72, align: "right" })
    .text("Celkem", 502, tableTop, { width: 48, align: "right" });

  font();
  let rowY = tableTop + 40;
  const mainRowHeight = drawRow(
    doc,
    rowY,
    data.itemName,
    "1 ks",
    formatInvoiceCzk(data.baseAmountCzk),
    formatInvoiceCzk(data.baseAmountCzk),
  );
  rowY += mainRowHeight;

  if (data.discountAmountCzk > 0) {
    rowY += drawRow(
      doc,
      rowY,
      `Sleva${data.discountCode ? ` (${data.discountCode})` : ""}`,
      "1 ks",
      `-${formatInvoiceCzk(data.discountAmountCzk)}`,
      `-${formatInvoiceCzk(data.discountAmountCzk)}`,
    );
  }
  const totalY = rowY + 28;

  doc
    .moveTo(46, totalY - 18)
    .lineTo(550, totalY - 18)
    .strokeColor("#d1d5db")
    .lineWidth(0.8)
    .stroke();

  font();
  doc
    .fontSize(9.5)
    .text("Cena celkem:", 326, totalY + 4, { width: 92, align: "right" });
  font("bold");
  doc
    .fontSize(17)
    .text(formatInvoiceCzk(data.totalAmountCzk), 422, totalY - 2, {
      width: 128,
      align: "right",
    });

  font();
  doc
    .fontSize(7)
    .fillColor("#6b7280")
    .text("Faktura je vystavena elektronicky.", 46, 768, {
      width: 504,
      align: "center",
    });

  doc.end();
  return done;
}
