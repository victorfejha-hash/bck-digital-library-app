import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-DJKpphXP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-C13aOkMU.js
var listRankings = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("93336aeb24ac3b44f355d7a6850581438ce8768dac5bc7a50c2ccfd49856d279"));
var listNotifications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("c393b2c2bc21f80970b9d1efce43f56eeb3c3265ccd6034351f0abc6d14557b5"));
var markNotificationRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("d71b283cc07f18daa030c225ab64cd52b84f7b56083495908cd471094b334b58"));
var broadcastNotification = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	title: input.title.trim().slice(0, 120),
	body: input.body.trim().slice(0, 2e3)
})).handler(createSsrRpc("bb1c16efa87f4c629ac27b853985ca853cdd21c0c4367bc6ce52381c100c7bae"));
var listAdminVideos = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f590cfafbe31f28f5f7ff9ec2f56cd4a74c17c5f6c3037ef29d9058111b19846"));
var postVideo = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	title: input.title.trim().slice(0, 140),
	url: input.url.trim(),
	topic: input.topic.trim().slice(0, 60) || "General",
	channel: (input.channel ?? "BCK Library").trim().slice(0, 80)
})).handler(createSsrRpc("9d95a713ef9c7308f31850302e364d63f8040d7db82f047fbf1626796301c7bc"));
var sendFeedback = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	name: input.name.trim().slice(0, 80),
	email: input.email.trim().slice(0, 120),
	message: input.message.trim().slice(0, 2e3)
})).handler(createSsrRpc("c8fc9982bd16b6d3200e2f80f0c5d0f4df6b5d76fa5f5de53e4e14ff222545b2"));
var listFeedback = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8be08f5218c372dd59edbfa2899e292245a65108f41a61698a2ca1fa7a20ee4b"));
var reserveCourse = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	courseId: input.courseId.trim(),
	courseName: input.courseName.trim().slice(0, 120)
})).handler(createSsrRpc("08dfd0e01a802a42feec15395625c569520ad510d96acb9d18c5a4c638f68251"));
var myBookings = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f542ae72b9796ab2c8d4812b9a8da218912a70ee9ee80c23a660a683e69097f3"));
var listDiscussions = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b0628b57746363f45bf83d963ae4811049530ad15f632293ca99ca215bf80614"));
var postDiscussion = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	name: input.name.trim().slice(0, 80),
	classLevel: input.classLevel.trim().slice(0, 40),
	contact: input.contact.trim().slice(0, 80),
	message: input.message.trim().slice(0, 500)
})).handler(createSsrRpc("503cf05795db4fb6092d7e5c01d60981e57333b6d27ccc01daa190925e95edec"));
//#endregion
export { listNotifications as a, myBookings as c, reserveCourse as d, sendFeedback as f, listFeedback as i, postDiscussion as l, listAdminVideos as n, listRankings as o, listDiscussions as r, markNotificationRead as s, broadcastNotification as t, postVideo as u };
