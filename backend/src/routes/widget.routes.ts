import { Router } from "express";
import * as widgetController from "../controllers/widget.controller";

const router = Router();

router.get("/", widgetController.getApprovedTestimonials);

export default router;