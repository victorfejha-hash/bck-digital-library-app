import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as SCHOOL_NAME, l as SCHOOL_PAY_URL, o as PAYMENT_NUMBER } from "./constants-cN194syr.mjs";
import { t as Button } from "./button-CIZ_yk94.mjs";
import { t as Card } from "./card-CV_4R-OM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/school-pay-CBlnBG_x.js
var import_jsx_runtime = require_jsx_runtime();
function SchoolPayPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "School Pay"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "School fees are paid through School Pay Uganda — this is not a fake checkout."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-4 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Use the official School Pay portal for ",
						SCHOOL_NAME,
						" fees. Keep your student number ready. For holiday course bookings on this app, send mobile money to ",
						PAYMENT_NUMBER,
						"."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: SCHOOL_PAY_URL,
						target: "_blank",
						rel: "noreferrer",
						children: "Open School Pay Uganda"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-2 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium",
					children: "Mobile money guidance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "list-disc space-y-1 pl-5 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Confirm the school or merchant name before you send." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Save the confirmation SMS or email." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Ask the bursar if a code does not match your student record." })
					]
				})]
			})
		]
	});
}
//#endregion
export { SchoolPayPage as component };
