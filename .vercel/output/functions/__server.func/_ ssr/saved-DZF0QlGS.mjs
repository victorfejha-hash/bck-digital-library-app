import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as driveOpenUrl } from "./utils-C3vUXC4L.mjs";
import { t as Button } from "./button-CIZ_yk94.mjs";
import { t as Card } from "./card-CV_4R-OM.mjs";
import { t as RESOURCES } from "./resources-BQbKxNm3.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as listSavedIds } from "./library-B0wsh9oA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-DZF0QlGS.js
var import_jsx_runtime = require_jsx_runtime();
function SavedPage() {
	const saved = useQuery({
		queryKey: ["saved"],
		queryFn: () => listSavedIds()
	});
	const items = RESOURCES.filter((r) => saved.data?.includes(r.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "My Library"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Resources you saved for later."
		})] }), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "py-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No saved resources yet."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/library",
					children: "Go to Library"
				})
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: r.subject
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium",
					children: r.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: driveOpenUrl(r.driveLink),
						target: "_blank",
						rel: "noreferrer",
						children: "Open PDF"
					})
				})]
			}, r.id))
		})]
	});
}
//#endregion
export { SavedPage as component };
