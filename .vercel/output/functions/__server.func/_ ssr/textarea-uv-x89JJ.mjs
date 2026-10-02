import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cn } from "./utils-C3vUXC4L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-uv-x89JJ.js
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-28 w-full rounded-[var(--radius-md)] border border-border bg-bg-elevated px-3 py-2.5 text-sm text-fg placeholder:text-subtle", "transition-[border-color] duration-150 focus-visible:border-primary", className),
		...props
	});
}
//#endregion
export { Textarea as t };
