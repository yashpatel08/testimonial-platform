import express from "express";
import cors from "cors";
import path from "path";

import widgetRoutes from "./routes/widget.routes";
import testimonialRoutes from "./routes/testimonial.routes";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    })
);

app.use(express.json());

// Serve public folder
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/api/testimonials", testimonialRoutes);
app.use("/api/widget", cors(), widgetRoutes);

export default app;