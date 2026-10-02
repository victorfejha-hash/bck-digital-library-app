import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as SUPPORT_EMAIL } from "./constants-cN194syr.mjs";
import { f as sendFeedback } from "./community-C13aOkMU.mjs";
import { n as useAppState } from "./app-state-fD1VhoQc.mjs";
import { t as Button } from "./button-CIZ_yk94.mjs";
import { t as Card } from "./card-CV_4R-OM.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Input } from "./input-DvY4bSDz.mjs";
import { t as Label } from "./label-MdCnXjru.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-uv-x89JJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-h-qP9M1r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { profile } = useAppState();
	const [form, setForm] = (0, import_react.useState)({
		name: profile?.name ?? "",
		email: profile?.email ?? "",
		message: ""
	});
	const send = useMutation({
		mutationFn: () => sendFeedback({ data: form }),
		onSuccess: () => {
			setForm((f) => ({
				...f,
				message: ""
			}));
			toast("Feedback sent to the admin dashboard");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter mx-auto max-w-xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Contact & Support"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					"Email the developers at ",
					SUPPORT_EMAIL,
					" or send feedback here."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.email,
							onChange: (e) => setForm({
								...form,
								email: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: form.message,
							onChange: (e) => setForm({
								...form,
								message: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: send.isPending,
						onClick: () => send.mutate(),
						children: "Send feedback"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `mailto:${SUPPORT_EMAIL}`,
					children: ["Email ", SUPPORT_EMAIL]
				})
			})
		]
	});
}
//#endregion
export { ContactPage as component };
