import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-DJKpphXP.mjs";
import { r as getSql } from "./db-81j08WSH.mjs";
import { r as requireAdmin } from "./profile-BXAVSI7O.mjs";
import { r as extractYoutubeId } from "./utils-C3vUXC4L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-BRCy4f7W.js
var listRankings_createServerFn_handler = createServerRpc({
	id: "93336aeb24ac3b44f355d7a6850581438ce8768dac5bc7a50c2ccfd49856d279",
	name: "listRankings",
	filename: "src/lib/server/community.ts"
}, (opts) => listRankings.__executeServer(opts));
var listRankings = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listRankings_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const people = await sql`
      select p.user_id, p.name, p.school, p.points,
        coalesce((select count(*)::int from exam_attempts a where a.user_id = p.user_id), 0) as exams
      from profiles p
      order by p.points desc, p.name asc
      limit 80
    `;
	const seeds = await sql`select id, name, school, points, exams from ranking_seeds`;
	return [...people.map((p) => ({
		id: p.user_id,
		name: p.name || "Learner",
		school: p.school,
		points: Number(p.points) || 0,
		exams: Number(p.exams) || 0,
		isYou: p.user_id === context.userId,
		seed: false
	})), ...seeds.map((s) => ({
		id: s.id,
		name: s.name,
		school: s.school,
		points: Number(s.points) || 0,
		exams: Number(s.exams) || 0,
		isYou: false,
		seed: true
	}))].sort((a, b) => b.points - a.points || a.name.localeCompare(b.name)).slice(0, 50);
});
var listNotifications_createServerFn_handler = createServerRpc({
	id: "c393b2c2bc21f80970b9d1efce43f56eeb3c3265ccd6034351f0abc6d14557b5",
	name: "listNotifications",
	filename: "src/lib/server/community.ts"
}, (opts) => listNotifications.__executeServer(opts));
var listNotifications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listNotifications_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select n.id, n.title, n.body, n.created_at::text as created_at,
        exists(
          select 1 from notification_reads r
          where r.notification_id = n.id and r.user_id = ${context.userId}
        ) as read
      from notifications n
      order by n.created_at desc
      limit 50
    `).map((r) => ({
		id: Number(r.id),
		title: r.title,
		body: r.body,
		createdAt: r.created_at,
		read: Boolean(r.read)
	}));
});
var markNotificationRead_createServerFn_handler = createServerRpc({
	id: "d71b283cc07f18daa030c225ab64cd52b84f7b56083495908cd471094b334b58",
	name: "markNotificationRead",
	filename: "src/lib/server/community.ts"
}, (opts) => markNotificationRead.__executeServer(opts));
var markNotificationRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(markNotificationRead_createServerFn_handler, async ({ context, data: id }) => {
	await (await getSql())`
      insert into notification_reads (user_id, notification_id)
      values (${context.userId}, ${id})
      on conflict (user_id, notification_id) do nothing
    `;
	return { ok: true };
});
var broadcastNotification_createServerFn_handler = createServerRpc({
	id: "bb1c16efa87f4c629ac27b853985ca853cdd21c0c4367bc6ce52381c100c7bae",
	name: "broadcastNotification",
	filename: "src/lib/server/community.ts"
}, (opts) => broadcastNotification.__executeServer(opts));
var broadcastNotification = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	title: input.title.trim().slice(0, 120),
	body: input.body.trim().slice(0, 2e3)
})).handler(broadcastNotification_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	if (!data.title || !data.body) throw new Error("Title and message are required");
	await (await getSql())`
      insert into notifications (title, body, created_by)
      values (${data.title}, ${data.body}, ${context.userId})
    `;
	return { ok: true };
});
var listAdminVideos_createServerFn_handler = createServerRpc({
	id: "f590cfafbe31f28f5f7ff9ec2f56cd4a74c17c5f6c3037ef29d9058111b19846",
	name: "listAdminVideos",
	filename: "src/lib/server/community.ts"
}, (opts) => listAdminVideos.__executeServer(opts));
var listAdminVideos = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminVideos_createServerFn_handler, async () => {
	return (await (await getSql())`
      select id, title, youtube_id, channel, topic
      from videos
      order by created_at desc
      limit 100
    `).map((r) => ({
		id: String(r.id),
		title: r.title,
		youtubeId: r.youtube_id,
		channel: r.channel,
		topic: r.topic,
		admin: true
	}));
});
var postVideo_createServerFn_handler = createServerRpc({
	id: "9d95a713ef9c7308f31850302e364d63f8040d7db82f047fbf1626796301c7bc",
	name: "postVideo",
	filename: "src/lib/server/community.ts"
}, (opts) => postVideo.__executeServer(opts));
var postVideo = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	title: input.title.trim().slice(0, 140),
	url: input.url.trim(),
	topic: input.topic.trim().slice(0, 60) || "General",
	channel: (input.channel ?? "BCK Library").trim().slice(0, 80)
})).handler(postVideo_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const yt = extractYoutubeId(data.url);
	if (!data.title || !yt) throw new Error("Need a title and a valid YouTube link");
	await (await getSql())`
      insert into videos (title, youtube_id, channel, topic, created_by)
      values (${data.title}, ${yt}, ${data.channel}, ${data.topic}, ${context.userId})
    `;
	return { ok: true };
});
var sendFeedback_createServerFn_handler = createServerRpc({
	id: "c8fc9982bd16b6d3200e2f80f0c5d0f4df6b5d76fa5f5de53e4e14ff222545b2",
	name: "sendFeedback",
	filename: "src/lib/server/community.ts"
}, (opts) => sendFeedback.__executeServer(opts));
var sendFeedback = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	name: input.name.trim().slice(0, 80),
	email: input.email.trim().slice(0, 120),
	message: input.message.trim().slice(0, 2e3)
})).handler(sendFeedback_createServerFn_handler, async ({ context, data }) => {
	if (!data.message) throw new Error("Message is required");
	await (await getSql())`
      insert into feedback (user_id, name, email, message)
      values (${context.userId}, ${data.name || "Learner"}, ${data.email}, ${data.message})
    `;
	return { ok: true };
});
var listFeedback_createServerFn_handler = createServerRpc({
	id: "8be08f5218c372dd59edbfa2899e292245a65108f41a61698a2ca1fa7a20ee4b",
	name: "listFeedback",
	filename: "src/lib/server/community.ts"
}, (opts) => listFeedback.__executeServer(opts));
var listFeedback = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listFeedback_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return (await (await getSql())`
      select id, name, email, message, created_at::text as created_at
      from feedback
      order by created_at desc
      limit 80
    `).map((r) => ({
		id: Number(r.id),
		name: r.name,
		email: r.email,
		message: r.message,
		createdAt: r.created_at
	}));
});
var reserveCourse_createServerFn_handler = createServerRpc({
	id: "08dfd0e01a802a42feec15395625c569520ad510d96acb9d18c5a4c638f68251",
	name: "reserveCourse",
	filename: "src/lib/server/community.ts"
}, (opts) => reserveCourse.__executeServer(opts));
var reserveCourse = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	courseId: input.courseId.trim(),
	courseName: input.courseName.trim().slice(0, 120)
})).handler(reserveCourse_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      insert into course_bookings (user_id, course_id, course_name, status)
      values (${context.userId}, ${data.courseId}, ${data.courseName}, ${"reserved"})
    `;
	return { ok: true };
});
var myBookings_createServerFn_handler = createServerRpc({
	id: "f542ae72b9796ab2c8d4812b9a8da218912a70ee9ee80c23a660a683e69097f3",
	name: "myBookings",
	filename: "src/lib/server/community.ts"
}, (opts) => myBookings.__executeServer(opts));
var myBookings = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(myBookings_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select course_id, course_name, created_at::text as created_at
      from course_bookings
      where user_id = ${context.userId}
      order by created_at desc
    `).map((r) => ({
		courseId: r.course_id,
		courseName: r.course_name,
		createdAt: r.created_at
	}));
});
var listDiscussions_createServerFn_handler = createServerRpc({
	id: "b0628b57746363f45bf83d963ae4811049530ad15f632293ca99ca215bf80614",
	name: "listDiscussions",
	filename: "src/lib/server/community.ts"
}, (opts) => listDiscussions.__executeServer(opts));
var listDiscussions = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listDiscussions_createServerFn_handler, async () => {
	return (await (await getSql())`
      select id, display_name, class_level, contact, message, created_at::text as created_at
      from discussion_posts
      order by created_at desc
      limit 60
    `).map((r) => ({
		id: Number(r.id),
		name: r.display_name,
		classLevel: r.class_level,
		contact: r.contact,
		message: r.message,
		createdAt: r.created_at
	}));
});
var postDiscussion_createServerFn_handler = createServerRpc({
	id: "503cf05795db4fb6092d7e5c01d60981e57333b6d27ccc01daa190925e95edec",
	name: "postDiscussion",
	filename: "src/lib/server/community.ts"
}, (opts) => postDiscussion.__executeServer(opts));
var postDiscussion = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	name: input.name.trim().slice(0, 80),
	classLevel: input.classLevel.trim().slice(0, 40),
	contact: input.contact.trim().slice(0, 80),
	message: input.message.trim().slice(0, 500)
})).handler(postDiscussion_createServerFn_handler, async ({ context, data }) => {
	if (!data.message) throw new Error("Write a short note for your study group");
	await (await getSql())`
      insert into discussion_posts (user_id, display_name, class_level, contact, message)
      values (${context.userId}, ${data.name || "Learner"}, ${data.classLevel}, ${data.contact}, ${data.message})
    `;
	return { ok: true };
});
//#endregion
export { broadcastNotification_createServerFn_handler, listAdminVideos_createServerFn_handler, listDiscussions_createServerFn_handler, listFeedback_createServerFn_handler, listNotifications_createServerFn_handler, listRankings_createServerFn_handler, markNotificationRead_createServerFn_handler, myBookings_createServerFn_handler, postDiscussion_createServerFn_handler, postVideo_createServerFn_handler, reserveCourse_createServerFn_handler, sendFeedback_createServerFn_handler };
