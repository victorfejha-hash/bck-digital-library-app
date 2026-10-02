import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-DJKpphXP.mjs";
import { r as getSql } from "./db-81j08WSH.mjs";
import { n as examPoints, t as EXAMS } from "./exams-X8Jn3bNl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exams-BkjcX6FC.js
var submitExam_createServerFn_handler = createServerRpc({
	id: "33385ea5c24bc5fbfcfdc9d8a9165f19a194faec816f560d8c6261cdee5cf164",
	name: "submitExam",
	filename: "src/lib/server/exams.ts"
}, (opts) => submitExam.__executeServer(opts));
var submitExam = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	examId: input.examId,
	answers: input.answers
})).handler(submitExam_createServerFn_handler, async ({ context, data }) => {
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
	const me = await sql`
      select points from profiles where user_id = ${context.userId} limit 1
    `;
	return {
		examId: exam.id,
		correct,
		total,
		percent: Math.round(correct / total * 100),
		pointsAwarded: points,
		totalPoints: Number(me[0]?.points ?? points)
	};
});
var myExamStats_createServerFn_handler = createServerRpc({
	id: "84a64df213eaa6e918b6f4079416a5403d4d95fde7acda3b2c053804142314aa",
	name: "myExamStats",
	filename: "src/lib/server/exams.ts"
}, (opts) => myExamStats.__executeServer(opts));
var myExamStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(myExamStats_createServerFn_handler, async ({ context }) => {
	const rows = await (await getSql())`
      select count(*)::int as exams from exam_attempts where user_id = ${context.userId}
    `;
	return { exams: Number(rows[0]?.exams ?? 0) };
});
//#endregion
export { myExamStats_createServerFn_handler, submitExam_createServerFn_handler };
