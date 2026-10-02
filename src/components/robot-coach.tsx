import { cn } from "@/lib/utils";

export function RobotCoach({
  state = "idle",
}: {
  state?: "idle" | "thinking" | "talking";
}) {
  return (
    <div
      className={cn("robot", state === "thinking" && "thinking", state === "talking" && "talking")}
      aria-hidden
    >
      <div className="robot-halo" />
      <div className="robot-antenna" />
      <div className="robot-arm left" />
      <div className="robot-arm right" />
      <div className="robot-head">
        <div className="robot-visor" />
        <div className="robot-eye left" />
        <div className="robot-eye right" />
        <div className="robot-mouth" />
      </div>
      <div className="robot-body">
        <div className="robot-core" />
      </div>
    </div>
  );
}
