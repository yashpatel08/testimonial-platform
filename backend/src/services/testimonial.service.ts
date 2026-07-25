import { db } from "../config/db";
import { Testimonial } from "../types/testimonial";
import { isSpam } from "../utils/spam";
import { maybeGenerateSummary } from "./summary.service";

export async function createTestimonial(data: Testimonial) {
    if (isSpam(data.testimonial)) {
        throw new Error("Your testimonial appears to be spam.");
    }
    const result = await db.query(
        `
        INSERT INTO testimonials
        (name,email,company,testimonial,rating,photo_url)
        VALUES ($1,$2,$3,$4,$5,$6)
        ON CONFLICT (email)
        DO NOTHING
        RETURNING *
        `,
        [
            data.name,
            data.email,
            data.company,
            data.testimonial,
            data.rating,
            data.photo_url,
        ]
    );

    if (result.rows.length === 0) {
        throw new Error("A testimonial has already been submitted using this email.");
    }

    return result.rows[0];
}

export async function getTestimonials(status?: string) {
    if (status) {
        const result = await db.query(
            `
            SELECT *
            FROM testimonials
            WHERE status=$1
            ORDER BY created_at DESC
            `,
            [status]
        );

        return result.rows;
    }

    const result = await db.query(`
        SELECT *
        FROM testimonials
        ORDER BY created_at DESC
    `);

    return result.rows;
}

export async function updateStatus(
    id: string,
    status: "approved" | "rejected"
) {
    const result = await db.query(
        `
        UPDATE testimonials
        SET status=$1
        WHERE id=$2
        RETURNING *
        `,
        [status, id]
    );

    await maybeGenerateSummary();

    return result.rows[0];
}