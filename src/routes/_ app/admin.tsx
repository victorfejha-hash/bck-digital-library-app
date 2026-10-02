import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppState } from "@/lib/app-state";
import {
  broadcastNotification,
  listAdminVideos,
  listFeedback,
  postVideo,
} from "@/lib/server/community";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_app/admin")({ component: AdminPage });

function AdminPage() {
  const { profile } = useAppState();
  const qc = useQueryClient();
  const videos = useQuery({
    queryKey: ["admin-videos"],
    queryFn: () => listAdminVideos(),
    enabled: Boolean(profile?.isAdmin),
  });
  const feedback = useQuery({
    queryKey: ["feedback"],
    queryFn: () => listFeedback(),
    enabled: Boolean(profile?.isAdmin),
  });
  const [notice, setNotice] = useState({ title: "", body: "" });
  const [video, setVideo] = useState({ title: "", url: "", topic: "General", channel: "BCK Library" });

  const sendNotice = useMutation({
    mutationFn: () => broadcastNotification({ data: notice }),
    onSuccess: () => {
      setNotice({ title: "", body: "" });
      void qc.invalidateQueries({ queryKey: ["notifications"] });
      toast("Notification sent");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const addVideo = useMutation({
    mutationFn: () => postVideo({ data: video }),
    onSuccess: () => {
      setVideo({ title: "", url: "", topic: "General", channel: "BCK Library" });
      void qc.invalidateQueries({ queryKey: ["admin-videos"] });
      toast("Video published");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!profile) {
    return (
      <div className="space-y-3">
        <div className="h-10 w-48 animate-pulse rounded-[var(--radius-md)] bg-surface-2" />
        <div className="h-40 animate-pulse rounded-[var(--radius-xl)] bg-surface-2" />
      </div>
    );
  }
  if (!profile.isAdmin) return <Navigate to="/" />;

  return (
    <div className="view-enter space-y-6">
      <div>
        <h1 className="font-display text-3xl">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Broadcast notices, post study videos, and review feedback.</p>
      </div>

      <Card className="space-y-3 p-5">
        <h2 className="font-medium">Broadcast notification</h2>
        <div className="space-y-1.5">
          <Label>Title</Label>
          <Input value={notice.title} onChange={(e) => setNotice({ ...notice, title: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Message</Label>
          <Textarea value={notice.body} onChange={(e) => setNotice({ ...notice, body: e.target.value })} />
        </div>
        <Button disabled={sendNotice.isPending} onClick={() => sendNotice.mutate()}>
          Send to learners
        </Button>
      </Card>

      <Card className="space-y-3 p-5">
        <h2 className="font-medium">Post study video</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Title</Label>
            <Input value={video.title} onChange={(e) => setVideo({ ...video, title: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Topic</Label>
            <Input value={video.topic} onChange={(e) => setVideo({ ...video, topic: e.target.value })} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>YouTube URL or ID</Label>
          <Input value={video.url} onChange={(e) => setVideo({ ...video, url: e.target.value })} />
        </div>
        <Button disabled={addVideo.isPending} onClick={() => addVideo.mutate()}>
          Publish video
        </Button>
        <div className="space-y-2 pt-2">
          {(videos.data ?? []).map((v) => (
            <p key={v.id} className="text-sm text-muted">
              {v.title} · {v.topic}
            </p>
          ))}
          {!videos.data?.length && <p className="text-sm text-subtle">No admin videos yet.</p>}
        </div>
      </Card>

      <Card className="space-y-3 p-5">
        <h2 className="font-medium">Learner feedback</h2>
        {(feedback.data ?? []).map((f) => (
          <div key={f.id} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
            <p className="text-sm font-medium">{f.name}</p>
            <p className="text-xs text-subtle">{f.email}</p>
            <p className="mt-1 text-sm text-muted">{f.message}</p>
          </div>
        ))}
        {!feedback.data?.length && <p className="text-sm text-subtle">No feedback yet.</p>}
      </Card>
    </div>
  );
}
