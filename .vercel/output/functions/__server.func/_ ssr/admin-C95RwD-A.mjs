import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as listFeedback, n as listAdminVideos, t as broadcastNotification, u as postVideo } from "./community-C13aOkMU.mjs";
import { n as useAppState } from "./app-state-fD1VhoQc.mjs";
import { t as Button } from "./button-CIZ_yk94.mjs";
import { t as Card } from "./card-CV_4R-OM.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Input } from "./input-DvY4bSDz.mjs";
import { t as Label } from "./label-MdCnXjru.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-uv-x89JJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C95RwD-A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const { profile } = useAppState();
	const qc = useQueryClient();
	const videos = useQuery({
		queryKey: ["admin-videos"],
		queryFn: () => listAdminVideos(),
		enabled: Boolean(profile?.isAdmin)
	});
	const feedback = useQuery({
		queryKey: ["feedback"],
		queryFn: () => listFeedback(),
		enabled: Boolean(profile?.isAdmin)
	});
	const [notice, setNotice] = (0, import_react.useState)({
		title: "",
		body: ""
	});
	const [video, setVideo] = (0, import_react.useState)({
		title: "",
		url: "",
		topic: "General",
		channel: "BCK Library"
	});
	const sendNotice = useMutation({
		mutationFn: () => broadcastNotification({ data: notice }),
		onSuccess: () => {
			setNotice({
				title: "",
				body: ""
			});
			qc.invalidateQueries({ queryKey: ["notifications"] });
			toast("Notification sent");
		},
		onError: (e) => toast.error(e.message)
	});
	const addVideo = useMutation({
		mutationFn: () => postVideo({ data: video }),
		onSuccess: () => {
			setVideo({
				title: "",
				url: "",
				topic: "General",
				channel: "BCK Library"
			});
			qc.invalidateQueries({ queryKey: ["admin-videos"] });
			toast("Video published");
		},
		onError: (e) => toast.error(e.message)
	});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-48 animate-pulse rounded-[var(--radius-md)] bg-surface-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-[var(--radius-xl)] bg-surface-2" })]
	});
	if (!profile.isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Admin Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Broadcast notices, post study videos, and review feedback."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Broadcast notification"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: notice.title,
							onChange: (e) => setNotice({
								...notice,
								title: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: notice.body,
							onChange: (e) => setNotice({
								...notice,
								body: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: sendNotice.isPending,
						onClick: () => sendNotice.mutate(),
						children: "Send to learners"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Post study video"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: video.title,
								onChange: (e) => setVideo({
									...video,
									title: e.target.value
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Topic" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: video.topic,
								onChange: (e) => setVideo({
									...video,
									topic: e.target.value
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "YouTube URL or ID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: video.url,
							onChange: (e) => setVideo({
								...video,
								url: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: addVideo.isPending,
						onClick: () => addVideo.mutate(),
						children: "Publish video"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 pt-2",
						children: [(videos.data ?? []).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								v.title,
								" · ",
								v.topic
							]
						}, v.id)), !videos.data?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-subtle",
							children: "No admin videos yet."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Learner feedback"
					}),
					(feedback.data ?? []).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-3 first:border-t-0 first:pt-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: f.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: f.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: f.message
							})
						]
					}, f.id)),
					!feedback.data?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-subtle",
						children: "No feedback yet."
					})
				]
			})
		]
	});
}
//#endregion
export { AdminPage as component };
