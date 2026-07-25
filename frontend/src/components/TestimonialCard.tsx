import {
    Building2,
    Check,
    Mail,
    Quote,
    Star,
    User,
    X,
} from "lucide-react";
import type { Testimonial } from "../types/testimonial";

interface Props {
    testimonial: Testimonial;
    showActions?: boolean;
    onApprove?: (id: string) => void;
    onReject?: (id: string) => void;
}

export default function TestimonialCard({
    testimonial,
    showActions = false,
    onApprove,
    onReject,
}: Props) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
            <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    {testimonial.photo_url ? (
                        <img
                            src={testimonial.photo_url}
                            alt={testimonial.name}
                            className="h-14 w-14 rounded-full object-cover ring-2 ring-indigo-100"
                        />
                    ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <User size={24} />
                        </div>
                    )}

                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            {testimonial.name}
                        </h3>

                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                            <Mail size={14} />
                            {testimonial.email}
                        </div>

                        {testimonial.company && (
                            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                                <Building2 size={14} />
                                {testimonial.company}
                            </div>
                        )}
                    </div>
                </div>

                <Quote
                    size={30}
                    className="text-indigo-100 transition-colors group-hover:text-indigo-200"
                />
            </div>

            <div className="mt-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                        key={index}
                        size={18}
                        className={
                            index < testimonial.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                        }
                    />
                ))}
            </div>

            <p className="mt-4 leading-7 text-slate-600">
                "{testimonial.testimonial}"
            </p>

            {showActions && testimonial.id && (
                <div className="mt-6 flex w-fit gap-3">
                    <button
                        onClick={() => onApprove?.(testimonial.id!)}
                        className="flex flex-1 items-center justify-center gap-2 rounded bg-emerald-500 px-4 py-3 font-medium text-white transition hover:bg-emerald-600"
                    >
                        <Check size={18} />
                        Approve
                    </button>

                    <button
                        onClick={() => onReject?.(testimonial.id!)}
                        className="flex flex-1 items-center justify-center gap-2 rounded bg-rose-500 px-4 py-3 font-medium text-white transition hover:bg-rose-600"
                    >
                        <X size={18} />
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
}