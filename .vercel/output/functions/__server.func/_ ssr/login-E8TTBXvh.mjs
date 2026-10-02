import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DEVELOPERS, c as SCHOOL_NAME, f as TAGLINE, r as APP_NAME, s as SCHOOL_LOCATION } from "./constants-cN194syr.mjs";
import { i as updateProfile, n as ensureProfile } from "./profile-BXAVSI7O.mjs";
import { t as Button } from "./button-CIZ_yk94.mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { t as GROK_PROVIDERS } from "./server-C07PhpDF.mjs";
import { n as useCurrentUserState } from "./use-current-user-BYyFvsCd.mjs";
import { t as Splash } from "./splash-BxQIsTrg.mjs";
import { t as Input } from "./input-DvY4bSDz.mjs";
import { t as Label } from "./label-MdCnXjru.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-E8TTBXvh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		school: SCHOOL_NAME,
		password: ""
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	function set(key, value) {
		setForm((prev) => ({
			...prev,
			[key]: value
		}));
	}
	async function onEmail(e) {
		e.preventDefault();
		setError("");
		setBusy(true);
		try {
			if (mode === "up") {
				const { error: err } = await authClient.signUp.email({
					email: form.email.trim(),
					password: form.password,
					name: form.name.trim() || "Learner"
				});
				if (err) throw new Error(err.message || "Could not create account");
				await ensureProfile();
				await updateProfile({ data: {
					name: form.name.trim() || "Learner",
					phone: form.phone.trim(),
					school: form.school.trim() || "Bishop Cipriano Kihangire Secondary School"
				} });
			} else {
				const { error: err } = await authClient.signIn.email({
					email: form.email.trim(),
					password: form.password
				});
				if (err) throw new Error(err.message || "Could not sign in");
			}
			window.location.href = "/";
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign-in failed");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hero-depth grid min-h-dvh lg:grid-cols-[1.1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hidden flex-col justify-between p-10 lg:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.28em] text-subtle uppercase",
					children: "BCK"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 max-w-md font-display text-4xl leading-tight",
					children: APP_NAME
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 max-w-md text-muted",
					children: [
						SCHOOL_NAME,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						SCHOOL_LOCATION
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-sm tracking-[0.18em] text-accent uppercase",
					children: TAGLINE
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-subtle",
				children: ["Developed by ", DEVELOPERS]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center p-5 sm:p-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md rounded-[28px] border border-border bg-surface p-6 shadow-lift",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.22em] text-subtle uppercase lg:hidden",
						children: "BCK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Sign in to open PDFs, sit exams, and ask the study coach."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid grid-cols-2 rounded-[var(--radius-md)] bg-bg p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `h-10 rounded-[10px] text-sm ${mode === "in" ? "bg-surface-2 text-fg" : "text-muted"}`,
							onClick: () => setMode("in"),
							children: "Sign in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `h-10 rounded-[10px] text-sm ${mode === "up" ? "bg-surface-2 text-fg" : "text-muted"}`,
							onClick: () => setMode("up"),
							children: "Create account"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-5 space-y-3",
							onSubmit: onEmail,
							children: [
								mode === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Full name",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.name,
											onChange: (e) => set("name", e.target.value),
											required: true
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Phone",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.phone,
											onChange: (e) => set("phone", e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "School",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.school,
											onChange: (e) => set("school", e.target.value)
										})
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "email",
										autoComplete: "email",
										value: form.email,
										onChange: (e) => set("email", e.target.value),
										required: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Password",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										autoComplete: mode === "up" ? "new-password" : "current-password",
										value: form.password,
										onChange: (e) => set("password", e.target.value),
										minLength: 8,
										required: true
									})
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-danger",
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "w-full",
									disabled: busy,
									type: "submit",
									children: busy ? "Please wait…" : mode === "up" ? "Create account" : "Sign in"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-5 flex items-center gap-3 text-xs text-subtle",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
								"or continue with",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "secondary",
								className: "w-full",
								onClick: () => signIn(p.providerId, { callbackURL: "/" }),
								children: ["Continue with ", p.label]
							}, p.providerId))
						})
					] })
				]
			})
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { LoginPage as component };
