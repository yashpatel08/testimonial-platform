import { Request, Response } from "express";
import * as widgetService from "../services/widget.service";

export async function getApprovedTestimonials(
    req: Request,
    res: Response
) {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        const testimonials =
            await widgetService.getApprovedTestimonials(
                page,
                limit
            );

        res.json(testimonials);
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
}