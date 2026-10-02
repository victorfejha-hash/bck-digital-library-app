import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { offlineTutorAnswer } from "@/data/ai-fallback";

const SYSTEM = `You are the BCK Study Coach for Bishop Cipriano Kihangire Secondary School (Bbiina/Luzira, Kampala, Uganda).
Help secondary students (S.1–S.6, O-Level and A-Level) with clear, accurate explanations.
Use short paragraphs, worked steps for maths, and UNEB-style exam tips when relevant.
If a question is not academic, steer back to study. Do not invent school policy.
Keep answers under 350 words unless a derivation needs more.`;

export const askStudyCoach = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { question: string; subject?: string }) => ({
    question: input.question.trim().slice(0, 2000),
    subject: (input.subject ?? "general").trim().slice(0, 80),
  }))
  .handler(async ({ data }) => {
    if (!data.question) return { ok: false as const, error: "Ask a question first.", fallback: "" };
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: true as const,
        answer: offlineTutorAnswer(data.question),
        source: "offline" as const,
      };
    }
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.4,
          max_tokens: 700,
          messages: [
            { role: "system", content: SYSTEM },
            {
              role: "user",
              content: `Subject: ${data.subject}\nQuestion: ${data.question}`,
            },
          ],
        }),
      });
      if (!res.ok) {
        return {
          ok: true as const,
          answer: offlineTutorAnswer(data.question),
          source: "offline" as const,
        };
      }
      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content?.trim();
      return {
        ok: true as const,
        answer: text || offlineTutorAnswer(data.question),
        source: text ? ("live" as const) : ("offline" as const),
      };
    } catch {
      return {
        ok: true as const,
        answer: offlineTutorAnswer(data.question),
        source: "offline" as const,
      };
    }
  });
