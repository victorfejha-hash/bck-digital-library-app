import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DEVELOPERS, c as SCHOOL_NAME, d as SUPPORT_EMAIL, f as TAGLINE, r as APP_NAME, s as SCHOOL_LOCATION } from "./constants-cN194syr.mjs";
import { t as Card } from "./card-CV_4R-OM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-D69h48Fj.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter mx-auto max-w-2xl space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.22em] text-subtle uppercase",
			children: TAGLINE
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl",
			children: APP_NAME
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "space-y-3 p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						SCHOOL_NAME,
						" is in ",
						SCHOOL_LOCATION,
						". This platform gives learners authorised textbooks and notes, practice exams, an AI study coach, holiday courses, and school notices — in one place that works on a phone."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Developed by ",
						DEVELOPERS,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["Support: ", SUPPORT_EMAIL]
				})
			]
		})]
	});
}
//#endregion
export { AboutPage as component };
