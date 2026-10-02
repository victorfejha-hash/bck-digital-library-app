import { o as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, g as Outlet, p as useRouterState, x as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { c as SCHOOL_NAME, f as TAGLINE, r as APP_NAME } from "./_ssr/constants-cN194syr.mjs";
import { n as useAppState, t as AppStateProvider } from "./_ssr/app-state-fD1VhoQc.mjs";
import { i as initials, t as cn } from "./_ssr/utils-C3vUXC4L.mjs";
import { t as Button } from "./_ssr/button-CIZ_yk94.mjs";
import { S as Bookmark, T as Bell, a as Sun, b as CircleHelp, d as MessageSquare, f as Menu, g as GraduationCap, h as House, l as Moon, m as Info, n as UserRound, o as Shield, p as LogOut, r as Trophy, t as X, u as MonitorPlay, v as Download, w as BookOpen, x as Bot, y as CreditCard } from "./_libs/lucide-react.mjs";
import { i as signOut } from "./_ssr/client-1vAx-gM_.mjs";
import { a as hasGateSessionMarker } from "./_ssr/server-C07PhpDF.mjs";
import { n as useCurrentUserState, t as useCurrentUser } from "./_ssr/use-current-user-BYyFvsCd.mjs";
import { t as Splash } from "./_ssr/splash-BxQIsTrg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-CjfHuVp9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var PRIMARY = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/library",
		label: "Library",
		icon: BookOpen
	},
	{
		to: "/exams",
		label: "Exams",
		icon: GraduationCap
	},
	{
		to: "/coach",
		label: "AI Coach",
		icon: Bot
	},
	{
		to: "/courses",
		label: "Courses",
		icon: Bookmark
	},
	{
		to: "/media",
		label: "Study Media",
		icon: MonitorPlay
	},
	{
		to: "/rankings",
		label: "Rankings",
		icon: Trophy
	},
	{
		to: "/discussions",
		label: "Discussions",
		icon: MessageSquare
	},
	{
		to: "/school-pay",
		label: "School Pay",
		icon: CreditCard
	},
	{
		to: "/notifications",
		label: "Notifications",
		icon: Bell
	},
	{
		to: "/saved",
		label: "My Library",
		icon: Bookmark
	},
	{
		to: "/account",
		label: "My Account",
		icon: UserRound
	},
	{
		to: "/contact",
		label: "Contact",
		icon: CircleHelp
	},
	{
		to: "/about",
		label: "About",
		icon: Info
	},
	{
		to: "/admin",
		label: "Admin",
		icon: Shield,
		admin: true
	}
];
var MOBILE_TABS = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/library",
		label: "Library",
		icon: BookOpen
	},
	{
		to: "/exams",
		label: "Exams",
		icon: GraduationCap
	},
	{
		to: "/coach",
		label: "Coach",
		icon: Bot
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { profile, unread } = useAppState();
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	const [theme, setTheme] = (0, import_react.useState)("dark");
	const [installEvent, setInstallEvent] = (0, import_react.useState)(null);
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(() => () => {}, hasGateSessionMarker, () => false);
	(0, import_react.useEffect)(() => {
		const next = window.localStorage.getItem("bck-theme") === "light" ? "light" : "dark";
		setTheme(next);
		document.documentElement.dataset.theme = next;
	}, []);
	(0, import_react.useEffect)(() => {
		const onPrompt = (e) => {
			e.preventDefault();
			setInstallEvent(e);
		};
		window.addEventListener("beforeinstallprompt", onPrompt);
		return () => window.removeEventListener("beforeinstallprompt", onPrompt);
	}, []);
	(0, import_react.useEffect)(() => {
		setMoreOpen(false);
	}, [pathname]);
	const nav = (0, import_react.useMemo)(() => PRIMARY.filter((item) => !item.admin || profile?.isAdmin), [profile?.isAdmin]);
	function toggleTheme() {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		document.documentElement.dataset.theme = next;
		window.localStorage.setItem("bck-theme", next);
	}
	async function installApp() {
		if (installEvent) {
			await installEvent.prompt();
			setInstallEvent(null);
			return;
		}
		window.location.href = "/?install=1";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-bg-elevated/90 px-4 py-5 backdrop-blur-md lg:flex lg:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-[0.22em] text-subtle uppercase",
								children: "BCK"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-xl leading-tight",
								children: APP_NAME
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: TAGLINE
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-6 flex-1 space-y-1 overflow-y-auto pr-1",
						children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							item,
							active: item.to === "/" ? pathname === "/" : pathname.startsWith(item.to),
							unread
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "px-2 pt-3 text-[11px] leading-5 text-subtle",
						children: [
							SCHOOL_NAME,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Developed by VYRNOX"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-64",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-[var(--radius-sm)] hover:bg-surface lg:hidden",
							onClick: () => setMoreOpen(true),
							"aria-label": "Open menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: pageTitle(pathname)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted",
								children: [profile?.name ? `Hello, ${profile.name.split(" ")[0]}` : "Learner", typeof profile?.points === "number" ? ` · ${profile.points} pts` : ""]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							size: "sm",
							onClick: installApp,
							className: "hidden sm:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Install"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggleTheme,
							className: "grid size-11 place-items-center rounded-[var(--radius-sm)] hover:bg-surface",
							"aria-label": "Toggle theme",
							children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/notifications",
							className: "relative grid size-11 place-items-center rounded-[var(--radius-sm)] hover:bg-surface",
							"aria-label": "Notifications",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 right-2 size-2 rounded-full bg-primary" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden md:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-10 place-items-center rounded-full bg-surface-2 text-xs font-semibold md:hidden",
							children: initials(profile?.name || "Learner")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-6xl px-4 pt-5 pb-28 lg:pb-10",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-elevated/95 px-2 py-1 backdrop-blur-md lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-5",
					children: [MOBILE_TABS.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px]", active ? "text-accent" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
						}, item.to);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMoreOpen(true),
						className: "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" }), "More"]
					})]
				})
			}),
			moreOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute inset-0 bg-bg/70",
					"aria-label": "Close menu",
					onClick: () => setMoreOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col border-r border-border bg-bg-elevated p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-[0.22em] text-subtle uppercase",
								children: "BCK"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl",
								children: "BCK Digital Library"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-11 place-items-center rounded-[var(--radius-sm)] hover:bg-surface",
								onClick: () => setMoreOpen(false),
								"aria-label": "Close",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 space-y-1 overflow-y-auto",
							children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								item,
								active: item.to === "/" ? pathname === "/" : pathname.startsWith(item.to),
								unread
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								className: "flex-1",
								onClick: installApp,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Install app"]
							}), !gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								disabled: signingOut,
								onClick: () => {
									setSigningOut(true);
									signOut("/login").catch(() => setSigningOut(false));
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
							})]
						})
					]
				})]
			})
		]
	});
}
function NavLink({ item, active, unread }) {
	const Icon = item.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		className: cn("flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm transition-colors duration-150", active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface hover:text-fg"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1",
				children: item.label
			}),
			item.to === "/notifications" && unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-fg tabular-nums",
				children: unread
			})
		]
	});
}
function pageTitle(pathname) {
	if (pathname === "/") return "Home";
	return PRIMARY.find((p) => p.to !== "/" && pathname.startsWith(p.to))?.label ?? "BCK Digital Library";
}
function AppLayout() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppStateProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) });
}
//#endregion
export { AppLayout as component };
