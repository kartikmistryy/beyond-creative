"use server";
import { revalidatePath } from "next/cache";
import { addLead } from "@/lib/db";

export type ContactState = { ok?: boolean; error?: string };

const field = (f: FormData, k: string, max = 200) => String(f.get(k) ?? "").trim().slice(0, max);

export async function submitContact(_: ContactState, f: FormData): Promise<ContactState> {
  if (field(f, "website")) return { ok: true }; // honeypot: bots fill it, humans never see it
  const lead = {
    name: field(f, "name"),
    email: field(f, "email"),
    company: field(f, "company"),
    service: field(f, "service"),
    budget: field(f, "budget"),
    message: field(f, "message", 5000),
  };
  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email) || !lead.message)
    return { error: "Please add your name, a valid email and a few words about the project." };
  addLead(lead);
  revalidatePath("/admin");
  return { ok: true };
}
