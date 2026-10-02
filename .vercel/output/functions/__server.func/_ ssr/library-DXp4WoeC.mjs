import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-DJKpphXP.mjs";
import { r as getSql } from "./db-81j08WSH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-DXp4WoeC.js
var listSavedIds_createServerFn_handler = createServerRpc({
	id: "e322f61474ec82bf9c08e4c992f16676bc80e6be81cd9aff4f6654776aeab7e0",
	name: "listSavedIds",
	filename: "src/lib/server/library.ts"
}, (opts) => listSavedIds.__executeServer(opts));
var listSavedIds = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listSavedIds_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select resource_id from saved_resources
      where user_id = ${context.userId}
      order by created_at desc
    `).map((r) => r.resource_id);
});
var toggleSaved_createServerFn_handler = createServerRpc({
	id: "f148e0d81073df91c932c9f11cf28cfcee0e5613fa378945aff6a793bf6871e3",
	name: "toggleSaved",
	filename: "src/lib/server/library.ts"
}, (opts) => toggleSaved.__executeServer(opts));
var toggleSaved = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((resourceId) => resourceId.trim()).handler(toggleSaved_createServerFn_handler, async ({ context, data: resourceId }) => {
	if (!resourceId) return { saved: false };
	const sql = await getSql();
	if ((await sql`
      select resource_id from saved_resources
      where user_id = ${context.userId} and resource_id = ${resourceId}
      limit 1
    `)[0]) {
		await sql`
        delete from saved_resources
        where user_id = ${context.userId} and resource_id = ${resourceId}
      `;
		return { saved: false };
	}
	await sql`
      insert into saved_resources (user_id, resource_id)
      values (${context.userId}, ${resourceId})
    `;
	return { saved: true };
});
//#endregion
export { listSavedIds_createServerFn_handler, toggleSaved_createServerFn_handler };
