import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { sendFeedback } from "@/lib/server/community";
import { useAppState } from "@/lib/app-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_app/contact")({ component: ContactPage });

function ContactPage() {
  const { profile } = useAppState();
  const [form, setForm] = useState({
    name: profile?.name ?? "",
    email: profile?.email ?? "",
    message: "",
  });
  const send = useMutation({
    mutationFn: () => sendFeedback({ data: form }),
    onSuccess: () => {
      setForm((f) => ({ ...f, message: "" }));
      toast("Feedback sent to the admin dashboard");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="view-enter mx-auto max-w-xl space-y-5">
      <div>
        <h1 className="font-display text-3xl">Contact & Support</h1>
        <p className="mt-1 text-sm text-muted">
          Email the developers at {SUPPORT_EMAIL} or send feedback here.
        </p>
      </div>
      <Card className="space-y-3 p-5">
        <div className="space-y-1.5">
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Message</Label>
          <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </div>
        <Button disabled={send.isPending} onClick={() => send.mutate()}>
          Send feedback
        </Button>
      </Card>
      <Button asChild variant="secondary">
        <a href={`mailto:${SUPPORT_EMAIL}`}>Email {SUPPORT_EMAIL}</a>
      </Button>
    </div>
  );
}
