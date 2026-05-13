"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const roles = [
  "Founder / CEO",
  "Operations Manager",
  "Marketing Manager",
  "Sales Manager",
  "IT / Tech Lead",
  "Other",
];

const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];
const budgets = ["$15K-$50K", "$50K-$150K", "$150K-$500K", "Not sure yet"];
const interests = [
  "AI Chatbot",
  "AI Voice Agent",
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
  budget: string;
  interest: string;
  project: string;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  website: "",
  phone: "",
  role: "",
  companySize: "",
  budget: "",
  interest: "",
  project: "",
};

export function BookDemoForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  if (submitted) {
    return (
      <Card className="gold-card p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
        <h2 className="mt-5 text-h3 font-semibold text-foreground">
          We&apos;ll be in touch shortly.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Thanks for reaching out. This frontend demo does not send data yet,
          but the success flow is ready for the future integration.
        </p>
        <Button
          type="button"
          className="mt-6"
          onClick={() => {
            setForm(initialForm);
            setSubmitted(false);
          }}
        >
          Send another request
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <form
        className="grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (!form.firstName || !form.lastName || !form.email || !form.company) {
            setError("Please complete your name, email, and company.");
            return;
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setError("Please enter a valid work email.");
            return;
          }
          setError("");
          setSubmitted(true);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First Name" value={form.firstName} onChange={(value) => updateField("firstName", value)} required />
          <Field label="Last Name" value={form.lastName} onChange={(value) => updateField("lastName", value)} required />
          <Field label="Work Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} required />
          <Field label="Company" value={form.company} onChange={(value) => updateField("company", value)} required />
          <Field label="Company Website" type="url" value={form.website} onChange={(value) => updateField("website", value)} />
          <Field label="Phone Number" type="tel" value={form.phone} onChange={(value) => updateField("phone", value)} />
          <SelectField label="Your Role" value={form.role} options={roles} onChange={(value) => updateField("role", value)} />
          <SelectField label="Company Size" value={form.companySize} options={companySizes} onChange={(value) => updateField("companySize", value)} />
          <SelectField label="Budget Range" value={form.budget} options={budgets} onChange={(value) => updateField("budget", value)} />
          <SelectField label="Interested In" value={form.interest} options={interests} onChange={(value) => updateField("interest", value)} />
        </div>

        <label className="grid gap-2 text-sm font-semibold text-foreground">
          Tell us about your project
          <textarea
            value={form.project}
            onChange={(event) => updateField("project", event.target.value)}
            rows={5}
            className="resize-none rounded-xl border border-border bg-background/75 px-4 py-3 text-sm font-normal text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
            placeholder="Channels, call volume, booking flow, timeline..."
          />
        </label>

        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground">
            {error}
          </p>
        )}

        <Button type="submit" size="xl" className="w-full sm:w-auto">
          Request my call
        </Button>
      </form>
    </Card>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-foreground">
      {label}
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-xl border border-border bg-background/75 px-4 text-sm font-normal text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-foreground">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-xl border border-border bg-background/75 px-4 text-sm font-normal text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
      >
        <option value="">Select an option...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
