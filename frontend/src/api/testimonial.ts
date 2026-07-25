import api from "./axios";
import type { Testimonial } from "../types/testimonial";

export const createTestimonial = (data: Testimonial) =>
    api.post("/testimonials", data);

export const getTestimonials = (status?: string) =>
    api.get("/testimonials", {
        params: { status },
    });

export const approveTestimonial = (id: string) =>
    api.patch(`/testimonials/${id}/approve`);

export const rejectTestimonial = (id: string) =>
    api.patch(`/testimonials/${id}/reject`);