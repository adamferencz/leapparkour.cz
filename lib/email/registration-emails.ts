import { CAMP, CLUB_SEASON, SITE, WHATSAPP_CHOICES } from "@/lib/config";
import { formatCzk } from "@/lib/billing/config";
import { sendAdminEmail, sendEmail } from "./mailer";

type ClubRegistrationEmail = {
  childName: string;
  parentName: string;
  email: string;
  phone: string;
  whatsappChoice: string;
  terms: string[];
  healthNotes: string;
  totalAmountCzk: number;
  invoiceAttachment?: {
    filename: string;
    content: string;
  } | null;
};

type CampRegistrationEmail = {
  childName: string;
  fatherName: string;
  motherName: string;
  email: string;
  childAge: number;
  childBirthdate: string;
  phoneMother: string;
  phoneFather: string;
  healthNotes: string;
  sports: string[];
  sportsOther: string;
  roommates: string;
  baseAmountCzk: number;
  discountCode: string | null;
  discountAmountCzk: number;
  totalAmountCzk: number;
  invoiceAttachment?: {
    filename: string;
    content: string;
  } | null;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rows(items: Array<[string, string]>) {
  return items
    .map(
      ([label, value]) =>
        `<tr><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e5e7eb;color:#1c244b">${escapeHtml(
          label,
        )}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${escapeHtml(
          value || "Neuvedeno",
        )}</td></tr>`,
    )
    .join("");
}

function layout(title: string, body: string) {
  return `<!doctype html>
<html lang="cs">
  <body style="margin:0;background:#f8fafc;font-family:Arial,sans-serif;color:#334155">
    <div style="max-width:640px;margin:0 auto;padding:28px 16px">
      <div style="background:white;border-radius:16px;padding:28px;border:1px solid #e5e7eb">
        <h1 style="margin:0 0 18px;color:#1c244b;font-size:26px;line-height:1.25">${escapeHtml(title)}</h1>
        ${body}
      </div>
      <p style="margin:18px 0 0;text-align:center;font-size:12px;color:#64748b">
        ${escapeHtml(SITE.name)} · ${escapeHtml(SITE.email)}
      </p>
    </div>
  </body>
</html>`;
}

function termLabels(termIds: string[]) {
  return termIds
    .map((id) => CLUB_SEASON.terms.find((term) => term.id === id))
    .filter(Boolean)
    .map((term) => `${term!.label} (${term!.level}, ${term!.age})`);
}

function whatsappLabel(value: string) {
  return WHATSAPP_CHOICES.find((choice) => choice.value === value)?.label ?? value;
}

export async function sendClubRegistrationEmails(data: ClubRegistrationEmail) {
  const terms = termLabels(data.terms);
  const invoiceNote = data.invoiceAttachment
    ? "Fakturu najdete v příloze tohoto e-mailu."
    : "Fakturu vám pošleme samostatně po kontrole přihlášky.";
  const parentText = [
    `Dobrý den,`,
    ``,
    `děkujeme za přihlášku na parkourový kroužek ${CLUB_SEASON.label}. Přihlášku jsme přijali a prosíme o uhrazení faktury.`,
    ``,
    `Dítě: ${data.childName}`,
    `Rodič: ${data.parentName}`,
    `Termín: ${terms.join(", ")}`,
    `Cena: ${formatCzk(data.totalAmountCzk)}`,
    `Telefon na rodiče: ${data.phone}`,
    `WhatsApp: ${whatsappLabel(data.whatsappChoice)}`,
    ``,
    invoiceNote,
    ``,
    `Pokud potřebujete cokoli doplnit nebo opravit, napište nám na ${SITE.email}.`,
    ``,
    `Leap Parkour`,
  ].join("\n");

  const jobs = await Promise.allSettled([
    sendEmail({
      to: data.email,
      replyTo: SITE.email,
      subject: `Potvrzení přihlášky na kroužek - ${data.childName}`,
      text: parentText,
      html: layout(
        "Přihlášku na kroužek jsme přijali",
        `<p>Dobrý den,</p>
         <p>děkujeme za přihlášku na parkourový kroužek <strong>${escapeHtml(
           CLUB_SEASON.label,
         )}</strong>. Přihlášku jsme přijali a prosíme o uhrazení faktury.</p>
         <table style="width:100%;border-collapse:collapse;margin:20px 0">${rows([
           ["Dítě", data.childName],
           ["Rodič", data.parentName],
           ["Termín", terms.join(", ")],
           ["Cena", formatCzk(data.totalAmountCzk)],
           ["Telefon na rodiče", data.phone],
           ["WhatsApp", whatsappLabel(data.whatsappChoice)],
         ])}</table>
         <p>${escapeHtml(invoiceNote)}</p>
         <p>Pokud potřebujete cokoli doplnit nebo opravit, napište nám na <a href="mailto:${escapeHtml(
           SITE.email,
         )}" style="color:#2f63d4">${escapeHtml(SITE.email)}</a>.</p>`,
      ),
      attachments: data.invoiceAttachment ? [data.invoiceAttachment] : undefined,
    }),
    sendAdminEmail({
      replyTo: data.email,
      subject: `Nová přihláška na kroužek - ${data.childName}`,
      text: [
        `Nová přihláška na kroužek`,
        `Dítě: ${data.childName}`,
        `Rodič: ${data.parentName}`,
        `E-mail: ${data.email}`,
        `Telefon na rodiče: ${data.phone}`,
        `Termín: ${terms.join(", ")}`,
        `Cena: ${formatCzk(data.totalAmountCzk)}`,
        `WhatsApp: ${whatsappLabel(data.whatsappChoice)}`,
        `Zdravotní omezení: ${data.healthNotes || "Neuvedeno"}`,
      ].join("\n"),
      html: layout(
        "Nová přihláška na kroužek",
        `<table style="width:100%;border-collapse:collapse;margin:20px 0">${rows([
          ["Dítě", data.childName],
          ["Rodič", data.parentName],
          ["E-mail", data.email],
          ["Telefon na rodiče", data.phone],
          ["Termín", terms.join(", ")],
          ["Cena", formatCzk(data.totalAmountCzk)],
          ["WhatsApp", whatsappLabel(data.whatsappChoice)],
          ["Zdravotní omezení", data.healthNotes],
        ])}</table>`,
      ),
    }),
  ]);

  jobs.forEach((job, index) => {
    if (job.status === "rejected") {
      console.error(
        index === 0
          ? "Rodičovský e-mail po přihlášce na kroužek selhal:"
          : "Admin e-mail po přihlášce na kroužek selhal:",
        job.reason,
      );
    }
  });

  return jobs;
}

export async function sendCampRegistrationEmails(data: CampRegistrationEmail) {
  const activities = [...data.sports, data.sportsOther].filter(Boolean).join(", ");
  const campEmailLabel = `LeapCamp ${CAMP.year}`;
  const discountText =
    data.discountAmountCzk > 0 && data.discountCode
      ? `${data.discountCode} (-${formatCzk(data.discountAmountCzk)})`
      : "Neuplatněn";
  const invoiceNote = data.invoiceAttachment
    ? "Fakturu najdete v příloze tohoto e-mailu."
    : "Fakturu vám pošleme samostatně po kontrole přihlášky.";
  const parentText = [
    `Dobrý den,`,
    ``,
    `děkujeme, že máte v plánu se zúčastnit ${campEmailLabel}. Moc se na vás těšíme a prosíme o uhrazení faktury.`,
    ``,
    `Jméno dítěte: ${data.childName}`,
    `Termín: ${CAMP.dates}`,
    `Místo: ${CAMP.venue}`,
    `Cena: ${formatCzk(data.baseAmountCzk)}`,
    ``,
    invoiceNote,
    ``,
    `Pokud potřebujete cokoli doplnit nebo opravit, napište nám na ${SITE.email}.`,
    ``,
    `Leap Parkour`,
  ].join("\n");

  const jobs = await Promise.allSettled([
    sendEmail({
      to: data.email,
      replyTo: SITE.email,
      subject: `Přihlášení na ${campEmailLabel} - ${data.childName}`,
      text: parentText,
      html: layout(
        `Přihlášení na ${campEmailLabel}`,
        `<p>Dobrý den,</p>
         <p>děkujeme, že máte v plánu se zúčastnit <strong>${escapeHtml(
           campEmailLabel,
         )}</strong>. Moc se na vás těšíme a prosíme o uhrazení faktury.</p>
         <table style="width:100%;border-collapse:collapse;margin:20px 0">${rows([
           ["Jméno dítěte", data.childName],
           ["Termín", CAMP.dates],
           ["Místo", CAMP.venue],
           ["Cena", formatCzk(data.baseAmountCzk)],
         ])}</table>
         <p>${escapeHtml(invoiceNote)}</p>
         <p>Pokud potřebujete cokoli doplnit nebo opravit, napište nám na <a href="mailto:${escapeHtml(
           SITE.email,
         )}" style="color:#2f63d4">${escapeHtml(SITE.email)}</a>.</p>`,
      ),
      attachments: data.invoiceAttachment ? [data.invoiceAttachment] : undefined,
    }),
    sendAdminEmail({
      replyTo: data.email,
      subject: `Nová přihláška na tábor - ${data.childName}`,
      text: [
        `Nová přihláška na tábor`,
        `Dítě: ${data.childName}`,
        `Věk: ${data.childAge}`,
        `Datum narození: ${data.childBirthdate}`,
        `E-mail: ${data.email}`,
        `Matka: ${data.motherName}, ${data.phoneMother}`,
        `Otec: ${data.fatherName}, ${data.phoneFather}`,
        `Zdravotní omezení: ${data.healthNotes}`,
        `Aktivity: ${activities || "Neuvedeno"}`,
        `Chatka/pokoj: ${data.roommates || "Neuvedeno"}`,
        `Cena: ${formatCzk(data.baseAmountCzk)}`,
        `Sleva: ${discountText}`,
        `K úhradě: ${formatCzk(data.totalAmountCzk)}`,
      ].join("\n"),
      html: layout(
        "Nová přihláška na tábor",
        `<table style="width:100%;border-collapse:collapse;margin:20px 0">${rows([
          ["Dítě", data.childName],
          ["Věk", String(data.childAge)],
          ["Datum narození", data.childBirthdate],
          ["E-mail", data.email],
          ["Matka", `${data.motherName}, ${data.phoneMother}`],
          ["Otec", `${data.fatherName}, ${data.phoneFather}`],
          ["Zdravotní omezení", data.healthNotes],
          ["Aktivity", activities],
          ["Chatka/pokoj", data.roommates],
          ["Cena", formatCzk(data.baseAmountCzk)],
          ["Sleva", discountText],
          ["K úhradě", formatCzk(data.totalAmountCzk)],
        ])}</table>`,
      ),
    }),
  ]);

  jobs.forEach((job, index) => {
    if (job.status === "rejected") {
      console.error(
        index === 0
          ? "Rodičovský e-mail po přihlášce na tábor selhal:"
          : "Admin e-mail po přihlášce na tábor selhal:",
        job.reason,
      );
    }
  });

  return jobs;
}
