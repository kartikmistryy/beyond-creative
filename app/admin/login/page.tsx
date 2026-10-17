"use client";
import { useActionState } from "react";
import { loginAction } from "../actions";

export default function Login() {
  const [error, action, pending] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="mx-auto flex min-h-svh max-w-sm flex-col justify-center gap-4 px-4">
      <h1 className="text-3xl font-medium tracking-tight">
        Beyond<em className="accent">creative</em> <span className="text-muted">admin</span>
      </h1>
      <label className="grid gap-1 text-sm">
        Password
        <input
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="rounded-lg border border-line px-3 py-2.5 outline-none focus:border-blue"
        />
      </label>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button disabled={pending} className="rounded-lg bg-ink py-2.5 text-white hover:bg-blue disabled:opacity-50">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
