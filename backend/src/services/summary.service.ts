import { GoogleGenAI } from "@google/genai";
import { db } from "../config/db";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function maybeGenerateSummary() {
    const countResult = await db.query(`
        SELECT COUNT(*)::int AS count
        FROM testimonials
        WHERE status='approved'
    `);

    const count = countResult.rows[0].count;

    if (count === 0 || count % 5 !== 0) {
        return;
    }

    await generateSummary(count);
}

async function generateSummary(totalReviews: number) {
    // newest
    const latest = await db.query(`
        SELECT testimonial
        FROM testimonials
        WHERE status='approved'
        ORDER BY created_at DESC
        LIMIT 4
    `);

    // middle
    const middle = await db.query(`
        SELECT testimonial
        FROM testimonials
        WHERE status='approved'
        OFFSET (
            SELECT GREATEST(COUNT(*)/2-1,0)
            FROM testimonials
            WHERE status='approved'
        )
        LIMIT 3
    `);

    // oldest
    const oldest = await db.query(`
        SELECT testimonial
        FROM testimonials
        WHERE status='approved'
        ORDER BY created_at ASC
        LIMIT 3
    `);

    const reviews = [
        ...latest.rows,
        ...middle.rows,
        ...oldest.rows,
    ];

    const prompt = `
You are analyzing customer testimonials.

Return ONLY valid JSON.

Schema:

{
  "summary": "One concise paragraph (40-60 words).",
  "tags": [
    "Tag1",
    "Tag2",
    "Tag3",
    "Tag4",
    "Tag5"
  ]
}

Testimonials:

${reviews
            .map((r, i) => `${i + 1}. ${r.testimonial}`)
            .join("\n\n")}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
    });

    let text = response.text ?? "";

    // remove markdown if Gemini wraps JSON
    text = text
        .replace(/^```json/, "")
        .replace(/^```/, "")
        .replace(/```$/, "")
        .trim();

    const result = JSON.parse(text);

    await db.query(
        `
    INSERT INTO ai_insights
    (
        summary,
        tags,
        review_count,
        generated_at
    )
    VALUES ($1,$2::jsonb,$3,NOW())
    `,
        [
            result.summary,
            JSON.stringify(result.tags),
            totalReviews,
        ]
    );
}