import { Router } from "express";
import * as controller from "../controllers/testimonial.controller";
import { testimonialLimiter } from "../middleware/rateLimit";

const router = Router();

router.post("/", testimonialLimiter, controller.create);

router.get("/", controller.getAll);

router.patch("/:id/approve", controller.approve);

router.patch("/:id/reject", controller.reject);

export default router;