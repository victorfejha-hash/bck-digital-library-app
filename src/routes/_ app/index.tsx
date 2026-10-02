import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Bot, GraduationCap, Trophy } from "lucide-react";
import { RESOURCES } from "@/data/resources";
import { COURSES } from "@/data/courses";
import { SCHOOL_LOCATION, SCHOOL_NAME, TAGLINE } from "@/lib/constants";
import { listRankings, listNotifications } from "@/lib/server/community";
import { useAppState } from "@/lib/app-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app/")({ component: HomePage });

function HomePage() {
  const { profile } = useAppState();
  const ranks = useQuery({ queryKey: ["rankings"], queryFn: () => listRankings() });
  const notes = useQuery({ queryKey: ["notifications"], queryFn: () => listNotifications() });
  const myRank = ranks.data?.findIndex((r) => r.isYou) ?? -1;
  const featured = RESOURCES.slice(0, 4);
  const subjects = [...new Set(RESOURCES.map((r) => r.subject))].slice(0, 8);

  return (
    <div className="view-enter space-y-6">
      <section className="hero-depth overflow-hidden rounded-[28px] border border-border p-6 sm:p-8">
        <p className="text-xs tracking-[0.22em] text-subtle uppercase">{TAGLINE}</p>
        <h1 className="mt-2 max-w-xl font-display text-3xl">
          {profile?.name ? `Welcome, ${profile.name.split(" ")[0]}` : "Welcome, learner"}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          {SCHOOL_NAME} · {SCHOOL_LOCATION}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge>{profile?.points ?? 0} points</Badge>
          <Badge tone="muted">{myRank >= 0 ? `Rank #${myRank + 1}` : "Sit an exam to rank"}</Badge>
          {profile?.isAdmin && <Badge tone="success">Admin</Badge>}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/library">Explore library</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/coach">Ask the coach</Link>
          </Button>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Quick to="/library" icon={BookOpen} label="Digital library" hint={`${RESOURCES.length} authorised PDFs`} />
        <Quick to="/exams" icon={GraduationCap} label="Practice exams" hint="Score points on completion" />
        <Quick to="/coach" icon={Bot} label="AI Study Coach" hint="Live answers when signed in" />
        <Quick to="/rankings" icon={Trophy} label="Leaderboard" hint="See where you stand" />
      </div>

      <section>
        <Header title="Featured resources" to="/library" />
        <div className="grid gap-3 sm:grid-cols-2">
          {featured.map((r) => (
            <Card key={r.id} className="p-4">
              <p className="text-xs text-muted">
                {r.subject} · {r.classLevel}
              </p>
              <h3 className="mt-1 font-medium">{r.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{r.description}</p>
              <Button asChild variant="secondary" size="sm" className="mt-3">
                <Link to="/library">Open in library</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Header title="Browse by subject" to="/library" />
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => (
            <Link
              key={s}
              to="/library"
              search={{ subject: s }}
              className="rounded-full border border-border bg-surface px-3 py-2 text-sm text-muted hover:text-fg"
            >
              {s}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div>
          <Header title="Holiday courses" to="/courses" />
          <Card>
            <p className="font-medium">{COURSES[0]?.name}</p>
            <p className="mt-1 text-sm text-muted">{COURSES[0]?.desc}</p>
            <p className="mt-3 text-sm text-accent">50,000 UGX · mobile money</p>
          </Card>
        </div>
        <div>
          <Header title="Latest notice" to="/notifications" />
          <Card>
            <p className="font-medium">{notes.data?.[0]?.title ?? "No notices yet"}</p>
            <p className="mt-1 line-clamp-3 text-sm text-muted">
              {notes.data?.[0]?.body ?? "Admin broadcasts will appear here."}
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Header({ title, to }: { title: string; to: string }) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <h2 className="font-display text-xl">{title}</h2>
      <Link to={to} className="text-sm text-accent">
        View all
      </Link>
    </div>
  );
}

function Quick({
  to,
  icon: Icon,
  label,
  hint,
}: {
  to: string;
  icon: typeof BookOpen;
  label: string;
  hint: string;
}) {
  return (
    <Link to={to} className="block">
      <Card className="h-full">
        <Icon className="size-5 text-accent" />
        <p className="mt-3 font-medium">{label}</p>
        <p className="mt-1 text-sm text-muted">{hint}</p>
      </Card>
    </Link>
  );
}
