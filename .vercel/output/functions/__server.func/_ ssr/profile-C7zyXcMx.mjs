import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { c as SCHOOL_NAME, t as ADMIN_EMAILS } from "./constants-cN194syr.mjs";
import { t as authMiddleware } from "./middleware-DJKpphXP.mjs";
import { r as getSql } from "./db-81j08WSH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-C7zyXcMx.js
function mapProfile(row) {
	return {
		userId: row.user_id,
		name: row.name,
		email: row.email,
		phone: row.phone,
		school: row.school,
		points: Number(row.points) || 0,
		isAdmin: Boolean(row.is_admin)
	};
}
async function authIdentity(userId) {
	return (await (await getSql())`
    select email, name from "user" where id = ${userId} limit 1
  `)[0] ?? {
		email: null,
		name: "Learner"
	};
}
var ensureProfile_createServerFn_handler = createServerRpc({
	id: "c25cd03e76aa914463e9858a31adb8b5d1294bdd61aa02173f6d51d60fd0527e",
	name: "ensureProfile",
	filename: "src/lib/server/profile.ts"
}, (opts) => ensureProfile.__executeServer(opts));
var ensureProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(ensureProfile_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const identity = await authIdentity(context.userId);
	const email = identity.email?.toLowerCase() ?? null;
	const isAdmin = Boolean(email && ADMIN_EMAILS.includes(email));
	const existing = await sql`
      select user_id, name, email, phone, school, points, is_admin
      from profiles where user_id = ${context.userId} limit 1
    `;
	if (!existing[0]) await sql`
        insert into profiles (user_id, name, email, phone, school, points, is_admin)
        values (
          ${context.userId},
          ${identity.name || "Learner"},
          ${email},
          ${""},
          ${SCHOOL_NAME},
          ${0},
          ${isAdmin}
        )
      `;
	else if (isAdmin && !existing[0].is_admin) await sql`
        update profiles set is_admin = true, email = ${email}, updated_at = now()
        where user_id = ${context.userId}
      `;
	else if (email && existing[0].email !== email) await sql`
        update profiles set email = ${email}, updated_at = now()
        where user_id = ${context.userId}
      `;
	return mapProfile((await sql`
      select user_id, name, email, phone, school, points, is_admin
      from profiles where user_id = ${context.userId} limit 1
    `)[0]);
});
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "43089abf67b0d2fc04dd8ee11c57f4f4a6f26a675e0ebab772a5634a77d97f36",
	name: "getMyProfile",
	filename: "src/lib/server/profile.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	const rows = await (await getSql())`
      select user_id, name, email, phone, school, points, is_admin
      from profiles where user_id = ${context.userId} limit 1
    `;
	return rows[0] ? mapProfile(rows[0]) : null;
});
var updateProfile_createServerFn_handler = createServerRpc({
	id: "580eb9cacacfd10e534ae986491eec3b15431475b909edd07b8eb72a9cf24ce9",
	name: "updateProfile",
	filename: "src/lib/server/profile.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	name: input.name.trim().slice(0, 80),
	phone: input.phone.trim().slice(0, 40),
	school: input.school.trim().slice(0, 120) || "Bishop Cipriano Kihangire Secondary School"
})).handler(updateProfile_createServerFn_handler, async ({ context, data }) => {
	if (!data.name) throw new Error("Name is required");
	const sql = await getSql();
	await sql`
      update profiles
      set name = ${data.name}, phone = ${data.phone}, school = ${data.school}, updated_at = now()
      where user_id = ${context.userId}
    `;
	return mapProfile((await sql`
      select user_id, name, email, phone, school, points, is_admin
      from profiles where user_id = ${context.userId} limit 1
    `)[0]);
});
var deleteMyAccount_createServerFn_handler = createServerRpc({
	id: "2b88003e800d3db15146a4b963f9982cd5fa7bccf7a1b7b23d17c16b09af874e",
	name: "deleteMyAccount",
	filename: "src/lib/server/profile.ts"
}, (opts) => deleteMyAccount.__executeServer(opts));
var deleteMyAccount = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(deleteMyAccount_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const id = context.userId;
	await sql`delete from saved_resources where user_id = ${id}`;
	await sql`delete from exam_attempts where user_id = ${id}`;
	await sql`delete from feedback where user_id = ${id}`;
	await sql`delete from course_bookings where user_id = ${id}`;
	await sql`delete from discussion_posts where user_id = ${id}`;
	await sql`delete from notification_reads where user_id = ${id}`;
	await sql`delete from profiles where user_id = ${id}`;
	return { ok: true };
});
//#endregion
export { deleteMyAccount_createServerFn_handler, ensureProfile_createServerFn_handler, getMyProfile_createServerFn_handler, updateProfile_createServerFn_handler };
