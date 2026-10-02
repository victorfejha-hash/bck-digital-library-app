import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as driveOpenUrl } from "./utils-C3vUXC4L.mjs";
import { t as Button } from "./button-CIZ_yk94.mjs";
import { t as Card } from "./card-CV_4R-OM.mjs";
import { t as Badge } from "./badge-DPVLML93.mjs";
import { a as RESOURCE_TYPES, i as RESOURCE_SUBJECTS, n as RESOURCE_CATEGORIES, r as RESOURCE_LEVELS, t as RESOURCES } from "./resources-BQbKxNm3.mjs";
import { C as BookmarkCheck, S as Bookmark, _ as ExternalLink, c as Search } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Input } from "./input-DvY4bSDz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$7 } from "./router-ChEYLXLN.mjs";
import { n as toggleSaved, t as listSavedIds } from "./library-B0wsh9oA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-gHti5Bw2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LibraryPage() {
	const search = Route$7.useSearch();
	const qc = useQueryClient();
	const saved = useQuery({
		queryKey: ["saved"],
		queryFn: () => listSavedIds()
	});
	const toggle = useMutation({
		mutationFn: (id) => toggleSaved({ data: id }),
		onSuccess: (_, id) => {
			qc.invalidateQueries({ queryKey: ["saved"] });
			toast(saved.data?.includes(id) ? "Removed from My Library" : "Saved to My Library");
		}
	});
	const [q, setQ] = (0, import_react.useState)(search.q ?? "");
	const [subject, setSubject] = (0, import_react.useState)(search.subject ?? "");
	const [level, setLevel] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("");
	const list = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return RESOURCES.filter((r) => {
			if (subject && r.subject !== subject) return false;
			if (level && r.classLevel !== level) return false;
			if (category && r.category !== category) return false;
			if (type && r.bookType !== type) return false;
			if (!query) return true;
			return [
				r.title,
				r.subject,
				r.description,
				r.author,
				r.publisher,
				r.classLevel
			].join(" ").toLowerCase().includes(query);
		});
	}, [
		q,
		subject,
		level,
		category,
		type
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Digital Library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Authorised Google Drive PDFs for BCK learners. Open in a new tab."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "pl-10",
					placeholder: "Search title, subject, author…",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: subject,
						onChange: setSubject,
						options: RESOURCE_SUBJECTS,
						label: "Subject"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: level,
						onChange: setLevel,
						options: RESOURCE_LEVELS,
						label: "Class"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: category,
						onChange: setCategory,
						options: RESOURCE_CATEGORIES,
						label: "Category"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: type,
						onChange: setType,
						options: RESOURCE_TYPES,
						label: "Type"
					}),
					(subject || level || category || type || q) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							setQ("");
							setSubject("");
							setLevel("");
							setCategory("");
							setType("");
						},
						children: "Clear"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [list.length, " resources"]
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "py-12 text-center text-sm text-muted",
				children: "No resources match your search."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceCard, {
					resource: r,
					saved: Boolean(saved.data?.includes(r.id)),
					onToggle: () => toggle.mutate(r.id)
				}, r.id))
			})
		]
	});
}
function ResourceCard({ resource, saved, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						resource.subject,
						" · ",
						resource.classLevel
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-medium",
					children: resource.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: resource.status === "Verified" ? "success" : "warn",
					children: resource.status
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 line-clamp-2 flex-1 text-sm text-muted",
				children: resource.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-subtle",
				children: [resource.bookType, resource.publisher ? ` · ${resource.publisher}` : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: driveOpenUrl(resource.driveLink),
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), "Open PDF"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "icon",
					onClick: onToggle,
					"aria-label": "Save",
					children: saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" })
				})]
			})
		]
	});
}
function Select({ value, onChange, options, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: "h-11 rounded-[var(--radius-sm)] border border-border bg-bg-elevated px-3 text-sm text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "",
			children: label
		}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: o,
			children: o
		}, o))]
	});
}
//#endregion
export { LibraryPage as component };
