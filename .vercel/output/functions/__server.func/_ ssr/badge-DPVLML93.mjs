import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cn } from "./utils-C3vUXC4L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DPVLML93.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tone === "default" && "bg-primary/15 text-accent", tone === "accent" && "bg-accent/15 text-accent", tone === "success" && "bg-success/15 text-success", tone === "warn" && "bg-warn/15 text-warn", tone === "muted" && "bg-surface-2 text-muted", className),
		...props
	});
}
//#endregion
export { Badge as t };
