import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { c as SCHOOL_NAME, f as TAGLINE, s as SCHOOL_LOCATION } from "./_ssr/constants-cN194syr.mjs";
import { a as listNotifications, o as listRankings } from "./_ssr/community-C13aOkMU.mjs";
import { n as useAppState } from "./_ssr/app-state-fD1VhoQc.mjs";
import { t as Button } from "./_ssr/button-CIZ_yk94.mjs";
import { t as Card } from "./_ssr/card-CV_4R-OM.mjs";
import { t as COURSES } from "./_ssr/courses-Cc9WMmhl.mjs";
import { t as Badge } from "./_ssr/badge-DPVLML93.mjs";
import { t as RESOURCES } from "./_ssr/resources-BQbKxNm3.mjs";
import { g as GraduationCap, r as Trophy, w as BookOpen, x as Bot } from "./_libs/lucide-react.mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-BiO4ArN6.js
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	const { profile } = useAppState();
	const ranks = useQuery({
		queryKey: ["rankings"],
		queryFn: () => listRankings()
	});
	const notes = useQuery({
		queryKey: ["notifications"],
		queryFn: () => listNotifications()
	});
	const myRank = ranks.data?.findIndex((r) => r.isYou) ?? -1;
	const featured = RESOURCES.slice(0, 4);
	const subjects = [...new Set(RESOURCES.map((r) => r.subject))].slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hero-depth overflow-hidden rounded-[28px] border border-border p-6 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.22em] text-subtle uppercase",
						children: TAGLINE
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 max-w-xl font-display text-3xl",
						children: profile?.name ? `Welcome, ${profile.name.split(" ")[0]}` : "Welcome, learner"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-xl text-sm text-muted",
						children: [
							SCHOOL_NAME,
							" · ",
							SCHOOL_LOCATION
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [profile?.points ?? 0, " points"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "muted",
								children: myRank >= 0 ? `Rank #${myRank + 1}` : "Sit an exam to rank"
							}),
							profile?.isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: "Admin"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/library",
								children: "Explore library"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/coach",
								children: "Ask the coach"
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
						to: "/library",
						icon: BookOpen,
						label: "Digital library",
						hint: `${RESOURCES.length} authorised PDFs`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
						to: "/exams",
						icon: GraduationCap,
						label: "Practice exams",
						hint: "Score points on completion"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
						to: "/coach",
						icon: Bot,
						label: "AI Study Coach",
						hint: "Live answers when signed in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
						to: "/rankings",
						icon: Trophy,
						label: "Leaderboard",
						hint: "See where you stand"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				title: "Featured resources",
				to: "/library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: featured.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								r.subject,
								" · ",
								r.classLevel
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-medium",
							children: r.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-sm text-muted",
							children: r.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							size: "sm",
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/library",
								children: "Open in library"
							})
						})
					]
				}, r.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				title: "Browse by subject",
				to: "/library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/library",
					search: { subject: s },
					className: "rounded-full border border-border bg-surface px-3 py-2 text-sm text-muted hover:text-fg",
					children: s
				}, s))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: "Holiday courses",
					to: "/courses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: COURSES[0]?.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: COURSES[0]?.desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-accent",
						children: "50,000 UGX · mobile money"
					})
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: "Latest notice",
					to: "/notifications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: notes.data?.[0]?.title ?? "No notices yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-3 text-sm text-muted",
					children: notes.data?.[0]?.body ?? "Admin broadcasts will appear here."
				})] })] })]
			})
		]
	});
}
function Header({ title, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-end justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			className: "text-sm text-accent",
			children: "View all"
		})]
	});
}
function Quick({ to, icon: Icon, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: "block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "h-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-accent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-medium",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: hint
				})
			]
		})
	});
}
//#endregion
export { HomePage as component };
