import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { createTestimonial } from "../api/testimonial";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function Submit() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        testimonial: "",
        rating: 0,
        photo_url: "",
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.name.trim()) {
            toast.error("Please enter your name");
            return;
        }

        if (!form.email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        if (!form.testimonial.trim()) {
            toast.error("Please write a testimonial");
            return;
        }

        if (form.rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        try {
            setLoading(true);

            await createTestimonial(form);

            setSuccess(true);

            setForm({
                name: "",
                email: "",
                company: "",
                testimonial: "",
                rating: 0,
                photo_url: "",
            });
        } catch (err) {
            console.error(err);

            if (err instanceof AxiosError) {
                toast.error(
                    err.response?.data?.message ??
                    "Failed to submit testimonial."
                );
            } else {
                toast.error("Failed to submit testimonial.");
            }
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="max-w-xl mx-auto mt-24 pt-12 text-center">
                <CheckCircle2
                    size={64}
                    className="mx-auto text-emerald-500"
                />

                <h2 className="mt-5 text-3xl font-bold">
                    Thank you!
                </h2>

                <p className="mt-3 text-slate-500">
                    Your testimonial has been received and is waiting for approval.
                </p>

                <button
                    onClick={() => setSuccess(false)}
                    className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-white"
                >
                    Submit Another
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-6">
            <div className="mb-10 text-center">
                <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
                    Customer Feedback
                </span>

                <h1 className="mt-5 text-5xl font-bold text-slate-800">
                    Share Your Experience
                </h1>

                <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
                    We'd love to hear how our product helped you.
                    Your testimonial may inspire future customers.
                </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-8 flex flex-col"
                >
                    <input
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    <input
                        name="company"
                        placeholder="Company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    <textarea
                        rows={6}
                        name="testimonial"
                        placeholder="Tell us what you liked..."
                        value={form.testimonial}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    <div>
                        <p className="mb-2 font-medium text-slate-700">
                            Overall Rating
                        </p>

                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={32}
                                    onClick={() =>
                                        setForm((prev) => ({
                                            ...prev,
                                            rating: star,
                                        }))
                                    }
                                    className={`cursor-pointer ${form.rating >= star
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        {form.rating > 0 && (
                            <span className="font-medium text-indigo-600">
                                {["", "Poor", "Fair", "Good", "Great", "Excellent"][form.rating]}
                            </span>
                        )}
                    </div>

                    <input
                        name="photo_url"
                        placeholder="Photo URL (optional)"
                        value={form.photo_url}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    <button
                        disabled={loading}
                        className="w-full rounded bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Submit Testimonial"}
                    </button>
                </form>
            </div>

        </div>
    );
}