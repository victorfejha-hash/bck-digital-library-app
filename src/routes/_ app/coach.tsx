import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { SUBJECTS, AI_WATERMARK } from "@/lib/constants";
import { askStudyCoach } from "@/lib/server/ai";
import { offlineTutorAnswer } from "@/data/ai-fallback";
import { RobotCoach } from "@/components/robot-coach";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/coach")({ component: CoachPage });

type Msg = { role: "user" | "coach"; text: string; source?: "live" | "offline" };

function CoachPage() {
  const [subject, setSubject] = useState("general");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "coach",
      text: "Ask me a secondary-school question — for example, explain photosynthesis simply, or walk through Pythagoras.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const state = busy ? "thinking" : messages.at(-1)?.role === "coach" && messages.length > 1 ? "talking" : "idle";

  async function send() {
    const question = input.trim();
    if (!question || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: question }]);
    setBusy(true);
    try {
      const res = await askStudyCoach({ data: { question, subject } });
      const text = res.ok ? res.answer : res.fallback || offlineTutorAnswer(question);
      setMessages((m) => [
        ...m,
        { role: "coach", text, source: res.ok ? res.source : "offline" },
      ]);
      if (res.ok && res.source === "offline") {
        toast("Live coach unavailable — showing a curriculum fallback.");
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "coach", text: offlineTutorAnswer(question), source: "offline" },
      ]);
    } finally {
      setBusy(false);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="view-enter grid gap-6 lg:grid-cols-[220px_1fr]">
      <div className="flex flex-col items-center rounded-[28px] border border-border bg-surface p-5">
        <RobotCoach state={state} />
        <p className="mt-3 text-center text-sm font-medium">BCK Study Coach</p>
        <p className="mt-1 text-center text-[11px] text-subtle">{AI_WATERMARK}</p>
        <p className="mt-3 text-center text-xs text-muted">
          {busy ? "Thinking…" : "Ready when you are"}
        </p>
      </div>

      <div className="flex min-h-[70vh] flex-col">
        <h1 className="font-display text-3xl">AI Study Coach</h1>
        <p className="mt-1 text-sm text-muted">
          Live answers for BCK learners. You must be signed in to use the coach.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip active={subject === "general"} onClick={() => setSubject("general")}>
            General
          </Chip>
          {SUBJECTS.map((s) => (
            <Chip key={s} active={subject === s} onClick={() => setSubject(s)}>
              {s}
            </Chip>
          ))}
        </div>

        <div className="mt-4 flex-1 space-y-3 overflow-y-auto rounded-[24px] border border-border bg-bg-elevated p-4">
          {messages.map((m, i) => (
            <div
              key={`${i}-${m.text.slice(0, 12)}`}
              className={cn(
                "max-w-[42rem] rounded-[18px] px-4 py-3 text-sm leading-relaxed",
                m.role === "user"
                  ? "ml-auto bg-primary text-primary-fg"
                  : "bg-surface text-fg",
              )}
            >
              {m.text}
              {m.source === "offline" && (
                <p className="mt-2 text-[11px] text-subtle">Offline curriculum fallback</p>
              )}
            </div>
          ))}
          {busy && (
            <div className="rounded-[18px] bg-surface px-4 py-3 text-sm text-muted">
              Thinking…
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          className="mt-3 flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <Textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Explain photosynthesis simply…"
            className="min-h-[52px]"
          />
          <Button type="submit" size="icon" disabled={busy || !input.trim()} aria-label="Send">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-full border px-3 text-xs",
        active ? "border-primary bg-primary/10 text-fg" : "border-border text-muted",
      )}
    >
      {children}
    </button>
  );
}
