import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { listRankings } from "@/lib/server/community";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_app/rankings")({ component: RankingsPage });

function RankingsPage() {
  const ranks = useQuery({ queryKey: ["rankings"], queryFn: () => listRankings() });

  return (
    <div className="view-enter space-y-5">
      <div>
        <h1 className="font-display text-3xl">Learner Rankings</h1>
        <p className="mt-1 text-sm text-muted">
          Points come from practice exams. Your row is highlighted.
        </p>
      </div>
      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-[3rem_1fr_5rem_4.5rem] border-b border-border px-4 py-3 text-xs tracking-wide text-subtle uppercase">
          <span>#</span>
          <span>Learner</span>
          <span className="text-right">Points</span>
          <span className="text-right">Exams</span>
        </div>
        {ranks.isLoading && (
          <div className="space-y-2 p-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        )}
        {ranks.data?.map((row, i) => (
          <div
            key={row.id}
            className={cn(
              "grid grid-cols-[3rem_1fr_5rem_4.5rem] items-center px-4 py-3 text-sm",
              row.isYou && "bg-primary/10",
            )}
          >
            <span className="tabular-nums text-muted">{i + 1}</span>
            <div className="min-w-0">
              <p className="truncate font-medium">
                {row.name}
                {row.isYou ? " (you)" : ""}
              </p>
              <p className="truncate text-xs text-subtle">{row.school}</p>
            </div>
            <span className="text-right tabular-nums">{row.points}</span>
            <span className="text-right tabular-nums text-muted">{row.exams}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
