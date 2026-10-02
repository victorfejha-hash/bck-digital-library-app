import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-DJKpphXP.mjs";
import { t as offlineTutorAnswer } from "./ai-fallback-BzzGZSyw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-P93J0o5_.js
var SYSTEM = `You are the BCK Study Coach for Bishop Cipriano Kihangire Secondary School (Bbiina/Luzira, Kampala, Uganda).
Help secondary students (S.1–S.6, O-Level and A-Level) with clear, accurate explanations.
Use short paragraphs, worked steps for maths, and UNEB-style exam tips when relevant.
If a question is not academic, steer back to study. Do not invent school policy.
Keep answers under 350 words unless a derivation needs more.`;
var askStudyCoach_createServerFn_handler = createServerRpc({
	id: "2b3091d53cb2ed7c9ec431b836cac995602b7c7c1cc6e615d1d0ed40ee2500da",
	name: "askStudyCoach",
	filename: "src/lib/server/ai.ts"
}, (opts) => askStudyCoach.__executeServer(opts));
var askStudyCoach = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	question: input.question.trim().slice(0, 2e3),
	subject: (input.subject ?? "general").trim().slice(0, 80)
})).handler(askStudyCoach_createServerFn_handler, async ({ data }) => {
	if (!data.question) return {
		ok: false,
		error: "Ask a question first.",
		fallback: ""
	};
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: true,
		answer: offlineTutorAnswer(data.question),
		source: "offline"
	};
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .4,
				max_tokens: 700,
				messages: [{
					role: "system",
					content: SYSTEM
				}, {
					role: "user",
					content: `Subject: ${data.subject}\nQuestion: ${data.question}`
				}]
			})
		});
		if (!res.ok) return {
			ok: true,
			answer: offlineTutorAnswer(data.question),
			source: "offline"
		};
		const text = (await res.json()).choices?.[0]?.message?.content?.trim();
		return {
			ok: true,
			answer: text || offlineTutorAnswer(data.question),
			source: text ? "live" : "offline"
		};
	} catch {
		return {
			ok: true,
			answer: offlineTutorAnswer(data.question),
			source: "offline"
		};
	}
});
//#endregion
export { askStudyCoach_createServerFn_handler };
