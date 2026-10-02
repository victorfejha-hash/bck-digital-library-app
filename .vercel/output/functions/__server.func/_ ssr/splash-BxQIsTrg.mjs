import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as SCHOOL_NAME, f as TAGLINE, r as APP_NAME } from "./constants-cN194syr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/splash-BxQIsTrg.js
var import_jsx_runtime = require_jsx_runtime();
function Splash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hero-depth flex min-h-dvh flex-col items-center justify-center px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 grid size-16 place-items-center rounded-[20px] border border-border-strong bg-surface text-lg font-semibold tracking-[0.2em] text-accent",
				children: "BCK"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl text-fg",
				children: APP_NAME
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: SCHOOL_NAME
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm tracking-[0.18em] text-subtle uppercase",
				children: TAGLINE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 h-1 w-40 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-full w-full rounded-full bg-primary/40" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-subtle",
				children: "Loading your learning space"
			})
		]
	});
}
//#endregion
export { Splash as t };
