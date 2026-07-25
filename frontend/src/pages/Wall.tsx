import { useEffect, useState } from "react";
import { BadgeCheck, MessageSquareQuote, Star } from "lucide-react";
import { getTestimonials } from "../api/testimonial";
import type { Testimonial } from "../types/testimonial";
import TestimonialCard from "../components/TestimonialCard";

export default function Wall() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadTestimonials() {
        try {
            const res = await getTestimonials("approved");
            setTestimonials(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTestimonials();
    }, []);

    const averageRating =
        testimonials.length > 0
            ? (
                testimonials.reduce(
                    (sum, item) => sum + item.rating,
                    0
                ) / testimonials.length
            ).toFixed(1)
            : "0.0";

    if (loading) {
        return (
            <div className="mx-auto max-w-6xl px-6 py-24">
                <div className="animate-pulse space-y-6">
                    <div className="mx-auto h-10 w-80 rounded bg-slate-200" />
                    <div className="mx-auto h-5 w-96 rounded bg-slate-200" />

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="h-72 rounded-2xl bg-slate-200"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50">
            <section className="border-b border-indigo-100 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-10 text-center">

                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
                        <MessageSquareQuote size={16} />
                        Customer Stories
                    </div>

                    <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-800 md:text-6xl">
                        Loved by Businesses
                        <span className="block text-indigo-600">
                            Around the World
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
                        Every testimonial below is submitted by a real customer
                        and reviewed before being published.
                    </p>

                    <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="text-4xl font-bold text-indigo-600">
                                {testimonials.length}
                            </div>

                            <p className="mt-2 text-slate-500">
                                Published Testimonials
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-center gap-1">
                                <Star
                                    size={26}
                                    className="fill-amber-400 text-amber-400"
                                />

                                <span className="text-4xl font-bold text-slate-800">
                                    {averageRating}
                                </span>
                            </div>

                            <p className="mt-2 text-slate-500">
                                Average Rating
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex justify-center">
                                <BadgeCheck
                                    size={38}
                                    className="text-emerald-500"
                                />
                            </div>

                            <p className="mt-3 font-semibold text-slate-800">
                                100% Verified
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Every testimonial is manually reviewed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">

                {testimonials.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center">

                        <MessageSquareQuote
                            size={60}
                            className="mx-auto text-slate-300"
                        />

                        <h2 className="mt-6 text-2xl font-semibold text-slate-700">
                            No Testimonials Yet
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Approved testimonials will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard
                                key={testimonial.id}
                                testimonial={testimonial}
                            />
                        ))}
                    </div>
                )}

            </section>
        </div>
    );
}