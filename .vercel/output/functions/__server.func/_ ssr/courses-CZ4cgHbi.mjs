import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as COURSE_FEE_UGX } from "./constants-cN194syr.mjs";
import { c as myBookings, d as reserveCourse } from "./community-C13aOkMU.mjs";
import { t as cn } from "./utils-C3vUXC4L.mjs";
import { t as Button } from "./button-CIZ_yk94.mjs";
import { t as Card } from "./card-CV_4R-OM.mjs";
import { t as COURSES } from "./courses-Cc9WMmhl.mjs";
import { t as Badge } from "./badge-DPVLML93.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses-CZ4cgHbi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
function DialogContent({ className, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(560px,calc(100vw-1.5rem))] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-xl)] border border-border bg-surface p-5 text-fg shadow-lift", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-xl font-semibold",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: "grid size-10 place-items-center rounded-[var(--radius-sm)] text-muted hover:bg-surface-2 hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		}), children]
	})] });
}
function CoursesPage() {
	const qc = useQueryClient();
	const bookings = useQuery({
		queryKey: ["bookings"],
		queryFn: () => myBookings()
	});
	const [selected, setSelected] = (0, import_react.useState)(null);
	const reserve = useMutation({
		mutationFn: (course) => reserveCourse({ data: {
			courseId: course.id,
			courseName: course.name
		} }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["bookings"] });
			toast("Place reserved. Follow the mobile-money steps below.");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Online Courses & Holiday Lessons"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					"Booking fee ",
					COURSE_FEE_UGX.toLocaleString(),
					" UGX. Payment is manual — there is no automatic card charge."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: COURSES.map((c) => {
					const reserved = bookings.data?.some((b) => b.courseId === c.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: c.subject
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-medium",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 flex-1 text-sm text-muted",
								children: c.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-subtle",
									children: [c.weeks, " weeks"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-accent",
									children: [COURSE_FEE_UGX.toLocaleString(), " UGX"]
								})]
							}),
							reserved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "mt-3 w-fit",
								tone: "success",
								children: "Reserved"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-4 w-full",
								onClick: () => setSelected(c),
								children: "Reserve place"
							})
						]
					}, c.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(selected),
				onOpenChange: (o) => !o && setSelected(null),
				children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					title: `Reserve ${selected.name}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "space-y-3 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"1. Send ",
								5e4.toLocaleString(),
								" UGX by MTN or Airtel Money to ",
								"0790005777",
								" (",
								"Mataa / VYRNOX",
								")."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"2. Email ",
								"vyrnox74@gmail.com",
								" with your name and the course title."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. Keep your confirmation message. A place is held after you reserve — it is not an automatic payment." })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: reserve.isPending,
							onClick: () => reserve.mutate(selected),
							children: reserve.isPending ? "Saving…" : "I will pay by mobile money"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: selected.external,
								target: "_blank",
								rel: "noreferrer",
								children: "Preview free lessons"
							})
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { CoursesPage as component };
