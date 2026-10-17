"use client";
import { useActionState } from "react";
import { aiAutomation, services } from "@/lib/site";
import { submitContact } from "./actions";

const budgets = ["< ₹2L", "₹2L – ₹5L", "₹5L – ₹15L", "₹15L+", "Not sure yet"];
const input =
  "t-2 w-full border-b border-blue/30 bg-transparent py-3 outline-none transition-colors focus:border-blue";

export function ContactForm({ defaultService }: { defaultService: string }) {
  const [state, action, pending] = useActionState(submitContact, {});

  if (state.ok)
    return (
      <div className="flex flex-col justify-end" role="status">
        <p data-reveal className="t-xl in">
          Thank <span className="hl">you.</span>
        </p>
        <p className="t-2 mt-4">We&apos;ll be in touch within two working days.</p>
      </div>
    );

  return (
    <form action={action} className="grid gap-6 sm:grid-cols-2">
      <label className="sm:col-span-1">
        <span className="t-3">Name *</span>
        <input name="name" required autoComplete="name" className={input} />
      </label>
      <label>
        <span className="t-3">Email *</span>
        <input name="email" type="email" required autoComplete="email" className={input} />
      </label>
      <label className="sm:col-span-2">
        <span className="t-3">Company</span>
        <input name="company" autoComplete="organization" className={input} />
      </label>

      <fieldset className="sm:col-span-2">
        <legend className="t-3 mb-3">Interested in</legend>
        <div className="flex flex-wrap gap-2">
          {[aiAutomation.title, ...services.map((s) => s.title)].map((t) => (
            <Chip key={t} name="service" value={t} defaultChecked={t === defaultService} />
          ))}
        </div>
      </fieldset>
      <fieldset className="sm:col-span-2">
        <legend className="t-3 mb-3">Budget</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => <Chip key={b} name="budget" value={b} />)}
        </div>
      </fieldset>

      <label className="sm:col-span-2">
        <span className="t-3">Project details *</span>
        <textarea name="message" required rows={5} className={`${input} resize-y`} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {state.error && <p role="alert" className="text-sm text-red-600 sm:col-span-2">{state.error}</p>}
      <button
        disabled={pending}
        className="cta t-3 justify-self-start text-ink disabled:opacity-50 sm:col-span-2"
      >
        {pending ? "Sending…" : "Send enquiry"} <span aria-hidden>→</span>
      </button>
    </form>
  );
}

function Chip(props: { name: string; value: string; defaultChecked?: boolean }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" {...props} className="peer sr-only" />
      <span className="block t-3 border border-blue/30 px-3 py-1.5 transition-colors peer-checked:border-blue peer-checked:bg-blue peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-blue hover:border-blue">
        {props.value}
      </span>
    </label>
  );
}
