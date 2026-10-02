import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as listRankings } from "./community-C13aOkMU.mjs";
import { t as cn } from "./utils-C3vUXC4L.mjs";
import { t as Card } from "./card-CV_4R-OM.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rankings-BHxpsrd7.js
var import_jsx_runtime = require_jsx_runtime();
function Skeleton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("animate-pulse rounded-[var(--radius-md)] bg-surface-2", className) });
}
function RankingsPage() {
	const ranks = useQuery({
		queryKey: ["rankings"],
		queryFn: () => listRankings()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Learner Rankings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Points come from practice exams. Your row is highlighted."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[3rem_1fr_5rem_4.5rem] border-b border-border px-4 py-3 text-xs tracking-wide text-subtle uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "#" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Learner" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right",
							children: "Points"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right",
							children: "Exams"
						})
					]
				}),
				ranks.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10" })
					]
				}),
				ranks.data?.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("grid grid-cols-[3rem_1fr_5rem_4.5rem] items-center px-4 py-3 text-sm", row.isYou && "bg-primary/10"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-muted",
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate font-medium",
								children: [row.name, row.isYou ? " (you)" : ""]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-subtle",
								children: row.school
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right tabular-nums",
							children: row.points
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right tabular-nums text-muted",
							children: row.exams
						})
					]
				}, row.id))
			]
		})]
	});
}
//#endregion
export { RankingsPage as component };
