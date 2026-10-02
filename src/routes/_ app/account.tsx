import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signOut } from "@/lib/auth/client";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { deleteMyAccount, updateProfile } from "@/lib/server/profile";
import { useAppState } from "@/lib/app-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_app/account")({ component: AccountPage });

function AccountPage() {
  const user = useCurrentUser();
  const { profile, refresh } = useAppState();
  const gate = typeof window !== "undefined" ? hasGateSessionMarker() : false;
  const [form, setForm] = useState({
    name: profile?.name ?? "",
    phone: profile?.phone ?? "",
    school: profile?.school ?? "",
  });

  useEffect(() => {
    if (profile) {
      setForm({ name: profile.name, phone: profile.phone, school: profile.school });
    }
  }, [profile]);

  const save = useMutation({
    mutationFn: () => updateProfile({ data: form }),
    onSuccess: async () => {
      await refresh();
      toast("Profile updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: () => deleteMyAccount(),
    onSuccess: () => {
      toast("Account data deleted");
      void signOut("/login");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="view-enter mx-auto max-w-xl space-y-5">
      <div>
        <h1 className="font-display text-3xl">My Account</h1>
        <p className="mt-1 text-sm text-muted">Email is managed by your sign-in method.</p>
      </div>
      <Card className="space-y-3 p-5">
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input value={user?.primaryEmail ?? profile?.email ?? ""} readOnly />
        </div>
        <div className="space-y-1.5">
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Phone</Label>
          <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>School</Label>
          <Input value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} />
        </div>
        <p className="text-sm text-muted">Points: {profile?.points ?? 0}</p>
        <Button disabled={save.isPending} onClick={() => save.mutate()}>
          Save changes
        </Button>
      </Card>
      <Card className="space-y-3 p-5">
        <h2 className="font-medium">Sign out</h2>
        {!gate ? (
          <Button variant="secondary" onClick={() => void signOut("/login")}>
            Sign out
          </Button>
        ) : (
          <p className="text-sm text-muted">This session is managed by your Grok sign-in.</p>
        )}
      </Card>
      <Card className="space-y-3 p-5">
        <h2 className="font-medium">Delete account</h2>
        <p className="text-sm text-muted">
          Permanently deletes your BCK library profile, exam scores, saved books and bookings.
        </p>
        <Button
          variant="danger"
          disabled={remove.isPending}
          onClick={() => {
            if (window.confirm("Delete your BCK Digital Library account data?")) {
              remove.mutate();
            }
          }}
        >
          Delete permanently
        </Button>
      </Card>
    </div>
  );
}
