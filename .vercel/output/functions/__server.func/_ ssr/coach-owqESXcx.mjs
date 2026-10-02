import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { n as AI_WATERMARK, u as SUBJECTS } from "./constants-cN194syr.mjs";
import { t as authMiddleware } from "./middleware-DJKpphXP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as cn } from "./utils-C3vUXC4L.mjs";
import { t as Button } from "./button-CIZ_yk94.mjs";
import { s as Send } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-uv-x89JJ.mjs";
import { t as offlineTutorAnswer } from "./ai-fallback-BzzGZSyw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-owqESXcx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var askStudyCoach = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	question: input.question.trim().slice(0, 2e3),
	subject: (input.subject ?? "general").trim().slice(0, 80)
})).handler(createSsrRpc("2b3091d53cb2ed7c9ec431b836cac995602b7c7c1cc6e615d1d0ed40ee2500da"));
function RobotCoach({ state = "idle" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("robot", state === "thinking" && "thinking", state === "talking" && "talking"),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "robot-halo" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "robot-antenna" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "robot-arm left" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "robot-arm right" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "robot-head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "robot-visor" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "robot-eye left" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "robot-eye right" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "robot-mouth" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "robot-body",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "robot-core" })
			})
		]
	});
}
function CoachPage() {
	const [subject, setSubject] = (0, import_react.useState)("general");
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "coach",
		text: "Ask me a secondary-school question — for example, explain photosynthesis simply, or walk through Pythagoras."
	}]);
	const endRef = (0, import_react.useRef)(null);
	const state = busy ? "thinking" : messages.at(-1)?.role === "coach" && messages.length > 1 ? "talking" : "idle";
	async function send() {
		const question = input.trim();
		if (!question || busy) return;
		setInput("");
		setMessages((m) => [...m, {
			role: "user",
			text: question
		}]);
		setBusy(true);
		try {
			const res = await askStudyCoach({ data: {
				question,
				subject
			} });
			const text = res.ok ? res.answer : res.fallback || offlineTutorAnswer(question);
			setMessages((m) => [...m, {
				role: "coach",
				text,
				source: res.ok ? res.source : "offline"
			}]);
			if (res.ok && res.source === "offline") toast("Live coach unavailable — showing a curriculum fallback.");
		} catch {
			setMessages((m) => [...m, {
				role: "coach",
				text: offlineTutorAnswer(question),
				source: "offline"
			}]);
		} finally {
			setBusy(false);
			endRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter grid gap-6 lg:grid-cols-[220px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center rounded-[28px] border border-border bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RobotCoach, { state }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-sm font-medium",
					children: "BCK Study Coach"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-[11px] text-subtle",
					children: AI_WATERMARK
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-xs text-muted",
					children: busy ? "Thinking…" : "Ready when you are"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[70vh] flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: "AI Study Coach"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Live answers for BCK learners. You must be signed in to use the coach."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: subject === "general",
						onClick: () => setSubject("general"),
						children: "General"
					}), SUBJECTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: subject === s,
						onClick: () => setSubject(s),
						children: s
					}, s))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex-1 space-y-3 overflow-y-auto rounded-[24px] border border-border bg-bg-elevated p-4",
					children: [
						messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("max-w-[42rem] rounded-[18px] px-4 py-3 text-sm leading-relaxed", m.role === "user" ? "ml-auto bg-primary text-primary-fg" : "bg-surface text-fg"),
							children: [m.text, m.source === "offline" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[11px] text-subtle",
								children: "Offline curriculum fallback"
							})]
						}, `${i}-${m.text.slice(0, 12)}`)),
						busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-[18px] bg-surface px-4 py-3 text-sm text-muted",
							children: "Thinking…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-3 flex items-end gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						send();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 2,
						value: input,
						onChange: (e) => setInput(e.target.value),
						placeholder: "Explain photosynthesis simply…",
						className: "min-h-[52px]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						disabled: busy || !input.trim(),
						"aria-label": "Send",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
					})]
				})
			]
		})]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-9 rounded-full border px-3 text-xs", active ? "border-primary bg-primary/10 text-fg" : "border-border text-muted"),
		children
	});
}
//#endregion
export { CoachPage as component };
