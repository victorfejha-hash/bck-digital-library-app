import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ADMIN_EMAILS, SCHOOL_NAME } from "@/lib/constants";

export type Profile = {
  userId: string;
  name: string;
  email: string | null;
  phone: string;
  school: string;
  points: number;
  isAdmin: boolean;
};

type ProfileRow = {
  user_id: string;
  name: string;
  email: string | null;
  phone: string;
  school: string;
  points: number;
  is_admin: boolean;
};

function mapProfile(row: ProfileRow): Profile {
  return {
    userId: row.user_id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    school: row.school,
    points: Number(row.points) || 0,
    isAdmin: Boolean(row.is_admin),
  };
}

async function authIdentity(userId: string) {
  const sql = await getSql();
  const rows = await sql<{ email: string | null; name: string }>`
    select email, name from "user" where id = ${userId} limit 1
  `;
  return rows[0] ?? { email: null, name: "Learner" };
}

export async function requireAdmin(userId: string) {
  const sql = await getSql();
  const rows = await sql<{ is_admin: boolean }>`
    select is_admin from profiles where user_id = ${userId} limit 1
  `;
  if (!rows[0]?.is_admin) {
    throw new Error("Admin only");
  }
}

export const ensureProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const identity = await authIdentity(context.userId);
    const email = identity.email?.toLowerCase() ?? null;
    const isAdmin = Boolean(email && (ADMIN_EMAILS as readonly string[]).includes(email));
    const existing = await sql<ProfileRow>`
      select user_id, name, email, phone, school, points, is_admin
      from profiles where user_id = ${context.userId} limit 1
    `;
    if (!existing[0]) {
      await sql`
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
    } else if (isAdmin && !existing[0].is_admin) {
      await sql`
        update profiles set is_admin = true, email = ${email}, updated_at = now()
        where user_id = ${context.userId}
      `;
    } else if (email && existing[0].email !== email) {
      await sql`
        update profiles set email = ${email}, updated_at = now()
        where user_id = ${context.userId}
      `;
    }
    const rows = await sql<ProfileRow>`
      select user_id, name, email, phone, school, points, is_admin
      from profiles where user_id = ${context.userId} limit 1
    `;
    return mapProfile(rows[0]);
  });

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<ProfileRow>`
      select user_id, name, email, phone, school, points, is_admin
      from profiles where user_id = ${context.userId} limit 1
    `;
    return rows[0] ? mapProfile(rows[0]) : null;
  });

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name: string; phone: string; school: string }) => ({
    name: input.name.trim().slice(0, 80),
    phone: input.phone.trim().slice(0, 40),
    school: input.school.trim().slice(0, 120) || SCHOOL_NAME,
  }))
  .handler(async ({ context, data }) => {
    if (!data.name) throw new Error("Name is required");
    const sql = await getSql();
    await sql`
      update profiles
      set name = ${data.name}, phone = ${data.phone}, school = ${data.school}, updated_at = now()
      where user_id = ${context.userId}
    `;
    const rows = await sql<ProfileRow>`
      select user_id, name, email, phone, school, points, is_admin
      from profiles where user_id = ${context.userId} limit 1
    `;
    return mapProfile(rows[0]);
  });

export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const id = context.userId;
    await sql`delete from saved_resources where user_id = ${id}`;
    await sql`delete from exam_attempts where user_id = ${id}`;
    await sql`delete from feedback where user_id = ${id}`;
    await sql`delete from course_bookings where user_id = ${id}`;
    await sql`delete from discussion_posts where user_id = ${id}`;
    await sql`delete from notification_reads where user_id = ${id}`;
    await sql`delete from profiles where user_id = ${id}`;
    return { ok: true as const };
  });
