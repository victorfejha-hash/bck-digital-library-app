import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { EXAMS, examPoints } from "@/data/exams";

export const submitExam = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { examId: string; answers: Array<number | null> }) => ({
    examId: input.examId,
    answers: input.answers,
  }))
  .handler(async ({ context, data }) => {
    const exam = EXAMS.find((e) => e.id === data.examId);
    if (!exam) throw new Error("Exam not found");
    let correct = 0;
    exam.questions.forEach((q, i) => {
      if (data.answers[i] === q.answer) correct += 1;
    });
    const total = exam.questions.length;
    const points = examPoints(correct, total);
    const sql = await getSql();
    await sql`
      insert into exam_attempts (user_id, exam_id, score, max_score, points_awarded)
      values (${context.userId}, ${exam.id}, ${correct}, ${total}, ${points})
    `;
    await sql`
      update profiles
      set points = points + ${points}, updated_at = now()
      where user_id = ${context.userId}
    `;
    const me = await sql<{ points: number }>`
      select points from profiles where user_id = ${context.userId} limit 1
    `;
    return {
      examId: exam.id,
      correct,
      total,
      percent: Math.round((correct / total) * 100),
      pointsAwarded: points,
      totalPoints: Number(me[0]?.points ?? points),
    };
  });

export const myExamStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ exams: number }>`
      select count(*)::int as exams from exam_attempts where user_id = ${context.userId}
    `;
    return { exams: Number(rows[0]?.exams ?? 0) };
  });
