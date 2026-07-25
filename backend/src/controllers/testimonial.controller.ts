import { Request, Response } from "express";
import * as testimonialService from "../services/testimonial.service";

export async function create(req: Request, res: Response) {
    try {
        const testimonial = await testimonialService.createTestimonial(req.body);

        res.status(201).json(testimonial);
    } catch (error: any) {
        if (
            error.message ===
            "A testimonial has already been submitted using this email."
        ) {
            return res.status(409).json({
                message: error.message,
            });
        }

        res.status(500).json({
            message: error.message,
        });
    }
}

export async function getAll(req: Request, res: Response) {
    try {
        const { status } = req.query;

        const testimonials = await testimonialService.getTestimonials(
            status as string
        );

        res.json(testimonials);
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function approve(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid testimonial id",
            });
        }

        const testimonial = await testimonialService.updateStatus(
            id,
            "approved"
        );

        res.json(testimonial);
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function reject(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid testimonial id",
            });
        }

        const testimonial = await testimonialService.updateStatus(
            id,
            "rejected"
        );

        res.json(testimonial);
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
}