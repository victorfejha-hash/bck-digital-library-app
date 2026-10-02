import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  APP_NAME,
  DEVELOPERS,
  SCHOOL_LOCATION,
  SCHOOL_NAME,
  TAGLINE,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Splash } from "@/components/splash";
import { ensureProfile, updateProfile } from "@/lib/server/profile";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    school: SCHOOL_NAME,
    password: "",
  });

  if (isPending) return <Splash />;
  if (user) return <Navigate to="/" />;

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onEmail(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email: form.email.trim(),
          password: form.password,
          name: form.name.trim() || "Learner",
        });
        if (err) throw new Error(err.message || "Could not create account");
        await ensureProfile();
        await updateProfile({
          data: {
            name: form.name.trim() || "Learner",
            phone: form.phone.trim(),
            school: form.school.trim() || SCHOOL_NAME,
          },
        });
      } else {
        const { error: err } = await authClient.signIn.email({
          email: form.email.trim(),
          password: form.password,
        });
        if (err) throw new Error(err.message || "Could not sign in");
      }
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
      setBusy(false);
    }
  }

  return (
    <div className="hero-depth grid min-h-dvh lg:grid-cols-[1.1fr_0.9fr]">
      <section className="hidden flex-col justify-between p-10 lg:flex">
        <div>
          <p className="text-xs tracking-[0.28em] text-subtle uppercase">BCK</p>
          <h1 className="mt-6 max-w-md font-display text-4xl leading-tight">{APP_NAME}</h1>
          <p className="mt-4 max-w-md text-muted">
            {SCHOOL_NAME}
            <br />
            {SCHOOL_LOCATION}
          </p>
          <p className="mt-8 text-sm tracking-[0.18em] text-accent uppercase">{TAGLINE}</p>
        </div>
        <p className="text-xs text-subtle">Developed by {DEVELOPERS}</p>
      </section>

      <section className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md rounded-[28px] border border-border bg-surface p-6 shadow-lift">
          <p className="text-xs tracking-[0.22em] text-subtle uppercase lg:hidden">BCK</p>
          <h2 className="font-display text-2xl">Welcome back</h2>
          <p className="mt-1 text-sm text-muted">
            Sign in to open PDFs, sit exams, and ask the study coach.
          </p>

          <div className="mt-5 grid grid-cols-2 rounded-[var(--radius-md)] bg-bg p-1">
            <button
              type="button"
              className={`h-10 rounded-[10px] text-sm ${mode === "in" ? "bg-surface-2 text-fg" : "text-muted"}`}
              onClick={() => setMode("in")}
            >
              Sign in
            </button>
            <button
              type="button"
              className={`h-10 rounded-[10px] text-sm ${mode === "up" ? "bg-surface-2 text-fg" : "text-muted"}`}
              onClick={() => setMode("up")}
            >
              Create account
            </button>
          </div>

          {authEnabled ? (
            <>
              <form className="mt-5 space-y-3" onSubmit={onEmail}>
                {mode === "up" && (
                  <>
                    <Field label="Full name">
                      <Input value={form.name} onChange={(e) => set("name", e.target.value)} required />
                    </Field>
                    <Field label="Phone">
                      <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                    </Field>
                    <Field label="School">
                      <Input value={form.school} onChange={(e) => set("school", e.target.value)} />
                    </Field>
                  </>
                )}
                <Field label="Email">
                  <Input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    required
                  />
                </Field>
                <Field label="Password">
                  <Input
                    type="password"
                    autoComplete={mode === "up" ? "new-password" : "current-password"}
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    minLength={8}
                    required
                  />
                </Field>
                {error && <p className="text-sm text-danger">{error}</p>}
                <Button className="w-full" disabled={busy} type="submit">
                  {busy ? "Please wait…" : mode === "up" ? "Create account" : "Sign in"}
                </Button>
              </form>

              <div className="my-5 flex items-center gap-3 text-xs text-subtle">
                <span className="h-px flex-1 bg-border" />
                or continue with
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-2">
                {GROK_PROVIDERS.map((p) => (
                  <Button
                    key={p.providerId}
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                  >
                    Continue with {p.label}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
