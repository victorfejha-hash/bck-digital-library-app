import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TEACHERS } from "@/lib/constants";
import { listDiscussions, postDiscussion } from "@/lib/server/community";
import { useAppState } from "@/lib/app-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_app/discussions")({ component: DiscussionsPage });

function DiscussionsPage() {
  const { profile } = useAppState();
  const qc = useQueryClient();
  const posts = useQuery({ queryKey: ["discuss"], queryFn: () => listDiscussions() });
  const [form, setForm] = useState({
    name: profile?.name ?? "",
    classLevel: "",
    contact: "",
    message: "",
  });
  const post = useMutation({
    mutationFn: () => postDiscussion({ data: form }),
    onSuccess: () => {
      setForm((f) => ({ ...f, message: "" }));
      void qc.invalidateQueries({ queryKey: ["discuss"] });
      toast("Posted to study groups");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="view-enter space-y-5">
      <div>
        <h1 className="font-display text-3xl">Learner Discussions</h1>
        <p className="mt-1 text-sm text-muted">
          Share a contact so classmates can form study groups. Teachers are listed below.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {TEACHERS.map((t) => (
          <Card key={t.name} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{t.name}</p>
              <p className="text-sm text-muted">{t.phone}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="secondary" size="sm">
                <a href={t.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </Button>
              <Button asChild size="sm">
                <a href={t.tel}>Call</a>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="space-y-3 p-5">
        <h2 className="font-medium">Share your study group contact</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Class</Label>
            <Input
              placeholder="S.3 East"
              value={form.classLevel}
              onChange={(e) => setForm({ ...form, classLevel: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>WhatsApp or phone</Label>
          <Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Note</Label>
          <Textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Looking for a maths revision group this holiday…"
          />
        </div>
        <Button disabled={post.isPending} onClick={() => post.mutate()}>
          Post
        </Button>
      </Card>

      <div className="space-y-3">
        {posts.data?.map((p) => (
          <Card key={p.id}>
            <p className="font-medium">{p.name}</p>
            <p className="text-xs text-subtle">
              {p.classLevel || "Class not set"}
              {p.contact ? ` · ${p.contact}` : ""}
            </p>
            <p className="mt-2 text-sm text-muted">{p.message}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
