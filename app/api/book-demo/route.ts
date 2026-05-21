import nodemailer from "nodemailer";

type BookDemoPayload = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  company?: unknown;
  website?: unknown;
  phone?: unknown;
  role?: unknown;
  companySize?: unknown;
  interest?: unknown;
  project?: unknown;
  countryIso?: unknown;
  countryName?: unknown;
  dialCode?: unknown;
  source?: unknown;
};

type Lead = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  phone: string;
  role: string;
  companySize: string;
  interest: string;
  project: string;
  countryIso: string;
  countryName: string;
  dialCode: string;
  source: string;
  submittedAt: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9()+\-\s.]{6,24}$/;

export const runtime = "nodejs";

const allowedRoles = new Set([
  "Founder / Owner",
  "CEO / Managing Director",
  "Marketing Manager",
  "Sales Manager",
  "Operations Manager",
  "Other",
]);

const allowedCompanySizes = new Set([
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
]);

const allowedInterests = new Set([
  "AI Chat Agents",
  "AI Voice Agents",
  "Both",
  "Not sure yet",
]);

function readString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function jsonError(message: string, status = 400) {
  return Response.json({ ok: false, message }, { status });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function getSmtpConfig() {
  const port = Number.parseInt(getRequiredEnv("SMTP_PORT"), 10);
  if (!Number.isInteger(port)) throw new Error("Invalid SMTP_PORT");

  return {
    host: getRequiredEnv("SMTP_HOST"),
    port,
    secure: (process.env.SMTP_SECURE ?? "true").trim() !== "false",
    user: getRequiredEnv("SMTP_USER"),
    pass: getRequiredEnv("SMTP_PASS"),
    fromName: process.env.SMTP_FROM_NAME?.trim() || "Kaizen AI",
    fromEmail: getRequiredEnv("SMTP_FROM_EMAIL"),
    leadToEmail: process.env.LEAD_TO_EMAIL?.trim() || "hello@kaizenai.dev",
  };
}

function buildLeadText(lead: Lead) {
  return [
    "New Kaizen AI strategy call request",
    "",
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Email: ${lead.email}`,
    `Phone: ${[lead.dialCode, lead.phone].filter(Boolean).join(" ")}`,
    `Country: ${lead.countryName || lead.countryIso || "Not provided"}`,
    `Company: ${lead.company}`,
    `Website: ${lead.website || "Not provided"}`,
    `Role: ${lead.role}`,
    `Company size: ${lead.companySize}`,
    `Interest: ${lead.interest}`,
    `Project: ${lead.project || "Not provided"}`,
    `Source: ${lead.source}`,
    `Submitted at: ${lead.submittedAt}`,
  ].join("\n");
}

function buildLeadHtml(lead: Lead) {
  const rows = [
    ["Name", `${lead.firstName} ${lead.lastName}`],
    ["Email", lead.email],
    ["Phone", [lead.dialCode, lead.phone].filter(Boolean).join(" ")],
    ["Country", lead.countryName || lead.countryIso || "Not provided"],
    ["Company", lead.company],
    ["Website", lead.website || "Not provided"],
    ["Role", lead.role],
    ["Company size", lead.companySize],
    ["Interest", lead.interest],
    ["Project", lead.project || "Not provided"],
    ["Source", lead.source],
    ["Submitted at", lead.submittedAt],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #181713; line-height: 1.5;">
      <h1 style="font-size: 22px; margin: 0 0 16px;">New strategy call request</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 680px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border: 1px solid #e6dcc4; padding: 10px; text-align: left; width: 160px; background: #faf6eb;">${escapeHtml(label)}</th>
                  <td style="border: 1px solid #e6dcc4; padding: 10px;">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function buildClientText(lead: Lead, contactEmail: string) {
  return [
    `Hi ${lead.firstName},`,
    "",
    "Thanks for requesting a Kaizen AI strategy call. We received your details and will review the best AI setup for your business.",
    "",
    "We will follow up with the next step soon.",
    "",
    `If you need to add anything, reply to ${contactEmail}.`,
    "",
    "Kaizen AI",
  ].join("\n");
}

function buildClientHtml(lead: Lead, contactEmail: string) {
  return `
    <div style="font-family: Arial, sans-serif; color: #181713; line-height: 1.6; max-width: 620px;">
      <h1 style="font-size: 22px; margin: 0 0 16px;">We received your request</h1>
      <p>Hi ${escapeHtml(lead.firstName)},</p>
      <p>Thanks for requesting a Kaizen AI strategy call. We received your details and will review the best AI setup for your business.</p>
      <p>We will follow up with the next step soon.</p>
      <p>If you need to add anything, reply to <a href="mailto:${escapeHtml(contactEmail)}">${escapeHtml(contactEmail)}</a>.</p>
      <p>Kaizen AI</p>
    </div>
  `;
}

function assertAccepted(
  result: { accepted?: unknown[]; rejected?: unknown[] },
  label: string,
) {
  const accepted = Array.isArray(result.accepted) ? result.accepted : [];
  const rejected = Array.isArray(result.rejected) ? result.rejected : [];

  if (accepted.length === 0 || rejected.length > 0) {
    throw new Error(`${label} was not accepted by SMTP`);
  }
}

function validatePayload(payload: BookDemoPayload): Lead | string {
  const firstName = readString(payload.firstName, 80);
  const lastName = readString(payload.lastName, 80);
  const email = readString(payload.email, 160).toLowerCase();
  const company = readString(payload.company, 160);
  const website = readString(payload.website, 240);
  const phone = readString(payload.phone, 40);
  const role = readString(payload.role, 80);
  const companySize = readString(payload.companySize, 80);
  const interest = readString(payload.interest, 80);
  const project = readString(payload.project, 1200);
  const countryIso = readString(payload.countryIso, 2).toUpperCase();
  const countryName = readString(payload.countryName, 120);
  const dialCode = readString(payload.dialCode, 8);
  const source = readString(payload.source, 160) || "Kaizen AI Website";

  if (!firstName || !lastName) return "Please enter your full name.";
  if (!EMAIL_RE.test(email)) return "Please enter a valid email address.";
  if (!company) return "Please enter your company name.";
  if (!PHONE_RE.test(phone)) return "Please enter a valid phone number.";
  if (!allowedRoles.has(role)) return "Please select your role.";
  if (!allowedCompanySizes.has(companySize)) return "Please select your company size.";
  if (!allowedInterests.has(interest)) return "Please select what you are interested in.";

  if (website) {
    try {
      const url = new URL(website);
      if (!["http:", "https:"].includes(url.protocol)) {
        return "Please enter a valid website URL.";
      }
    } catch {
      return "Please enter a valid website URL.";
    }
  }

  return {
    firstName,
    lastName,
    email,
    company,
    website,
    phone,
    role,
    companySize,
    interest,
    project,
    countryIso,
    countryName,
    dialCode,
    source,
    submittedAt: new Date().toISOString(),
  };
}

export async function POST(request: Request) {
  let payload: BookDemoPayload;

  try {
    payload = (await request.json()) as BookDemoPayload;
  } catch {
    return jsonError("Invalid request body.");
  }

  const lead = validatePayload(payload);
  if (typeof lead === "string") return jsonError(lead);

  let config: ReturnType<typeof getSmtpConfig>;

  try {
    config = getSmtpConfig();
  } catch (error) {
    console.error("Book demo SMTP configuration error", error);
    return jsonError("Email delivery is not configured.", 500);
  }

  const from = `"${config.fromName.replace(/"/g, "'")}" <${config.fromEmail}>`;
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  try {
    const leadResult = await transporter.sendMail({
      from,
      to: config.leadToEmail,
      replyTo: lead.email,
      subject: `New strategy call request from ${lead.firstName} ${lead.lastName} at ${lead.company}`,
      text: buildLeadText(lead),
      html: buildLeadHtml(lead),
    });
    assertAccepted(leadResult, "Lead email");

    const clientResult = await transporter.sendMail({
      from,
      to: lead.email,
      replyTo: config.leadToEmail,
      subject: "We received your Kaizen AI strategy call request",
      text: buildClientText(lead, config.leadToEmail),
      html: buildClientHtml(lead, config.leadToEmail),
    });
    assertAccepted(clientResult, "Client confirmation email");
  } catch (error) {
    console.error("Book demo SMTP delivery failed", error);
    return jsonError("We could not send your request. Please try again.", 502);
  }

  return Response.json({ ok: true });
}
