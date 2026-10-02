import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as updateProfile, t as deleteMyAccount } from "./profile-BXAVSI7O.mjs";
import { n as useAppState } from "./app-state-fD1VhoQc.mjs";
import { t as Button } from "./button-CIZ_yk94.mjs";
import { t as Card } from "./card-CV_4R-OM.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as signOut } from "./client-1vAx-gM_.mjs";
import { a as hasGateSessionMarker } from "./server-C07PhpDF.mjs";
import { t as useCurrentUser } from "./use-current-user-BYyFvsCd.mjs";
import { t as Input } from "./input-DvY4bSDz.mjs";
import { t as Label } from "./label-MdCnXjru.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-D6dUaKsj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const user = useCurrentUser();
	const { profile, refresh } = useAppState();
	const gate = typeof window !== "undefined" ? hasGateSessionMarker() : false;
	const [form, setForm] = (0, import_react.useState)({
		name: profile?.name ?? "",
		phone: profile?.phone ?? "",
		school: profile?.school ?? ""
	});
	(0, import_react.useEffect)(() => {
		if (profile) setForm({
			name: profile.name,
			phone: profile.phone,
			school: profile.school
		});
	}, [profile]);
	const save = useMutation({
		mutationFn: () => updateProfile({ data: form }),
		onSuccess: async () => {
			await refresh();
			toast("Profile updated");
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: () => deleteMyAccount(),
		onSuccess: () => {
			toast("Account data deleted");
			signOut("/login");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter mx-auto max-w-xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "My Account"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Email is managed by your sign-in method."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: user?.primaryEmail ?? profile?.email ?? "",
							readOnly: true
						})]
					}),
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.phone,
							onChange: (e) => setForm({
								...form,
								phone: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "School" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.school,
							onChange: (e) => setForm({
								...form,
								school: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["Points: ", profile?.points ?? 0]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: save.isPending,
						onClick: () => save.mutate(),
						children: "Save changes"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-3 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium",
					children: "Sign out"
				}), !gate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => void signOut("/login"),
					children: "Sign out"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "This session is managed by your Grok sign-in."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Delete account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Permanently deletes your BCK library profile, exam scores, saved books and bookings."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						disabled: remove.isPending,
						onClick: () => {
							if (window.confirm("Delete your BCK Digital Library account data?")) remove.mutate();
						},
						children: "Delete permanently"
					})
				]
			})
		]
	});
}
//#endregion
export { AccountPage as component };
