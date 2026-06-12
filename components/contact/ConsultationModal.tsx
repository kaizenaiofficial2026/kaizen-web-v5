"use client";

import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { Globe2, Mail, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CONSULTATION_MODAL_EVENT } from "@/components/contact/consultation-modal-events";
import { cn } from "@/lib/utils";

const companySizes = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
];

const budgetRanges = [
  "Not sure yet",
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $10,000",
  "$10,000+",
];

const budgetTicks = ["Not sure", "< $1k", "$1k–$3k", "$3k–$10k", "$10k+"];

type ConsultationFormState = {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  companyWebsite: string;
  role: string;
  companySize: string;
  budgetRange: string;
  project: string;
};

const initialFormState: ConsultationFormState = {
  firstName: "",
  lastName: "",
  workEmail: "",
  company: "",
  companyWebsite: "",
  role: "",
  companySize: "",
  budgetRange: budgetRanges[0],
  project: "",
};

const inputClass =
  "h-10 rounded-lg border border-primary/16 bg-black px-3 text-sm text-[#F0EAD8] outline-none transition placeholder:text-muted-foreground/55 focus:border-primary/70 focus:ring-2 focus:ring-primary/25";

const contactDetails = [
  {
    label: "WhatsApp",
    value: "+94 77 029 9569",
    Icon: MessageCircle,
  },
  {
    label: "Email",
    value: "hello@kaizenai.dev",
    Icon: Mail,
  },
  {
    label: "Working globally",
    value: "Remote consultations available worldwide",
    Icon: Globe2,
  },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/62">
        {label}
      </span>
      {children}
    </label>
  );
}

export function ConsultationModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ConsultationFormState>(initialFormState);
  const budgetIndex = budgetRanges.indexOf(form.budgetRange);
  const budgetPercent = `${(Math.max(budgetIndex, 0) / (budgetRanges.length - 1)) * 100}%`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOpen = () => {
      setSubmitted(false);
      setOpen(true);
    };

    window.addEventListener(CONSULTATION_MODAL_EVENT, handleOpen);
    return () =>
      window.removeEventListener(CONSULTATION_MODAL_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const shouldOpenConsultation = (href: string) => {
      try {
        const url = new URL(href, window.location.href);
        return url.pathname === "/contact" && url.hash === "#book";
      } catch {
        return false;
      }
    };

    const handleConsultationLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");

      if (!link || !shouldOpenConsultation(link.href)) return;

      event.preventDefault();
      setSubmitted(false);
      setOpen(true);
    };

    document.addEventListener("click", handleConsultationLinkClick, {
      capture: true,
    });

    if (shouldOpenConsultation(window.location.href)) {
      setSubmitted(false);
      setOpen(true);
      window.history.replaceState(null, "", window.location.pathname);
    }

    return () =>
      document.removeEventListener("click", handleConsultationLinkClick, {
        capture: true,
      });
  }, []);

  const updateField =
    (key: keyof ConsultationFormState) =>
    (
      event:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLSelectElement>
        | ChangeEvent<HTMLTextAreaElement>,
    ) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
    };

  const handleBudgetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.target.value);
    setForm((current) => ({
      ...current,
      budgetRange: budgetRanges[index] ?? budgetRanges[0],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialFormState);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="left-0 top-0 h-dvh max-h-dvh w-screen max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-none border-0 bg-black p-0 shadow-none sm:w-screen sm:p-0 lg:overflow-hidden [&>button.absolute]:right-4 [&>button.absolute]:top-4 [&>button.absolute]:z-30 [&>button.absolute]:grid [&>button.absolute]:h-10 [&>button.absolute]:w-10 [&>button.absolute]:place-items-center [&>button.absolute]:rounded-full [&>button.absolute]:border [&>button.absolute]:border-primary/28 [&>button.absolute]:bg-black/78 [&>button.absolute]:text-[#F0EAD8]/82 [&>button.absolute]:backdrop-blur-md [&>button.absolute]:hover:text-primary sm:[&>button.absolute]:right-5 sm:[&>button.absolute]:top-5">
        <div className="mx-auto flex min-h-dvh w-full max-w-[1180px] items-start px-4 pb-8 pt-16 sm:px-6 sm:pb-12 lg:items-center lg:px-8 lg:py-12">
          <div className="grid w-full gap-5 sm:gap-8 lg:h-[calc(100dvh-6rem)] lg:grid-cols-[0.45fr_0.55fr] lg:items-center lg:gap-12">
            <div className="relative isolate overflow-visible bg-black">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-16 top-4 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(196,154,48,0.14),transparent_68%)] blur-2xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 right-4 -z-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.1),transparent_70%)] blur-2xl"
              />
              <div className="relative z-10 flex h-full flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-xs sm:tracking-[0.28em]">
                  FREE CONSULTATION
                </span>
                <DialogTitle className="mt-4 max-w-xl pr-10 text-3xl font-semibold leading-[1.04] tracking-tight text-[#F0EAD8] sm:mt-5 sm:pr-0 sm:text-5xl lg:text-[3.45rem]">
                  Ready to discover what AI can automate in your business?
                </DialogTitle>
                <DialogDescription className="mt-4 max-w-md text-sm leading-6 text-[#A3A3A3] sm:mt-5 sm:text-base sm:leading-7">
                  We identify bottlenecks, map AI opportunities, and deliver
                  integrated automation systems end-to-end.
                </DialogDescription>

                <div className="mt-5 grid gap-2 sm:mt-8 sm:gap-3 lg:mt-10">
                  {contactDetails.map(({ label, value, Icon }) => (
                    <div
                      key={label}
                      className="group/detail relative isolate flex gap-3 overflow-hidden rounded-2xl border border-primary/16 bg-black/72 p-2.5 shadow-[0_16px_48px_-36px_rgba(196,154,48,0.8)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/34 hover:shadow-[0_22px_64px_-38px_rgba(212,168,83,0.95)] sm:p-3"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -left-8 top-1/2 -z-10 h-24 w-24 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(196,154,48,0.12),transparent_72%)] blur-xl transition-opacity duration-300 group-hover/detail:opacity-100"
                      />
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-primary/26 bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(240,234,216,0.08)] transition-colors duration-300 group-hover/detail:border-primary/45 group-hover/detail:bg-primary/14 sm:h-10 sm:w-10">
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80 sm:text-xs">
                          {label}
                        </p>
                        <p className="mt-0.5 text-xs leading-5 text-[#F0EAD8]/84 sm:mt-1 sm:text-sm sm:leading-6">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative isolate bg-black">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-4 top-8 -z-10 h-72 rounded-full bg-[radial-gradient(circle,rgba(196,154,48,0.16),transparent_70%)] blur-3xl"
              />
              <div className="rounded-[1.1rem] border border-primary/20 bg-black/72 p-3.5 shadow-[0_28px_90px_-58px_rgba(196,154,48,0.9),inset_0_1px_0_rgba(240,234,216,0.08),inset_0_0_48px_rgba(196,154,48,0.035)] backdrop-blur-md sm:rounded-[1.25rem] sm:p-5 lg:p-6">
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-lg font-semibold tracking-tight text-[#F0EAD8] sm:text-xl">
                    Book a Free Consultation
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-[#A3A3A3] sm:mt-2 sm:text-sm sm:leading-6">
                    Tell us about your business and we’ll identify where AI
                    automation can create the most impact.
                  </p>
                </div>

              {submitted ? (
                <div className="rounded-2xl border border-primary/28 bg-primary/10 p-5 text-sm leading-6 text-[#F0EAD8]">
                  Thank you. Our team will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-3 sm:gap-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="First Name">
                      <input
                        required
                        value={form.firstName}
                        onChange={updateField("firstName")}
                        className={inputClass}
                        autoComplete="given-name"
                      />
                    </Field>
                    <Field label="Last Name">
                      <input
                        required
                        value={form.lastName}
                        onChange={updateField("lastName")}
                        className={inputClass}
                        autoComplete="family-name"
                      />
                    </Field>
                    <Field label="Work Email">
                      <input
                        required
                        type="email"
                        value={form.workEmail}
                        onChange={updateField("workEmail")}
                        className={inputClass}
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Company">
                      <input
                        required
                        value={form.company}
                        onChange={updateField("company")}
                        className={inputClass}
                        autoComplete="organization"
                      />
                    </Field>
                    <Field label="Company Website">
                      <input
                        value={form.companyWebsite}
                        onChange={updateField("companyWebsite")}
                        className={inputClass}
                        placeholder="https://"
                        autoComplete="url"
                      />
                    </Field>
                    <Field label="Your Role">
                      <input
                        value={form.role}
                        onChange={updateField("role")}
                        className={inputClass}
                        autoComplete="organization-title"
                      />
                    </Field>
                    <Field label="Company Size">
                      <select
                        value={form.companySize}
                        onChange={updateField("companySize")}
                        className={cn(inputClass, "appearance-none")}
                      >
                        <option value="">Select size</option>
                        {companySizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <div className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/62">
                        Budget Range
                      </span>
                      <div className="rounded-xl border border-primary/18 bg-black px-3 py-2.5">
                        <p className="text-sm font-semibold text-[#F0EAD8]">
                          Budget: {form.budgetRange}
                        </p>
                        <input
                          type="range"
                          min="0"
                          max="4"
                          step="1"
                          value={Math.max(budgetIndex, 0)}
                          onChange={handleBudgetChange}
                          aria-label="Budget Range"
                          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-primary transition-all duration-300 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-[#F0EAD8] [&::-moz-range-thumb]:bg-[#D4A853] [&::-moz-range-thumb]:shadow-[0_0_18px_rgba(212,168,83,0.7)] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#F0EAD8] [&::-webkit-slider-thumb]:bg-[#D4A853] [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(212,168,83,0.7)]"
                          style={{
                            background: `linear-gradient(to right, #C49A30 0%, #D4A853 ${budgetPercent}, rgba(255,255,255,0.12) ${budgetPercent}, rgba(255,255,255,0.12) 100%)`,
                          }}
                        />
                        <div className="mt-2 grid grid-cols-5 gap-2 text-center text-[10px] font-medium leading-tight text-muted-foreground">
                          {budgetTicks.map((tick) => (
                            <span key={tick}>{tick}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Field label="Tell Us About Your Project">
                    <textarea
                      required
                      value={form.project}
                      onChange={updateField("project")}
                      className="min-h-24 rounded-lg border border-primary/16 bg-black px-3 py-2.5 text-sm leading-6 text-[#F0EAD8] outline-none transition placeholder:text-muted-foreground/55 focus:border-primary/70 focus:ring-2 focus:ring-primary/25"
                      placeholder="What business problems are you trying to solve? What workflows do you want to automate?"
                    />
                  </Field>

                  <Button
                    type="submit"
                    size="xl"
                    className="h-12 w-full rounded-full bg-[linear-gradient(135deg,#D4A853_0%,#C49A30_52%,#8F6A16_100%)] px-7 text-black shadow-[0_18px_52px_-24px_rgba(212,168,83,0.95),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#E0BA61_0%,#C49A30_55%,#9B741C_100%)] sm:w-fit"
                  >
                    Submit Request
                  </Button>
                </form>
              )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
