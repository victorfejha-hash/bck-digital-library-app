import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { COURSES } from "@/data/courses";
import {
  COURSE_FEE_UGX,
  PAYMENT_LABEL,
  PAYMENT_NUMBER,
  SUPPORT_EMAIL,
} from "@/lib/constants";
import { myBookings, reserveCourse } from "@/lib/server/community";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const Route = createFileRoute("/_app/courses")({ component: CoursesPage });

function CoursesPage() {
  const qc = useQueryClient();
  const bookings = useQuery({ queryKey: ["bookings"], queryFn: () => myBookings() });
  const [selected, setSelected] = useState<(typeof COURSES)[number] | null>(null);
  const reserve = useMutation({
    mutationFn: (course: (typeof COURSES)[number]) =>
      reserveCourse({ data: { courseId: course.id, courseName: course.name } }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["bookings"] });
      toast("Place reserved. Follow the mobile-money steps below.");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="view-enter space-y-5">
      <div>
        <h1 className="font-display text-3xl">Online Courses & Holiday Lessons</h1>
        <p className="mt-1 text-sm text-muted">
          Booking fee {COURSE_FEE_UGX.toLocaleString()} UGX. Payment is manual — there is no
          automatic card charge.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c) => {
          const reserved = bookings.data?.some((b) => b.courseId === c.id);
          return (
            <Card key={c.id} className="flex flex-col">
              <p className="text-xs text-muted">{c.subject}</p>
              <h2 className="mt-1 font-medium">{c.name}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">{c.desc}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-subtle">{c.weeks} weeks</span>
                <span className="text-accent">{COURSE_FEE_UGX.toLocaleString()} UGX</span>
              </div>
              {reserved && <Badge className="mt-3 w-fit" tone="success">Reserved</Badge>}
              <Button className="mt-4 w-full" onClick={() => setSelected(c)}>
                Reserve place
              </Button>
            </Card>
          );
        })}
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(o) => !o && setSelected(null)}>
        {selected && (
          <DialogContent title={`Reserve ${selected.name}`}>
            <ol className="space-y-3 text-sm text-muted">
              <li>1. Send {COURSE_FEE_UGX.toLocaleString()} UGX by MTN or Airtel Money to {PAYMENT_NUMBER} ({PAYMENT_LABEL}).</li>
              <li>2. Email {SUPPORT_EMAIL} with your name and the course title.</li>
              <li>3. Keep your confirmation message. A place is held after you reserve — it is not an automatic payment.</li>
            </ol>
            <div className="mt-5 flex flex-col gap-2">
              <Button
                disabled={reserve.isPending}
                onClick={() => reserve.mutate(selected)}
              >
                {reserve.isPending ? "Saving…" : "I will pay by mobile money"}
              </Button>
              <Button asChild variant="secondary">
                <a href={selected.external} target="_blank" rel="noreferrer">
                  Preview free lessons
                </a>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
