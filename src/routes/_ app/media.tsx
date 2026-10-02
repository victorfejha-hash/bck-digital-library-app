import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FEATURED_VIDEOS } from "@/data/media";
import { listAdminVideos } from "@/lib/server/community";
import { youtubeThumb, youtubeWatchUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_app/media")({ component: MediaPage });

function MediaPage() {
  const [q, setQ] = useState("");
  const admin = useQuery({ queryKey: ["admin-videos"], queryFn: () => listAdminVideos() });
  const list = useMemo(() => {
    const posted = (admin.data ?? []).map((v) => ({
      title: v.title,
      channel: v.channel,
      yt: v.youtubeId,
      topic: v.topic,
      tags: `${v.topic} admin`,
    }));
    const all = [...posted, ...FEATURED_VIDEOS];
    const query = q.trim().toLowerCase();
    if (!query) return all;
    return all.filter((v) =>
      [v.title, v.channel, v.topic, v.tags].join(" ").toLowerCase().includes(query),
    );
  }, [admin.data, q]);

  return (
    <div className="view-enter space-y-5">
      <div>
        <h1 className="font-display text-3xl">Study Media</h1>
        <p className="mt-1 text-sm text-muted">Featured educational videos. Search opens more on YouTube.</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          placeholder="Search algebra, photosynthesis, map skills…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button asChild variant="secondary">
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${q || "secondary school revision"} education tutorial`)}`}
            target="_blank"
            rel="noreferrer"
          >
            Search on YouTube
          </a>
        </Button>
      </div>
      <p className="text-sm text-muted">{list.length} videos</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v) => (
          <a key={`${v.yt}-${v.title}`} href={youtubeWatchUrl(v.yt)} target="_blank" rel="noreferrer">
            <Card className="overflow-hidden p-0">
              <img
                src={youtubeThumb(v.yt)}
                alt=""
                className="aspect-video w-full object-cover"
              />
              <div className="p-4">
                <h2 className="font-medium">{v.title}</h2>
                <p className="mt-1 text-sm text-muted">
                  {v.topic} · {v.channel}
                </p>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
