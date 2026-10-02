import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { EXAMS } from "@/data/exams";
import { submitExam } from "@/lib/server/exams";
import { useAppState } from "@/lib/app-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/exams/$examId")({ component: ExamPlayer });

function ExamPlayer() {
  const { examId } = Route.useParams();
  const exam = EXAMS.find((e) => e.id === examId);
  const { refresh } = useAppState();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(() =>
    exam ? Array(exam.questions.length).fill(null) : [],
  );
  const submit = useMutation({
    mutationFn: () => submitExam({ data: { examId, answers } }),
    onSuccess: () => {
      void refresh();
    },
  });

  const q = exam?.questions[index];
  const progress = useMemo(() => {
    if (!exam) return 0;
    return ((index + 1) / exam.questions.length) * 100;
  }, [exam, index]);

  if (!exam || !q) {
    return (
      <Card className="p-8 text-center">
        <p>Exam not found.</p>
        <Button asChild className="mt-4">
          <Link to="/exams">Back to exams</Link>
        </Button>
      </Card>
    );
  }

  if (submit.data) {
    const r = submit.data;
    return (
      <div className="view-enter mx-auto max-w-lg">
        <Card className="p-8 text-center">
          <p className="text-xs tracking-[0.18em] text-subtle uppercase">Result</p>
          <p className="mt-2 font-display text-5xl tabular-nums">
            {r.correct}/{r.total}
          </p>
          <p className="mt-2 text-muted">
            {r.percent}% · +{r.pointsAwarded} points
          </p>
          <p className="mt-1 text-sm text-subtle">Total points: {r.totalPoints}</p>
          <div className="mt-6 flex flex-col gap-2">
            <Button asChild>
              <Link to="/exams">Back to exams</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/rankings">View rankings</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="view-enter mx-auto max-w-2xl space-y-4">
      <div>
        <p className="text-xs text-muted">{exam.subject}</p>
        <h1 className="font-display text-2xl">{exam.title}</h1>
        <p className="mt-1 text-sm text-muted">
          Question {index + 1} of {exam.questions.length}
        </p>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full bg-primary transition-[width] duration-200" style={{ width: `${progress}%` }} />
      </div>
      <Card className="p-5">
        <p className="text-base leading-relaxed">{q.q}</p>
        <div className="mt-4 grid gap-2">
          {q.options.map((opt, i) => (
            <button
              key={opt}
              type="button"
              onClick={() =>
                setAnswers((prev) => {
                  const next = [...prev];
                  next[index] = i;
                  return next;
                })
              }
              className={cn(
                "min-h-12 rounded-[var(--radius-md)] border px-4 py-3 text-left text-sm transition-colors",
                answers[index] === i
                  ? "border-primary bg-primary/10 text-fg"
                  : "border-border bg-bg-elevated text-muted hover:text-fg",
              )}
            >
              <span className="mr-2 font-medium text-accent">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>
      </Card>
      <div className="flex gap-2">
        <Button variant="secondary" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          Previous
        </Button>
        {index < exam.questions.length - 1 ? (
          <Button className="flex-1" onClick={() => setIndex((i) => i + 1)}>
            Next
          </Button>
        ) : (
          <Button
            className="flex-1"
            disabled={submit.isPending}
            onClick={() => submit.mutate()}
          >
            {submit.isPending ? "Scoring…" : "Submit"}
          </Button>
        )}
      </div>
      {submit.error && <p className="text-sm text-danger">{submit.error.message}</p>}
    </div>
  );
}
