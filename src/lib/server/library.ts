import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";

export const listSavedIds = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ resource_id: string }>`
      select resource_id from saved_resources
      where user_id = ${context.userId}
      order by created_at desc
    `;
    return rows.map((r) => r.resource_id);
  });

export const toggleSaved = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((resourceId: string) => resourceId.trim())
  .handler(async ({ context, data: resourceId }) => {
    if (!resourceId) return { saved: false };
    const sql = await getSql();
    const existing = await sql<{ resource_id: string }>`
      select resource_id from saved_resources
      where user_id = ${context.userId} and resource_id = ${resourceId}
      limit 1
    `;
    if (existing[0]) {
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
