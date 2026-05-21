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

type ValidatedBookDemo = {
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
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9()+\-\s.]{6,24}$/;

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

function validatePayload(payload: BookDemoPayload): ValidatedBookDemo | string {
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
  };
}

export async function POST(request: Request) {
  let payload: BookDemoPayload;

  try {
    payload = (await request.json()) as BookDemoPayload;
  } catch {
    return jsonError("Invalid request body.");
  }

  const validated = validatePayload(payload);
  if (typeof validated === "string") return jsonError(validated);

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return jsonError("Email delivery is not configured.", 500);
  }

  const fullName = `${validated.firstName} ${validated.lastName}`;
  const fullPhone = [validated.dialCode, validated.phone]
    .filter(Boolean)
    .join(" ");

  const templateParams = {
    firstName: validated.firstName,
    lastName: validated.lastName,
    first_name: validated.firstName,
    last_name: validated.lastName,
    name: fullName,
    full_name: fullName,
    email: validated.email,
    reply_to: validated.email,
    company: validated.company,
    website: validated.website || "Not provided",
    phone: validated.phone,
    phone_number: validated.phone,
    full_phone: fullPhone,
    country: validated.countryName || validated.countryIso || "Not provided",
    country_iso: validated.countryIso,
    dial_code: validated.dialCode,
    role: validated.role,
    companySize: validated.companySize,
    company_size: validated.companySize,
    interest: validated.interest,
    project: validated.project || "Not provided",
    message: validated.project || "Not provided",
    source: validated.source,
    submitted_at: new Date().toISOString(),
  };

  const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: templateParams,
      ...(privateKey ? { accessToken: privateKey } : {}),
    }),
  });

  if (!emailResponse.ok) {
    const detail = await emailResponse.text();
    console.error("EmailJS book-demo delivery failed", {
      status: emailResponse.status,
      detail,
    });

    return jsonError("We could not send your request. Please try again.", 502);
  }

  return Response.json({ ok: true });
}
