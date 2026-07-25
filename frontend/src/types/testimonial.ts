export interface Testimonial {
    id?: string;
    name: string;
    email: string;
    company?: string;
    testimonial: string;
    rating: number;
    photo_url?: string;
    status?: "pending" | "approved" | "rejected";
    created_at?: string;
}