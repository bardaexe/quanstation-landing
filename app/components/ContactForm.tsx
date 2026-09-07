"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ defaultInterest = "General" }: { defaultInterest?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "The request could not be saved.");
      form.reset();
      setState("success");
      setMessage("Your request is in. We’ll follow up with the most relevant next step.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>Full name<input name="name" autoComplete="name" maxLength={100} required /></label>
        <label>Work email<input name="email" type="email" autoComplete="email" maxLength={160} required /></label>
      </div>
      <div className="form-row">
        <label>Company or team<input name="company" autoComplete="organization" maxLength={120} /></label>
        <label>What are you exploring?
          <select name="interest" defaultValue={defaultInterest}>
            <option>General</option><option>Access</option><option>Plans</option><option>Security</option><option>Starter</option><option>Pro</option><option>Premium</option><option>Elite</option><option>Privateer</option><option>Partnership</option>
          </select>
        </label>
      </div>
      <label>Tell us about your workflow<textarea name="message" maxLength={2000} rows={6} placeholder="Strategies, markets, execution setup, or the problem you want to solve…" required /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <p className="form-privacy">Barda Developments (dba, QuantStation) uses these details to respond to your request. Read our <Link href="/privacy">Privacy Policy</Link>. Please do not include passwords, broker keys, or payment-card details.</p>
      <div className="form-submit">
        <button className="button button-light" disabled={state === "submitting"} type="submit">
          {state === "submitting" ? "Saving request…" : "Send request"}
        </button>
        <p className={state === "error" ? "form-message error" : "form-message"} role="status" aria-live="polite">{message}</p>
      </div>
    </form>
  );
}
