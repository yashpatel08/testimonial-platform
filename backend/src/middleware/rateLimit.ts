import rateLimit from "express-rate-limit";

export const testimonialLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message:
            "Too many testimonial submissions. Please try again later.",
    },
});