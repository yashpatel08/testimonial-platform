import { useEffect, useState } from "react";
import {
    CheckCircle2,
    Clock3,
    Search,
    ShieldCheck,
    XCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
    approveTestimonial,
    getTestimonials,
    rejectTestimonial,
} from "../api/testimonial";
import TestimonialCard from "../components/TestimonialCard";
import type { Testimonial } from "../types/testimonial";

type Status = "pending" | "approved" | "rejected";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<Status>("pending");
    const [search, setSearch] = useState("");
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    async function loadTestimonials(currentStatus = status) {
        try {
            setLoading(true);

            const res = await getTestimonials(currentStatus);

            setTestimonials(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load testimonials");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTestimonials(status);
    }, [status]);

    async function approve(id: string) {
        try {
            await approveTestimonial(id);
            toast.success("Testimonial approved");
            loadTestimonials();
        } catch {
            toast.error("Unable to approve testimonial");
        }
    }

    async function reject(id: string) {
        try {
            await rejectTestimonial(id);
            toast.success("Testimonial rejected");
            loadTestimonials();
        } catch {
            toast.error("Unable to reject testimonial");
        }
    }

    const filteredTestimonials = testimonials.filter((item) => {
        const keyword = search.toLowerCase();

        return (
            item.name.toLowerCase().includes(keyword) ||
            item.company?.toLowerCase().includes(keyword)
        );
    });

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="mx-auto max-w-7xl px-6 py-10">

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                            <ShieldCheck size={16} />
                            Admin Dashboard
                        </div>

                        <h1 className="mt-3 text-4xl font-bold text-slate-800">
                            Manage Testimonials
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Review customer feedback before publishing.
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">

                    <button
                        onClick={() => setStatus("pending")}
                        className={`rounded-xl px-5 py-3 font-medium transition ${
                            status === "pending"
                                ? "bg-indigo-600 text-white"
                                : "bg-white border border-slate-200"
                        }`}
                    >
                        <Clock3 className="mr-2 inline" size={18} />
                        Pending
                    </button>

                    <button
                        onClick={() => setStatus("approved")}
                        className={`rounded-xl px-5 py-3 font-medium transition ${
                            status === "approved"
                                ? "bg-emerald-500 text-white"
                                : "bg-white border border-slate-200"
                        }`}
                    >
                        <CheckCircle2 className="mr-2 inline" size={18} />
                        Approved
                    </button>

                    <button
                        onClick={() => setStatus("rejected")}
                        className={`rounded-xl px-5 py-3 font-medium transition ${
                            status === "rejected"
                                ? "bg-rose-500 text-white"
                                : "bg-white border border-slate-200"
                        }`}
                    >
                        <XCircle className="mr-2 inline" size={18} />
                        Rejected
                    </button>

                </div>

                <div className="mt-8">

                    {loading ? (
                        <div className="grid gap-6 lg:grid-cols-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="h-72 animate-pulse rounded-2xl bg-slate-200"
                                />
                            ))}
                        </div>
                    ) : filteredTestimonials.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">

                            <Clock3
                                size={48}
                                className="mx-auto text-slate-300"
                            />

                            <h2 className="mt-5 text-2xl font-semibold text-slate-700">
                                No {status} testimonials
                            </h2>

                            <p className="mt-2 text-slate-500">
                                They'll appear here once available.
                            </p>

                        </div>
                    ) : (
                        <div className="grid gap-6 lg:grid-cols-2">
                            {filteredTestimonials.map((testimonial) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                    showActions={status === "pending"}
                                    onApprove={approve}
                                    onReject={reject}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}