import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { ensureProfile, type Profile } from "@/lib/server/profile";
import { listNotifications } from "@/lib/server/community";

type AppStateValue = {
  profile: Profile | null;
  unread: number;
  refresh: () => Promise<void>;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [unread, setUnread] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const [p, notes] = await Promise.all([ensureProfile(), listNotifications()]);
      setProfile(p);
      setUnread(notes.filter((n) => !n.read).length);
    } catch {
      /* signed-out or network */
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <AppStateContext.Provider value={{ profile, unread, refresh }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
