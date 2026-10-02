import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { RESOURCES } from "@/data/resources";
import { listSavedIds } from "@/lib/server/library";
import { driveOpenUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app/saved")({ component: SavedPage });

function SavedPage() {
  const saved = useQuery({ queryKey: ["saved"], queryFn: () => listSavedIds() });
  const items = RESOURCES.filter((r) => saved.data?.includes(r.id));

  return (
    <div className="view-enter space-y-5">
      <div>
        <h1 className="font-display text-3xl">My Library</h1>
        <p className="mt-1 text-sm text-muted">Resources you saved for later.</p>
      </div>
      {items.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-sm text-muted">No saved resources yet.</p>
          <Button asChild className="mt-4">
            <Link to="/library">Go to Library</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-3">
          {items.map((r) => (
            <Card key={r.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-muted">{r.subject}</p>
                <h3 className="font-medium">{r.title}</h3>
              </div>
              <Button asChild variant="secondary">
                <a href={driveOpenUrl(r.driveLink)} target="_blank" rel="noreferrer">
                  Open PDF
                </a>
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
