import { Link, createFileRoute } from "@tanstack/react-router";
import { EXAMS } from "@/data/exams";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app/exams")({ component: ExamsPage });

function ExamsPage() {
  return (
    <div className="view-enter space-y-5">
      <div>
        <h1 className="font-display text-3xl">Online Practice Exams</h1>
        <p className="mt-1 text-sm text-muted">
          Scenario questions. 10 points per correct answer, plus a bonus for high scores.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {EXAMS.map((exam) => (
          <Card key={exam.id}>
            <h2 className="font-medium">{exam.title}</h2>
            <p className="mt-1 text-sm text-muted">
              {exam.subject} · {exam.questions.length} questions
            </p>
            <p className="mt-2 text-xs text-subtle">Up to {exam.questions.length * 10 + 20} points</p>
            <Button asChild className="mt-4 w-full">
              <Link to="/exams/$examId" params={{ examId: exam.id }}>
                Start exam
              </Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
