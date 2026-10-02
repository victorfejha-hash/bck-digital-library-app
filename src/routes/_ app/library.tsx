import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkCheck, ExternalLink, Search } from "lucide-react";
import { toast } from "sonner";
import {
  RESOURCES,
  RESOURCE_CATEGORIES,
  RESOURCE_LEVELS,
  RESOURCE_SUBJECTS,
  RESOURCE_TYPES,
  type Resource,
} from "@/data/resources";
import { listSavedIds, toggleSaved } from "@/lib/server/library";
import { driveOpenUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Search = { subject?: string; q?: string };

export const Route = createFileRoute("/_app/library")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    subject: typeof s.subject === "string" ? s.subject : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const search = Route.useSearch();
  const qc = useQueryClient();
  const saved = useQuery({ queryKey: ["saved"], queryFn: () => listSavedIds() });
  const toggle = useMutation({
    mutationFn: (id: string) => toggleSaved({ data: id }),
    onSuccess: (_, id) => {
      void qc.invalidateQueries({ queryKey: ["saved"] });
      toast(saved.data?.includes(id) ? "Removed from My Library" : "Saved to My Library");
    },
  });
  const [q, setQ] = useState(search.q ?? "");
  const [subject, setSubject] = useState(search.subject ?? "");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      if (subject && r.subject !== subject) return false;
      if (level && r.classLevel !== level) return false;
      if (category && r.category !== category) return false;
      if (type && r.bookType !== type) return false;
      if (!query) return true;
      return [r.title, r.subject, r.description, r.author, r.publisher, r.classLevel]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [q, subject, level, category, type]);

  return (
    <div className="view-enter space-y-5">
      <div>
        <h1 className="font-display text-3xl">Digital Library</h1>
        <p className="mt-1 text-sm text-muted">
          Authorised Google Drive PDFs for BCK learners. Open in a new tab.
        </p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
        <Input
          className="pl-10"
          placeholder="Search title, subject, author…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Select value={subject} onChange={setSubject} options={RESOURCE_SUBJECTS} label="Subject" />
        <Select value={level} onChange={setLevel} options={RESOURCE_LEVELS} label="Class" />
        <Select value={category} onChange={setCategory} options={RESOURCE_CATEGORIES} label="Category" />
        <Select value={type} onChange={setType} options={RESOURCE_TYPES} label="Type" />
        {(subject || level || category || type || q) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQ("");
              setSubject("");
              setLevel("");
              setCategory("");
              setType("");
            }}
          >
            Clear
          </Button>
        )}
      </div>

      <p className="text-sm text-muted">{list.length} resources</p>

      {list.length === 0 ? (
        <Card className="py-12 text-center text-sm text-muted">No resources match your search.</Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((r) => (
            <ResourceCard
              key={r.id}
              resource={r}
              saved={Boolean(saved.data?.includes(r.id))}
              onToggle={() => toggle.mutate(r.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ResourceCard({
  resource,
  saved,
  onToggle,
}: {
  resource: Resource;
  saved: boolean;
  onToggle: () => void;
}) {
  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted">
            {resource.subject} · {resource.classLevel}
          </p>
          <h3 className="mt-1 font-medium">{resource.title}</h3>
        </div>
        <Badge tone={resource.status === "Verified" ? "success" : "warn"}>{resource.status}</Badge>
      </div>
      <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{resource.description}</p>
      <p className="mt-2 text-xs text-subtle">
        {resource.bookType}
        {resource.publisher ? ` · ${resource.publisher}` : ""}
      </p>
      <div className="mt-4 flex gap-2">
        <Button asChild className="flex-1">
          <a href={driveOpenUrl(resource.driveLink)} target="_blank" rel="noreferrer">
            <ExternalLink className="size-4" />
            Open PDF
          </a>
        </Button>
        <Button variant="secondary" size="icon" onClick={onToggle} aria-label="Save">
          {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        </Button>
      </div>
    </Card>
  );
}

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 rounded-[var(--radius-sm)] border border-border bg-bg-elevated px-3 text-sm text-fg"
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
