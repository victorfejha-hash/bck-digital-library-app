import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-DJKpphXP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { r as getSql } from "./db-81j08WSH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BXAVSI7O.js
async function requireAdmin(userId) {
	if (!(await (await getSql())`
    select is_admin from profiles where user_id = ${userId} limit 1
  `)[0]?.is_admin) throw new Error("Admin only");
}
var ensureProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("c25cd03e76aa914463e9858a31adb8b5d1294bdd61aa02173f6d51d60fd0527e"));
createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("43089abf67b0d2fc04dd8ee11c57f4f4a6f26a675e0ebab772a5634a77d97f36"));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	name: input.name.trim().slice(0, 80),
	phone: input.phone.trim().slice(0, 40),
	school: input.school.trim().slice(0, 120) || "Bishop Cipriano Kihangire Secondary School"
})).handler(createSsrRpc("580eb9cacacfd10e534ae986491eec3b15431475b909edd07b8eb72a9cf24ce9"));
var deleteMyAccount = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("2b88003e800d3db15146a4b963f9982cd5fa7bccf7a1b7b23d17c16b09af874e"));
//#endregion
export { updateProfile as i, ensureProfile as n, requireAdmin as r, deleteMyAccount as t };
