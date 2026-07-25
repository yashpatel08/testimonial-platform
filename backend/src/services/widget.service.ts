import { db } from "../config/db";

export async function getApprovedTestimonials(
    page: number,
    limit: number
) {
    const offset = (page - 1) * limit;

    const testimonials = await db.query(
        `
        SELECT
            id,
            name,
            company,
            testimonial,
            rating,
            photo_url,
            created_at
        FROM testimonials
        WHERE status='approved'
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
        `,
        [limit, offset]
    );

    const total = await db.query(`
        SELECT COUNT(*)::int AS count
        FROM testimonials
        WHERE status='approved'
    `);

    const summary = await db.query(`
        SELECT
            summary,
            tags,
            review_count,
            generated_at
        FROM ai_insights
        ORDER BY generated_at DESC
        LIMIT 1
    `);

    return {
        aiSummary: summary.rows[0] ?? null,

        page,
        limit,
        total: total.rows[0].count,
        hasMore:
            offset + testimonials.rows.length <
            total.rows[0].count,

        data: testimonials.rows,
    };
}