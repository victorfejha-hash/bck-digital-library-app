import { Outlet, createFileRoute } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { AppStateProvider } from "@/lib/app-state";
import { AppShell } from "@/components/app-shell";
import { Splash } from "@/components/splash";

export const Route = createFileRoute("/_app")({ component: AppLayout });

function AppLayout() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <Splash />;
  if (!user) return <RedirectToSignIn />;
  return (
    <AppStateProvider>
      <AppShell>
        <Outlet />
      </AppShell>
    </AppStateProvider>
  );
}
