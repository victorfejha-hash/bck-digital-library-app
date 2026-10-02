import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Bookmark,
  Bot,
  CircleHelp,
  CreditCard,
  GraduationCap,
  Home,
  Info,
  Menu,
  MessageSquare,
  MonitorPlay,
  Shield,
  Trophy,
  UserRound,
  X,
  Sun,
  Moon,
  Download,
  LogOut,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { UserButton } from "@/lib/auth/gates";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { authEnabled, signOut } from "@/lib/auth/client";
import { APP_NAME, SCHOOL_NAME, TAGLINE } from "@/lib/constants";
import { cn, initials } from "@/lib/utils";
import { useAppState } from "@/lib/app-state";
import { Button } from "@/components/ui/button";

type NavItem = {
  to: string;
  label: string;
  icon: typeof Home;
  admin?: boolean;
};

const PRIMARY: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/library", label: "Library", icon: BookOpen },
  { to: "/exams", label: "Exams", icon: GraduationCap },
  { to: "/coach", label: "AI Coach", icon: Bot },
  { to: "/courses", label: "Courses", icon: Bookmark },
  { to: "/media", label: "Study Media", icon: MonitorPlay },
  { to: "/rankings", label: "Rankings", icon: Trophy },
  { to: "/discussions", label: "Discussions", icon: MessageSquare },
  { to: "/school-pay", label: "School Pay", icon: CreditCard },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/saved", label: "My Library", icon: Bookmark },
  { to: "/account", label: "My Account", icon: UserRound },
  { to: "/contact", label: "Contact", icon: CircleHelp },
  { to: "/about", label: "About", icon: Info },
  { to: "/admin", label: "Admin", icon: Shield, admin: true },
];

const MOBILE_TABS: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/library", label: "Library", icon: BookOpen },
  { to: "/exams", label: "Exams", icon: GraduationCap },
  { to: "/coach", label: "Coach", icon: Bot },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { profile, unread } = useAppState();
  const [moreOpen, setMoreOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const gateSession = useSyncExternalStore(
    () => () => {},
    hasGateSessionMarker,
    () => false,
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("bck-theme");
    const next = stored === "light" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  const nav = useMemo(
    () => PRIMARY.filter((item) => !item.admin || profile?.isAdmin),
    [profile?.isAdmin],
  );

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("bck-theme", next);
  }

  async function installApp() {
    if (installEvent) {
      await installEvent.prompt();
      setInstallEvent(null);
      return;
    }
    window.location.href = "/?install=1";
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-bg-elevated/90 px-4 py-5 backdrop-blur-md lg:flex lg:flex-col">
        <div className="px-2">
          <p className="text-[11px] tracking-[0.22em] text-subtle uppercase">BCK</p>
          <h1 className="font-display text-xl leading-tight">{APP_NAME}</h1>
          <p className="mt-1 text-xs text-muted">{TAGLINE}</p>
        </div>
        <nav className="mt-6 flex-1 space-y-1 overflow-y-auto pr-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              item={item}
              active={item.to === "/" ? pathname === "/" : pathname.startsWith(item.to)}
              unread={unread}
            />
          ))}
        </nav>
        <p className="px-2 pt-3 text-[11px] leading-5 text-subtle">
          {SCHOOL_NAME}
          <br />
          Developed by VYRNOX
        </p>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-md">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-[var(--radius-sm)] hover:bg-surface lg:hidden"
            onClick={() => setMoreOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{pageTitle(pathname)}</p>
            <p className="truncate text-xs text-muted">
              {profile?.name ? `Hello, ${profile.name.split(" ")[0]}` : "Learner"}
              {typeof profile?.points === "number" ? ` · ${profile.points} pts` : ""}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={installApp} className="hidden sm:inline-flex">
            <Download className="size-3.5" />
            Install
          </Button>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-11 place-items-center rounded-[var(--radius-sm)] hover:bg-surface"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <Link
            to="/notifications"
            className="relative grid size-11 place-items-center rounded-[var(--radius-sm)] hover:bg-surface"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            {unread > 0 && (
              <span className="absolute top-2 right-2 size-2 rounded-full bg-primary" />
            )}
          </Link>
          <div className="hidden md:block">
            <UserButton />
          </div>
          <div className="grid size-10 place-items-center rounded-full bg-surface-2 text-xs font-semibold md:hidden">
            {initials(profile?.name || "Learner")}
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 pt-5 pb-28 lg:pb-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-elevated/95 px-2 py-1 backdrop-blur-md lg:hidden">
        <div className="grid grid-cols-5">
          {MOBILE_TABS.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px]",
                  active ? "text-accent" : "text-muted",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className="flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] text-muted"
          >
            <Menu className="size-4" />
            More
          </button>
        </div>
      </nav>

      {moreOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-bg/70"
            aria-label="Close menu"
            onClick={() => setMoreOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col border-r border-border bg-bg-elevated p-4">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-[11px] tracking-[0.22em] text-subtle uppercase">BCK</p>
                <p className="font-display text-xl">{APP_NAME}</p>
              </div>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-[var(--radius-sm)] hover:bg-surface"
                onClick={() => setMoreOpen(false)}
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  item={item}
                  active={item.to === "/" ? pathname === "/" : pathname.startsWith(item.to)}
                  unread={unread}
                />
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={installApp}>
                <Download className="size-4" />
                Install app
              </Button>
              {authEnabled && !gateSession && (
                <Button
                  variant="outline"
                  disabled={signingOut}
                  onClick={() => {
                    setSigningOut(true);
                    void signOut("/login").catch(() => setSigningOut(false));
                  }}
                >
                  <LogOut className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavLink({
  item,
  active,
  unread,
}: {
  item: NavItem;
  active: boolean;
  unread: number;
}) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm transition-colors duration-150",
        active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface hover:text-fg",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.to === "/notifications" && unread > 0 && (
        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-fg tabular-nums">
          {unread}
        </span>
      )}
    </Link>
  );
}

function pageTitle(pathname: string) {
  if (pathname === "/") return "Home";
  const match = PRIMARY.find((p) => p.to !== "/" && pathname.startsWith(p.to));
  return match?.label ?? APP_NAME;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}
