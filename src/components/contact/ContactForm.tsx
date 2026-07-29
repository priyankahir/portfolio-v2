"use client";

import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent";
type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", subject: "", message: "" };

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 20)
    errors.message = "A little more detail helps — 20 characters minimum.";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  /** Hidden field bots fill in and humans never see. */
  const [honeypot, setHoneypot] = useState("");

  const update = (key: keyof Fields) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error ?? "Request failed");

      setStatus("sent");
      setValues(EMPTY);
      toast.success("Message sent — I'll reply within a day.");
      setTimeout(() => setStatus("idle"), 6000);
    } catch (error) {
      setStatus("idle");
      toast.error(
        error instanceof Error && error.message !== "Request failed"
          ? error.message
          : "Couldn't send that. Email me directly and it'll definitely reach me."
      );
    }
  };

  const disabled = status !== "idle";

  return (
    <form onSubmit={onSubmit} noValidate className="panel p-6 md:p-8">
      <p className="mb-6 font-mono text-xs text-faint">
        <span aria-hidden="true" className="text-primary">
          ${" "}
        </span>
        ./send-message --to=priyank
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Your name"
          value={values.name}
          error={errors.name}
          onChange={update("name")}
          disabled={disabled}
          autoComplete="name"
          placeholder="Ada Lovelace"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={update("email")}
          disabled={disabled}
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>

      <div className="mt-5">
        <Field
          id="subject"
          label="Subject"
          optional
          value={values.subject}
          onChange={update("subject")}
          disabled={disabled}
          placeholder="MERN role at …"
        />
      </div>

      <div className="mt-5">
        <Field
          id="message"
          label="Message"
          multiline
          value={values.message}
          error={errors.message}
          onChange={update("message")}
          disabled={disabled}
          placeholder="What are you building, and where do you need help?"
        />
      </div>

      {/* Honeypot — visually hidden, ignored by real users. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-on-primary transition-all duration-300 hover:brightness-110 active:scale-[0.99] disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {status === "sent" ? "Message sent ✓" : status === "sending" ? "Sending…" : "Send message"}
        {status === "idle" && <Send className="h-4 w-4" aria-hidden="true" />}
      </button>

      <p aria-live="polite" className="sr-only">
        {status === "sent" ? "Your message was sent successfully." : ""}
      </p>
    </form>
  );
}

interface FieldProps {
  id: keyof Fields;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  type?: string;
  multiline?: boolean;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  disabled,
  type = "text",
  multiline,
  optional,
  placeholder,
  autoComplete,
}: FieldProps) {
  const describedBy = error ? `${id}-error` : undefined;
  const shared = {
    id,
    name: id,
    value,
    onChange,
    disabled,
    placeholder,
    autoComplete,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    className: cn(
      "w-full rounded-lg border bg-bg px-3.5 py-2.5 text-sm text-fg transition-colors placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60",
      error ? "border-[#ff6b6b]" : "border-line focus:border-line-strong"
    ),
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-faint"
      >
        {label}
        {optional && <span className="normal-case text-faint/70">(optional)</span>}
      </label>

      {multiline ? (
        <textarea {...shared} rows={5} className={cn(shared.className, "resize-y")} />
      ) : (
        <input {...shared} type={type} />
      )}

      {error && (
        <p id={describedBy} className="mt-1.5 text-xs text-[#ff6b6b]">
          {error}
        </p>
      )}
    </div>
  );
}
