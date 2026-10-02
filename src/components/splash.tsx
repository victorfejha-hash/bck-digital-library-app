import { APP_NAME, SCHOOL_NAME, TAGLINE } from "@/lib/constants";

export function Splash() {
  return (
    <div className="hero-depth flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 grid size-16 place-items-center rounded-[20px] border border-border-strong bg-surface text-lg font-semibold tracking-[0.2em] text-accent">
        BCK
      </div>
      <h1 className="font-display text-3xl text-fg">{APP_NAME}</h1>
      <p className="mt-2 text-sm text-muted">{SCHOOL_NAME}</p>
      <p className="mt-6 text-sm tracking-[0.18em] text-subtle uppercase">{TAGLINE}</p>
      <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-surface-2">
        <div className="shimmer h-full w-full rounded-full bg-primary/40" />
      </div>
      <p className="mt-3 text-xs text-subtle">Loading your learning space</p>
    </div>
  );
}
