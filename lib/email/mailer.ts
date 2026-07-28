type SendEmailOptions = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM ?? "Leap Parkour <prihlasky@leapparkour.cz>";
const MAIL_ADMIN_TO = process.env.MAIL_ADMIN_TO;

export function isEmailConfigured() {
  return Boolean(RESEND_API_KEY && MAIL_FROM);
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
  attachments,
}: SendEmailOptions) {
  if (!isEmailConfigured()) {
    throw new Error("Chybí RESEND_API_KEY nebo MAIL_FROM.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(attachments && attachments.length > 0 ? { attachments } : {}),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend e-mail failed (${response.status}): ${body}`);
  }

  const body = (await response.json()) as { id?: string };
  console.info("Resend e-mail accepted:", {
    id: body.id ?? "unknown",
    to: Array.isArray(to) ? to : [to],
    subject,
  });
}

export async function sendAdminEmail(options: Omit<SendEmailOptions, "to">) {
  if (!MAIL_ADMIN_TO) {
    console.warn("MAIL_ADMIN_TO není nastavené, interní admin e-mail nebude odeslán.");
    return;
  }

  await sendEmail({
    ...options,
    to: MAIL_ADMIN_TO.split(",").map((email) => email.trim()).filter(Boolean),
  });
}
