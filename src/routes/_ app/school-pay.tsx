import { createFileRoute } from "@tanstack/react-router";
import { SCHOOL_NAME, SCHOOL_PAY_URL, PAYMENT_NUMBER } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app/school-pay")({ component: SchoolPayPage });

function SchoolPayPage() {
  return (
    <div className="view-enter space-y-5">
      <div>
        <h1 className="font-display text-3xl">School Pay</h1>
        <p className="mt-1 text-sm text-muted">
          School fees are paid through School Pay Uganda — this is not a fake checkout.
        </p>
      </div>
      <Card className="space-y-4 p-6">
        <p className="text-sm text-muted">
          Use the official School Pay portal for {SCHOOL_NAME} fees. Keep your student
          number ready. For holiday course bookings on this app, send mobile money to {PAYMENT_NUMBER}.
        </p>
        <Button asChild>
          <a href={SCHOOL_PAY_URL} target="_blank" rel="noreferrer">
            Open School Pay Uganda
          </a>
        </Button>
      </Card>
      <Card className="space-y-2 p-6">
        <h2 className="font-medium">Mobile money guidance</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Confirm the school or merchant name before you send.</li>
          <li>Save the confirmation SMS or email.</li>
          <li>Ask the bursar if a code does not match your student record.</li>
        </ul>
      </Card>
    </div>
  );
}
