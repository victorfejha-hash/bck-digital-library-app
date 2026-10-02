import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-DJKpphXP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { n as useAppState } from "./app-state-fD1VhoQc.mjs";
import { t as cn } from "./utils-C3vUXC4L.mjs";
import { t as Button } from "./button-CIZ_yk94.mjs";
import { t as Card } from "./card-CV_4R-OM.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as EXAMS } from "./exams-X8Jn3bNl.mjs";
import { n as Route$1 } from "./router-ChEYLXLN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exams._examId-B70bv5EL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var submitExam = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	examId: input.examId,
	answers: input.answers
})).handler(createSsrRpc("33385ea5c24bc5fbfcfdc9d8a9165f19a194faec816f560d8c6261cdee5cf164"));
createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("84a64df213eaa6e918b6f4079416a5403d4d95fde7acda3b2c053804142314aa"));
function ExamPlayer() {
	const { examId } = Route$1.useParams();
	const exam = EXAMS.find((e) => e.id === examId);
	const { refresh } = useAppState();
	const [index, setIndex] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)(() => exam ? Array(exam.questions.length).fill(null) : []);
	const submit = useMutation({
		mutationFn: () => submitExam({ data: {
			examId,
			answers
		} }),
		onSuccess: () => {
			refresh();
		}
	});
	const q = exam?.questions[index];
	const progress = (0, import_react.useMemo)(() => {
		if (!exam) return 0;
		return (index + 1) / exam.questions.length * 100;
	}, [exam, index]);
	if (!exam || !q) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Exam not found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/exams",
				children: "Back to exams"
			})
		})]
	});
	if (submit.data) {
		const r = submit.data;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "view-enter mx-auto max-w-lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] text-subtle uppercase",
						children: "Result"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-display text-5xl tabular-nums",
						children: [
							r.correct,
							"/",
							r.total
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted",
						children: [
							r.percent,
							"% · +",
							r.pointsAwarded,
							" points"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-subtle",
						children: ["Total points: ", r.totalPoints]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/exams",
								children: "Back to exams"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/rankings",
								children: "View rankings"
							})
						})]
					})
				]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter mx-auto max-w-2xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: exam.subject
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: exam.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Question ",
						index + 1,
						" of ",
						exam.questions.length
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-primary transition-[width] duration-200",
					style: { width: `${progress}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base leading-relaxed",
					children: q.q
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-2",
					children: q.options.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setAnswers((prev) => {
							const next = [...prev];
							next[index] = i;
							return next;
						}),
						className: cn("min-h-12 rounded-[var(--radius-md)] border px-4 py-3 text-left text-sm transition-colors", answers[index] === i ? "border-primary bg-primary/10 text-fg" : "border-border bg-bg-elevated text-muted hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mr-2 font-medium text-accent",
							children: [String.fromCharCode(65 + i), "."]
						}), opt]
					}, opt))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					disabled: index === 0,
					onClick: () => setIndex((i) => i - 1),
					children: "Previous"
				}), index < exam.questions.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					onClick: () => setIndex((i) => i + 1),
					children: "Next"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					disabled: submit.isPending,
					onClick: () => submit.mutate(),
					children: submit.isPending ? "Scoring…" : "Submit"
				})]
			}),
			submit.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: submit.error.message
			})
		]
	});
}
//#endregion
export { ExamPlayer as component };
