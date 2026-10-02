import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listNotifications, markNotificationRead } from "@/lib/server/community";
import { useAppState } from "@/lib/app-state";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const qc = useQueryClient();
  const { refresh } = useAppState();
  const notes = useQuery({ queryKey: ["notifications"], queryFn: () => listNotifications() });
  const mark = useMutation({
    mutationFn: (id: number) => markNotificationRead({ data: id }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["notifications"] });
      void refresh();
    },
  });

  return (
    <div className="view-enter space-y-5">
      <div>
        <h1 className="font-display text-3xl">Notification Centre</h1>
        <p className="mt-1 text-sm text-muted">Broadcasts from BCK administrators.</p>
      </div>
      <div className="space-y-3">
        {notes.data?.length ? (
          notes.data.map((n) => (
            <button
              key={n.id}
              type="button"
              className="block w-full text-left"
              onClick={() => !n.read && mark.mutate(n.id)}
            >
              <Card className={cn("p-4", !n.read && "border-primary/40")}>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-medium">{n.title}</h2>
                  {!n.read && <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />}
                </div>
                <p className="mt-1 text-sm text-muted">{n.body}</p>
              </Card>
            </button>
          ))
        ) : (
          <Card className="py-10 text-center text-sm text-muted">No notifications yet.</Card>
        )}
      </div>
    </div>
  );
}
