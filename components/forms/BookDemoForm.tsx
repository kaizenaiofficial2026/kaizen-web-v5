"use client";

import {
  type RefObject,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Info,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Country = {
  name: string;
  iso2: string;
  dialCode: string;
};

const countries: Country[] = [
  { name: "Afghanistan", iso2: "AF", dialCode: "+93" },
  { name: "Albania", iso2: "AL", dialCode: "+355" },
  { name: "Algeria", iso2: "DZ", dialCode: "+213" },
  { name: "Andorra", iso2: "AD", dialCode: "+376" },
  { name: "Angola", iso2: "AO", dialCode: "+244" },
  { name: "Antigua and Barbuda", iso2: "AG", dialCode: "+1" },
  { name: "Argentina", iso2: "AR", dialCode: "+54" },
  { name: "Armenia", iso2: "AM", dialCode: "+374" },
  { name: "Australia", iso2: "AU", dialCode: "+61" },
  { name: "Austria", iso2: "AT", dialCode: "+43" },
  { name: "Azerbaijan", iso2: "AZ", dialCode: "+994" },
  { name: "Bahamas", iso2: "BS", dialCode: "+1" },
  { name: "Bahrain", iso2: "BH", dialCode: "+973" },
  { name: "Bangladesh", iso2: "BD", dialCode: "+880" },
  { name: "Barbados", iso2: "BB", dialCode: "+1" },
  { name: "Belarus", iso2: "BY", dialCode: "+375" },
  { name: "Belgium", iso2: "BE", dialCode: "+32" },
  { name: "Belize", iso2: "BZ", dialCode: "+501" },
  { name: "Benin", iso2: "BJ", dialCode: "+229" },
  { name: "Bhutan", iso2: "BT", dialCode: "+975" },
  { name: "Bolivia", iso2: "BO", dialCode: "+591" },
  { name: "Bosnia and Herzegovina", iso2: "BA", dialCode: "+387" },
  { name: "Botswana", iso2: "BW", dialCode: "+267" },
  { name: "Brazil", iso2: "BR", dialCode: "+55" },
  { name: "Brunei", iso2: "BN", dialCode: "+673" },
  { name: "Bulgaria", iso2: "BG", dialCode: "+359" },
  { name: "Burkina Faso", iso2: "BF", dialCode: "+226" },
  { name: "Burundi", iso2: "BI", dialCode: "+257" },
  { name: "Cabo Verde", iso2: "CV", dialCode: "+238" },
  { name: "Cambodia", iso2: "KH", dialCode: "+855" },
  { name: "Cameroon", iso2: "CM", dialCode: "+237" },
  { name: "Canada", iso2: "CA", dialCode: "+1" },
  { name: "Central African Republic", iso2: "CF", dialCode: "+236" },
  { name: "Chad", iso2: "TD", dialCode: "+235" },
  { name: "Chile", iso2: "CL", dialCode: "+56" },
  { name: "China", iso2: "CN", dialCode: "+86" },
  { name: "Colombia", iso2: "CO", dialCode: "+57" },
  { name: "Comoros", iso2: "KM", dialCode: "+269" },
  { name: "Congo", iso2: "CG", dialCode: "+242" },
  { name: "Costa Rica", iso2: "CR", dialCode: "+506" },
  { name: "Croatia", iso2: "HR", dialCode: "+385" },
  { name: "Cuba", iso2: "CU", dialCode: "+53" },
  { name: "Cyprus", iso2: "CY", dialCode: "+357" },
  { name: "Czechia", iso2: "CZ", dialCode: "+420" },
  { name: "Denmark", iso2: "DK", dialCode: "+45" },
  { name: "Djibouti", iso2: "DJ", dialCode: "+253" },
  { name: "Dominica", iso2: "DM", dialCode: "+1" },
  { name: "Dominican Republic", iso2: "DO", dialCode: "+1" },
  { name: "Ecuador", iso2: "EC", dialCode: "+593" },
  { name: "Egypt", iso2: "EG", dialCode: "+20" },
  { name: "El Salvador", iso2: "SV", dialCode: "+503" },
  { name: "Equatorial Guinea", iso2: "GQ", dialCode: "+240" },
  { name: "Eritrea", iso2: "ER", dialCode: "+291" },
  { name: "Estonia", iso2: "EE", dialCode: "+372" },
  { name: "Eswatini", iso2: "SZ", dialCode: "+268" },
  { name: "Ethiopia", iso2: "ET", dialCode: "+251" },
  { name: "Fiji", iso2: "FJ", dialCode: "+679" },
  { name: "Finland", iso2: "FI", dialCode: "+358" },
  { name: "France", iso2: "FR", dialCode: "+33" },
  { name: "Gabon", iso2: "GA", dialCode: "+241" },
  { name: "Gambia", iso2: "GM", dialCode: "+220" },
  { name: "Georgia", iso2: "GE", dialCode: "+995" },
  { name: "Germany", iso2: "DE", dialCode: "+49" },
  { name: "Ghana", iso2: "GH", dialCode: "+233" },
  { name: "Greece", iso2: "GR", dialCode: "+30" },
  { name: "Grenada", iso2: "GD", dialCode: "+1" },
  { name: "Guatemala", iso2: "GT", dialCode: "+502" },
  { name: "Guinea", iso2: "GN", dialCode: "+224" },
  { name: "Guinea-Bissau", iso2: "GW", dialCode: "+245" },
  { name: "Guyana", iso2: "GY", dialCode: "+592" },
  { name: "Haiti", iso2: "HT", dialCode: "+509" },
  { name: "Honduras", iso2: "HN", dialCode: "+504" },
  { name: "Hong Kong", iso2: "HK", dialCode: "+852" },
  { name: "Hungary", iso2: "HU", dialCode: "+36" },
  { name: "Iceland", iso2: "IS", dialCode: "+354" },
  { name: "India", iso2: "IN", dialCode: "+91" },
  { name: "Indonesia", iso2: "ID", dialCode: "+62" },
  { name: "Iran", iso2: "IR", dialCode: "+98" },
  { name: "Iraq", iso2: "IQ", dialCode: "+964" },
  { name: "Ireland", iso2: "IE", dialCode: "+353" },
  { name: "Israel", iso2: "IL", dialCode: "+972" },
  { name: "Italy", iso2: "IT", dialCode: "+39" },
  { name: "Jamaica", iso2: "JM", dialCode: "+1" },
  { name: "Japan", iso2: "JP", dialCode: "+81" },
  { name: "Jordan", iso2: "JO", dialCode: "+962" },
  { name: "Kazakhstan", iso2: "KZ", dialCode: "+7" },
  { name: "Kenya", iso2: "KE", dialCode: "+254" },
  { name: "Kiribati", iso2: "KI", dialCode: "+686" },
  { name: "Kuwait", iso2: "KW", dialCode: "+965" },
  { name: "Kyrgyzstan", iso2: "KG", dialCode: "+996" },
  { name: "Laos", iso2: "LA", dialCode: "+856" },
  { name: "Latvia", iso2: "LV", dialCode: "+371" },
  { name: "Lebanon", iso2: "LB", dialCode: "+961" },
  { name: "Lesotho", iso2: "LS", dialCode: "+266" },
  { name: "Liberia", iso2: "LR", dialCode: "+231" },
  { name: "Libya", iso2: "LY", dialCode: "+218" },
  { name: "Liechtenstein", iso2: "LI", dialCode: "+423" },
  { name: "Lithuania", iso2: "LT", dialCode: "+370" },
  { name: "Luxembourg", iso2: "LU", dialCode: "+352" },
  { name: "Macau", iso2: "MO", dialCode: "+853" },
  { name: "Madagascar", iso2: "MG", dialCode: "+261" },
  { name: "Malawi", iso2: "MW", dialCode: "+265" },
  { name: "Malaysia", iso2: "MY", dialCode: "+60" },
  { name: "Maldives", iso2: "MV", dialCode: "+960" },
  { name: "Mali", iso2: "ML", dialCode: "+223" },
  { name: "Malta", iso2: "MT", dialCode: "+356" },
  { name: "Marshall Islands", iso2: "MH", dialCode: "+692" },
  { name: "Mauritania", iso2: "MR", dialCode: "+222" },
  { name: "Mauritius", iso2: "MU", dialCode: "+230" },
  { name: "Mexico", iso2: "MX", dialCode: "+52" },
  { name: "Micronesia", iso2: "FM", dialCode: "+691" },
  { name: "Moldova", iso2: "MD", dialCode: "+373" },
  { name: "Monaco", iso2: "MC", dialCode: "+377" },
  { name: "Mongolia", iso2: "MN", dialCode: "+976" },
  { name: "Montenegro", iso2: "ME", dialCode: "+382" },
  { name: "Morocco", iso2: "MA", dialCode: "+212" },
  { name: "Mozambique", iso2: "MZ", dialCode: "+258" },
  { name: "Myanmar", iso2: "MM", dialCode: "+95" },
  { name: "Namibia", iso2: "NA", dialCode: "+264" },
  { name: "Nauru", iso2: "NR", dialCode: "+674" },
  { name: "Nepal", iso2: "NP", dialCode: "+977" },
  { name: "Netherlands", iso2: "NL", dialCode: "+31" },
  { name: "New Zealand", iso2: "NZ", dialCode: "+64" },
  { name: "Nicaragua", iso2: "NI", dialCode: "+505" },
  { name: "Niger", iso2: "NE", dialCode: "+227" },
  { name: "Nigeria", iso2: "NG", dialCode: "+234" },
  { name: "North Korea", iso2: "KP", dialCode: "+850" },
  { name: "North Macedonia", iso2: "MK", dialCode: "+389" },
  { name: "Norway", iso2: "NO", dialCode: "+47" },
  { name: "Oman", iso2: "OM", dialCode: "+968" },
  { name: "Pakistan", iso2: "PK", dialCode: "+92" },
  { name: "Palau", iso2: "PW", dialCode: "+680" },
  { name: "Palestine", iso2: "PS", dialCode: "+970" },
  { name: "Panama", iso2: "PA", dialCode: "+507" },
  { name: "Papua New Guinea", iso2: "PG", dialCode: "+675" },
  { name: "Paraguay", iso2: "PY", dialCode: "+595" },
  { name: "Peru", iso2: "PE", dialCode: "+51" },
  { name: "Philippines", iso2: "PH", dialCode: "+63" },
  { name: "Poland", iso2: "PL", dialCode: "+48" },
  { name: "Portugal", iso2: "PT", dialCode: "+351" },
  { name: "Qatar", iso2: "QA", dialCode: "+974" },
  { name: "Romania", iso2: "RO", dialCode: "+40" },
  { name: "Russia", iso2: "RU", dialCode: "+7" },
  { name: "Rwanda", iso2: "RW", dialCode: "+250" },
  { name: "Saint Kitts and Nevis", iso2: "KN", dialCode: "+1" },
  { name: "Saint Lucia", iso2: "LC", dialCode: "+1" },
  { name: "Saint Vincent and the Grenadines", iso2: "VC", dialCode: "+1" },
  { name: "Samoa", iso2: "WS", dialCode: "+685" },
  { name: "San Marino", iso2: "SM", dialCode: "+378" },
  { name: "Sao Tome and Principe", iso2: "ST", dialCode: "+239" },
  { name: "Saudi Arabia", iso2: "SA", dialCode: "+966" },
  { name: "Senegal", iso2: "SN", dialCode: "+221" },
  { name: "Serbia", iso2: "RS", dialCode: "+381" },
  { name: "Seychelles", iso2: "SC", dialCode: "+248" },
  { name: "Sierra Leone", iso2: "SL", dialCode: "+232" },
  { name: "Singapore", iso2: "SG", dialCode: "+65" },
  { name: "Slovakia", iso2: "SK", dialCode: "+421" },
  { name: "Slovenia", iso2: "SI", dialCode: "+386" },
  { name: "Solomon Islands", iso2: "SB", dialCode: "+677" },
  { name: "Somalia", iso2: "SO", dialCode: "+252" },
  { name: "South Africa", iso2: "ZA", dialCode: "+27" },
  { name: "South Korea", iso2: "KR", dialCode: "+82" },
  { name: "South Sudan", iso2: "SS", dialCode: "+211" },
  { name: "Spain", iso2: "ES", dialCode: "+34" },
  { name: "Sri Lanka", iso2: "LK", dialCode: "+94" },
  { name: "Sudan", iso2: "SD", dialCode: "+249" },
  { name: "Suriname", iso2: "SR", dialCode: "+597" },
  { name: "Sweden", iso2: "SE", dialCode: "+46" },
  { name: "Switzerland", iso2: "CH", dialCode: "+41" },
  { name: "Syria", iso2: "SY", dialCode: "+963" },
  { name: "Taiwan", iso2: "TW", dialCode: "+886" },
  { name: "Tajikistan", iso2: "TJ", dialCode: "+992" },
  { name: "Tanzania", iso2: "TZ", dialCode: "+255" },
  { name: "Thailand", iso2: "TH", dialCode: "+66" },
  { name: "Timor-Leste", iso2: "TL", dialCode: "+670" },
  { name: "Togo", iso2: "TG", dialCode: "+228" },
  { name: "Tonga", iso2: "TO", dialCode: "+676" },
  { name: "Trinidad and Tobago", iso2: "TT", dialCode: "+1" },
  { name: "Tunisia", iso2: "TN", dialCode: "+216" },
  { name: "Turkey", iso2: "TR", dialCode: "+90" },
  { name: "Turkmenistan", iso2: "TM", dialCode: "+993" },
  { name: "Tuvalu", iso2: "TV", dialCode: "+688" },
  { name: "Uganda", iso2: "UG", dialCode: "+256" },
  { name: "Ukraine", iso2: "UA", dialCode: "+380" },
  { name: "United Arab Emirates", iso2: "AE", dialCode: "+971" },
  { name: "United Kingdom", iso2: "GB", dialCode: "+44" },
  { name: "United States", iso2: "US", dialCode: "+1" },
  { name: "Uruguay", iso2: "UY", dialCode: "+598" },
  { name: "Uzbekistan", iso2: "UZ", dialCode: "+998" },
  { name: "Vanuatu", iso2: "VU", dialCode: "+678" },
  { name: "Vatican City", iso2: "VA", dialCode: "+379" },
  { name: "Venezuela", iso2: "VE", dialCode: "+58" },
  { name: "Vietnam", iso2: "VN", dialCode: "+84" },
  { name: "Yemen", iso2: "YE", dialCode: "+967" },
  { name: "Zambia", iso2: "ZM", dialCode: "+260" },
  { name: "Zimbabwe", iso2: "ZW", dialCode: "+263" },
].sort((a, b) => a.name.localeCompare(b.name));

const roles = [
  "Founder / Owner",
  "CEO / Managing Director",
  "Marketing Manager",
  "Sales Manager",
  "Operations Manager",
  "Other",
];

const companySizes = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
];

const interests = [
  "AI Chat Agents",
  "AI Voice Agents",
  "Both",
  "Not sure yet",
];

type FormState = {
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
};

type FieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "company"
  | "phone"
  | "role"
  | "companySize"
  | "interest"
  | "website";

type FormErrors = Partial<Record<FieldKey, string>>;

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  website: "",
  phone: "",
  role: "",
  companySize: "",
  interest: "",
  project: "",
  countryIso: "US",
};

const inputClass =
  "h-12 rounded-xl border border-primary/18 bg-black/30 px-4 text-sm font-normal text-foreground shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] outline-none transition placeholder:text-muted-foreground/65 focus:border-primary/60 focus:ring-2 focus:ring-primary/25";

function getCountryFlag(iso2: string) {
  return iso2
    .toUpperCase()
    .replace(/./g, (character) =>
      String.fromCodePoint(127397 + character.charCodeAt(0)),
    );
}

function useOutsideClose(
  open: boolean,
  ref: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current?.contains(event.target as Node)) return;
      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, ref]);
}

function validateForm(form: FormState): FormErrors {
  const nextErrors: FormErrors = {};

  if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
  if (!form.lastName.trim()) nextErrors.lastName = "Last name is required.";
  if (!form.email.trim()) {
    nextErrors.email = "Work email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    nextErrors.email = "Enter a valid work email.";
  }
  if (!form.company.trim()) nextErrors.company = "Company name is required.";
  if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
  if (!form.role) nextErrors.role = "Select your role.";
  if (!form.companySize) nextErrors.companySize = "Select company size.";
  if (!form.interest) nextErrors.interest = "Select an option.";

  if (form.website.trim()) {
    try {
      new URL(form.website);
    } catch {
      nextErrors.website = "Enter a valid URL including https://.";
    }
  }

  return nextErrors;
}

export function BookDemoForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const selectedCountry =
    countries.find((country) => country.iso2 === form.countryIso) ??
    countries.find((country) => country.iso2 === "US") ??
    countries[0];

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSubmitError("");
    setErrors((current) => {
      if (!(key in current)) return current;
      const nextErrors = { ...current };
      delete nextErrors[key as FieldKey];
      return nextErrors;
    });
  };

  if (submitted) {
    return (
      <Card className="gold-card relative overflow-hidden rounded-[1.5rem] border-primary/28 p-8 text-center shadow-[0_32px_110px_-64px_rgba(201,160,61,0.95)] sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(72% 55% at 50% 0%, rgba(201,160,61,0.18) 0%, rgba(201,160,61,0) 68%)",
          }}
        />
        <div className="relative">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
          <h2 className="mt-5 text-h3 font-semibold text-foreground">
            Thank you. Your strategy call request has been received.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            We&apos;ll review your details and suggest the best AI setup for your
            business.
          </p>
          <Button
            type="button"
            className="mt-6 rounded-xl"
            onClick={() => {
              setForm(initialForm);
              setSubmitError("");
              setSubmitted(false);
            }}
          >
            Send another request
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-visible rounded-[1.5rem] border-primary/24 bg-[linear-gradient(145deg,rgba(26,22,12,0.9),rgba(9,8,6,0.94))] p-5 shadow-[0_36px_130px_-72px_rgba(201,160,61,0.95)] sm:p-7 lg:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-75"
        style={{
          backgroundImage:
            "radial-gradient(80% 60% at 95% 0%, rgba(201,160,61,0.18) 0%, rgba(201,160,61,0) 70%)",
        }}
      />
      <form
        className="relative grid gap-5"
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          if (submitting) return;

          const nextErrors = validateForm(form);
          setErrors(nextErrors);
          setSubmitError("");

          if (Object.keys(nextErrors).length > 0) return;

          setSubmitting(true);

          try {
            const response = await fetch("/api/book-demo", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...form,
                countryName: selectedCountry.name,
                dialCode: selectedCountry.dialCode,
                source: "Kaizen AI Website",
              }),
            });

            const result = (await response.json().catch(() => null)) as {
              message?: string;
            } | null;

            if (!response.ok) {
              throw new Error(
                result?.message ||
                  "Something went wrong. Please try again in a moment.",
              );
            }

            setSubmitted(true);
          } catch (error) {
            setSubmitError(
              error instanceof Error
                ? error.message
                : "Something went wrong. Please try again in a moment.",
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Request Your Call
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Tell us where Kaizen AI can help.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="First Name"
            placeholder="First name"
            value={form.firstName}
            onChange={(value) => updateField("firstName", value)}
            error={errors.firstName}
            required
          />
          <TextField
            label="Last Name"
            placeholder="Last name"
            value={form.lastName}
            onChange={(value) => updateField("lastName", value)}
            error={errors.lastName}
            required
          />
          <TextField
            label="Work Email"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(value) => updateField("email", value)}
            error={errors.email}
            required
          />
          <TextField
            label="Company Name"
            placeholder="Your company name"
            value={form.company}
            onChange={(value) => updateField("company", value)}
            error={errors.company}
            required
          />
          <TextField
            label="Company Website"
            type="url"
            placeholder="https://yourcompany.com"
            value={form.website}
            onChange={(value) => updateField("website", value)}
            error={errors.website}
            optional
          />
          <PhoneField
            phone={form.phone}
            selectedCountry={selectedCountry}
            onPhoneChange={(value) => updateField("phone", value)}
            onCountryChange={(country) => updateField("countryIso", country.iso2)}
            error={errors.phone}
          />
          <PremiumSelect
            label="Your Role"
            placeholder="Select your role"
            value={form.role}
            options={roles}
            onChange={(value) => updateField("role", value)}
            error={errors.role}
            required
          />
          <PremiumSelect
            label="Company Size"
            placeholder="Select company size"
            value={form.companySize}
            options={companySizes}
            onChange={(value) => updateField("companySize", value)}
            error={errors.companySize}
            required
          />
        </div>

        <InterestSelector
          value={form.interest}
          onChange={(value) => updateField("interest", value)}
          error={errors.interest}
        />

        <TextAreaField
          label="Tell us about your project"
          placeholder="What challenges are you facing? What does success look like for your business?"
          value={form.project}
          onChange={(value) => updateField("project", value)}
          optional
        />

        <div className="grid gap-3 pt-1">
          {submitError && (
            <p
              role="alert"
              className="rounded-xl border border-destructive/35 bg-destructive/10 px-4 py-3 text-sm font-medium leading-6 text-destructive"
            >
              {submitError}
            </p>
          )}
          <Button
            type="submit"
            size="xl"
            className="w-full rounded-xl"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Request My Call"}
          </Button>
          <p className="text-center text-sm leading-6 text-muted-foreground">
            No pressure. We&apos;ll review your details and suggest the best AI
            setup for your business.
          </p>
        </div>
      </form>
    </Card>
  );
}

function FieldLabel({
  id,
  label,
  optional,
  required,
}: {
  id: string;
  label: string;
  optional?: boolean;
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="flex items-center justify-between gap-3 text-sm font-semibold text-foreground">
      <span>
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {optional && (
        <span className="text-xs font-medium text-muted-foreground">
          Optional
        </span>
      )}
    </label>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;

  return (
    <p id={id} className="text-xs font-medium leading-5 text-destructive">
      {error}
    </p>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required = false,
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-2">
      <FieldLabel id={id} label={label} optional={optional} required={required} />
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          inputClass,
          error &&
            "border-destructive/60 bg-destructive/10 focus:border-destructive focus:ring-destructive/20",
        )}
      />
      <FieldError id={errorId} error={error} />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  optional?: boolean;
}) {
  const id = useId();

  return (
    <div className="grid gap-2">
      <FieldLabel id={id} label={label} optional={optional} />
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        placeholder={placeholder}
        className="min-h-32 resize-none rounded-xl border border-primary/18 bg-black/30 px-4 py-3 text-sm font-normal leading-6 text-foreground shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] outline-none transition placeholder:text-muted-foreground/65 focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
      />
    </div>
  );
}

function PremiumSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
  error,
  required = false,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const errorId = `${id}-error`;

  useOutsideClose(open, ref, () => setOpen(false));

  return (
    <div className="relative grid gap-2" ref={ref}>
      <FieldLabel id={id} label={label} required={required} />
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-describedby={error ? errorId : undefined}
        onPointerDown={(event) => {
          event.preventDefault();
          setOpen((current) => !current);
        }}
        onClick={(event) => {
          if (event.detail === 0) {
            setOpen((current) => !current);
          }
        }}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-3 rounded-xl border border-primary/18 bg-black/30 px-4 text-left text-sm font-normal text-foreground shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/25",
          !value && "text-muted-foreground/75",
          error &&
            "border-destructive/60 bg-destructive/10 focus:border-destructive focus:ring-destructive/20",
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-primary transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 max-h-64 overflow-y-auto rounded-2xl border border-primary/24 bg-[linear-gradient(145deg,rgba(22,19,13,0.98),rgba(7,6,5,0.98))] p-2 shadow-[0_24px_90px_-42px_rgba(201,160,61,0.95)] backdrop-blur-xl"
          >
            {options.map((option) => {
              const selected = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-foreground/74 transition-colors hover:bg-primary/10 hover:text-foreground",
                    selected && "bg-primary/15 text-primary",
                  )}
                >
                  <span>{option}</span>
                  {selected && <Check className="h-4 w-4" aria-hidden />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

function PhoneField({
  phone,
  selectedCountry,
  onPhoneChange,
  onCountryChange,
  error,
}: {
  phone: string;
  selectedCountry: Country;
  onPhoneChange: (value: string) => void;
  onCountryChange: (country: Country) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const errorId = `${id}-error`;

  useOutsideClose(open, ref, () => setOpen(false));

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return countries;

    return countries.filter((country) => {
      return (
        country.name.toLowerCase().includes(normalizedQuery) ||
        country.dialCode.includes(normalizedQuery)
      );
    });
  }, [query]);

  return (
    <div className="relative grid gap-2" ref={ref}>
      <FieldLabel id={id} label="Phone Number" required />
      <div
        className={cn(
          "flex h-12 overflow-hidden rounded-xl border border-primary/18 bg-black/30 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/25",
          error &&
            "border-destructive/60 bg-destructive/10 focus-within:border-destructive focus-within:ring-destructive/20",
        )}
      >
        <button
          type="button"
          aria-label={`Select country. Current country: ${selectedCountry.name}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          onPointerDown={(event) => {
            event.preventDefault();
            setOpen((current) => !current);
          }}
          onClick={(event) => {
            if (event.detail === 0) {
              setOpen((current) => !current);
            }
          }}
          className="grid w-14 shrink-0 place-items-center border-r border-primary/16 bg-primary/[0.08] text-xl outline-none transition hover:bg-primary/14 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span aria-hidden>{getCountryFlag(selectedCountry.iso2)}</span>
        </button>
        <span className="grid h-full min-w-16 shrink-0 place-items-center border-r border-primary/16 px-3 text-sm font-semibold text-primary">
          {selectedCountry.dialCode}
        </span>
        <input
          id={id}
          type="tel"
          value={phone}
          placeholder="Phone number"
          aria-required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onPhoneChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground/65"
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-primary/24 bg-[linear-gradient(145deg,rgba(22,19,13,0.98),rgba(7,6,5,0.98))] shadow-[0_24px_90px_-42px_rgba(201,160,61,0.95)] backdrop-blur-xl"
          >
            <div className="border-b border-border/70 p-2">
              <div className="flex h-10 items-center gap-2 rounded-xl border border-primary/18 bg-black/30 px-3">
                <Search className="h-4 w-4 text-primary" aria-hidden />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search countries"
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/65"
                />
              </div>
            </div>
            <div role="listbox" className="max-h-72 overflow-y-auto p-2">
              {filteredCountries.map((country) => {
                const selected = country.iso2 === selectedCountry.iso2;

                return (
                  <button
                    key={country.iso2}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onCountryChange(country);
                      setQuery("");
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-foreground/74 transition-colors hover:bg-primary/10 hover:text-foreground",
                      selected && "bg-primary/15 text-primary",
                    )}
                  >
                    <span className="text-lg" aria-hidden>
                      {getCountryFlag(country.iso2)}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{country.name}</span>
                    <span className="font-semibold text-primary/90">
                      {country.dialCode}
                    </span>
                  </button>
                );
              })}
              {filteredCountries.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No countries found.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

function InterestSelector({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <fieldset className="grid gap-4" aria-describedby={error ? errorId : undefined}>
      <legend className="text-sm font-semibold text-foreground">
        What are you interested in?
        <span className="text-primary"> *</span>
      </legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-4">
        {interests.map((interest) => {
          const selected = interest === value;
          const isNotSure = interest === "Not sure yet";

          return (
            <div key={interest} className="group relative">
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(interest)}
                className={cn(
                  "min-h-20 w-full rounded-2xl border border-primary/18 bg-black/25 px-4 py-3 text-left text-sm font-semibold text-foreground/76 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition hover:border-primary/42 hover:bg-primary/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                  selected &&
                    "border-primary/65 bg-primary/15 text-primary shadow-[0_20px_58px_-36px_rgba(201,160,61,0.95)]",
                  error && "border-destructive/60",
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  {interest}
                  {isNotSure && (
                    <Info className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  )}
                </span>
              </button>
              {isNotSure && (
                <div className="pointer-events-none absolute bottom-[calc(100%+0.65rem)] right-0 z-50 hidden w-72 translate-y-1 rounded-2xl border border-primary/24 bg-[linear-gradient(145deg,rgba(24,20,12,0.98),rgba(7,6,5,0.98))] px-4 py-3 text-xs leading-5 text-foreground/78 opacity-0 shadow-[0_22px_70px_-34px_rgba(201,160,61,0.9)] transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
                  Not sure what fits best? Kaizen AI can also automate business
                  workflows beyond chat and voice, helping reduce manual work and
                  improve operational efficiency with custom AI systems.
                </div>
              )}
            </div>
          );
        })}
      </div>
      <FieldError id={errorId} error={error} />
    </fieldset>
  );
}
