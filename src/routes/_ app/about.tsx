import { createFileRoute } from "@tanstack/react-router";
import {
  APP_NAME,
  DEVELOPERS,
  SCHOOL_LOCATION,
  SCHOOL_NAME,
  SUPPORT_EMAIL,
  TAGLINE,
} from "@/lib/constants";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app/about")({ component: AboutPage });

function AboutPage() {
  return (
    <div className="view-enter mx-auto max-w-2xl space-y-5">
      <div>
        <p className="text-xs tracking-[0.22em] text-subtle uppercase">{TAGLINE}</p>
        <h1 className="mt-2 font-display text-3xl">{APP_NAME}</h1>
      </div>
      <Card className="space-y-3 p-6">
        <p className="text-sm text-muted">
          {SCHOOL_NAME} is in {SCHOOL_LOCATION}. This platform gives learners authorised
          textbooks and notes, practice exams, an AI study coach, holiday courses, and
          school notices — in one place that works on a phone.
        </p>
        <p className="text-sm text-muted">Developed by {DEVELOPERS}.</p>
        <p className="text-sm text-muted">Support: {SUPPORT_EMAIL}</p>
      </Card>
    </div>
  );
}
