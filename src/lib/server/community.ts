import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { extractYoutubeId } from "@/lib/utils";
import { requireAdmin } from "./profile";

export type RankRow = {
  id: string;
  name: string;
  school: string;
  points: number;
  exams: number;
  isYou: boolean;
  seed: boolean;
};

export const listRankings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const people = await sql<{
      user_id: string;
      name: string;
      school: string;
      points: number;
      exams: number;
    }>`
      select p.user_id, p.name, p.school, p.points,
        coalesce((select count(*)::int from exam_attempts a where a.user_id = p.user_id), 0) as exams
      from profiles p
      order by p.points desc, p.name asc
      limit 80
    `;
    const seeds = await sql<{
      id: string;
      name: string;
      school: string;
      points: number;
      exams: number;
    }>`select id, name, school, points, exams from ranking_seeds`;
    const rows: RankRow[] = [
      ...people.map((p) => ({
        id: p.user_id,
        name: p.name || "Learner",
        school: p.school,
        points: Number(p.points) || 0,
        exams: Number(p.exams) || 0,
        isYou: p.user_id === context.userId,
        seed: false,
      })),
      ...seeds.map((s) => ({
        id: s.id,
        name: s.name,
        school: s.school,
        points: Number(s.points) || 0,
        exams: Number(s.exams) || 0,
        isYou: false,
        seed: true,
      })),
    ]
      .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
      .slice(0, 50);
    return rows;
  });

export type Notice = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};

export const listNotifications = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      title: string;
      body: string;
      created_at: string;
      read: boolean;
    }>`
      select n.id, n.title, n.body, n.created_at::text as created_at,
        exists(
          select 1 from notification_reads r
          where r.notification_id = n.id and r.user_id = ${context.userId}
        ) as read
      from notifications n
      order by n.created_at desc
      limit 50
    `;
    return rows.map((r) => ({
      id: Number(r.id),
      title: r.title,
      body: r.body,
      createdAt: r.created_at,
      read: Boolean(r.read),
    }));
  });

export const markNotificationRead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await sql`
      insert into notification_reads (user_id, notification_id)
      values (${context.userId}, ${id})
      on conflict (user_id, notification_id) do nothing
    `;
    return { ok: true as const };
  });

export const broadcastNotification = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { title: string; body: string }) => ({
    title: input.title.trim().slice(0, 120),
    body: input.body.trim().slice(0, 2000),
  }))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    if (!data.title || !data.body) throw new Error("Title and message are required");
    const sql = await getSql();
    await sql`
      insert into notifications (title, body, created_by)
      values (${data.title}, ${data.body}, ${context.userId})
    `;
    return { ok: true as const };
  });

export type VideoRow = {
  id: string;
  title: string;
  youtubeId: string;
  channel: string;
  topic: string;
  admin: boolean;
};

export const listAdminVideos = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      title: string;
      youtube_id: string;
      channel: string;
      topic: string;
    }>`
      select id, title, youtube_id, channel, topic
      from videos
      order by created_at desc
      limit 100
    `;
    return rows.map((r) => ({
      id: String(r.id),
      title: r.title,
      youtubeId: r.youtube_id,
      channel: r.channel,
      topic: r.topic,
      admin: true,
    }));
  });

export const postVideo = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { title: string; url: string; topic: string; channel?: string }) => ({
    title: input.title.trim().slice(0, 140),
    url: input.url.trim(),
    topic: input.topic.trim().slice(0, 60) || "General",
    channel: (input.channel ?? "BCK Library").trim().slice(0, 80),
  }))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const yt = extractYoutubeId(data.url);
    if (!data.title || !yt) throw new Error("Need a title and a valid YouTube link");
    const sql = await getSql();
    await sql`
      insert into videos (title, youtube_id, channel, topic, created_by)
      values (${data.title}, ${yt}, ${data.channel}, ${data.topic}, ${context.userId})
    `;
    return { ok: true as const };
  });

export const sendFeedback = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name: string; email: string; message: string }) => ({
    name: input.name.trim().slice(0, 80),
    email: input.email.trim().slice(0, 120),
    message: input.message.trim().slice(0, 2000),
  }))
  .handler(async ({ context, data }) => {
    if (!data.message) throw new Error("Message is required");
    const sql = await getSql();
    await sql`
      insert into feedback (user_id, name, email, message)
      values (${context.userId}, ${data.name || "Learner"}, ${data.email}, ${data.message})
    `;
    return { ok: true as const };
  });

export const listFeedback = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      name: string;
      email: string | null;
      message: string;
      created_at: string;
    }>`
      select id, name, email, message, created_at::text as created_at
      from feedback
      order by created_at desc
      limit 80
    `;
    return rows.map((r) => ({
      id: Number(r.id),
      name: r.name,
      email: r.email,
      message: r.message,
      createdAt: r.created_at,
    }));
  });

export const reserveCourse = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { courseId: string; courseName: string }) => ({
    courseId: input.courseId.trim(),
    courseName: input.courseName.trim().slice(0, 120),
  }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into course_bookings (user_id, course_id, course_name, status)
      values (${context.userId}, ${data.courseId}, ${data.courseName}, ${"reserved"})
    `;
    return { ok: true as const };
  });

export const myBookings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ course_id: string; course_name: string; created_at: string }>`
      select course_id, course_name, created_at::text as created_at
      from course_bookings
      where user_id = ${context.userId}
      order by created_at desc
    `;
    return rows.map((r) => ({
      courseId: r.course_id,
      courseName: r.course_name,
      createdAt: r.created_at,
    }));
  });

export const listDiscussions = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      display_name: string;
      class_level: string;
      contact: string;
      message: string;
      created_at: string;
    }>`
      select id, display_name, class_level, contact, message, created_at::text as created_at
      from discussion_posts
      order by created_at desc
      limit 60
    `;
    return rows.map((r) => ({
      id: Number(r.id),
      name: r.display_name,
      classLevel: r.class_level,
      contact: r.contact,
      message: r.message,
      createdAt: r.created_at,
    }));
  });

export const postDiscussion = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name: string; classLevel: string; contact: string; message: string }) => ({
    name: input.name.trim().slice(0, 80),
    classLevel: input.classLevel.trim().slice(0, 40),
    contact: input.contact.trim().slice(0, 80),
    message: input.message.trim().slice(0, 500),
  }))
  .handler(async ({ context, data }) => {
    if (!data.message) throw new Error("Write a short note for your study group");
    const sql = await getSql();
    await sql`
      insert into discussion_posts (user_id, display_name, class_level, contact, message)
      values (${context.userId}, ${data.name || "Learner"}, ${data.classLevel}, ${data.contact}, ${data.message})
    `;
    return { ok: true as const };
  });
