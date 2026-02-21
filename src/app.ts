import express, { Application } from "express";
import authRouter from "./routes/auth.routes.js";
import healthRouter from "./routes/health.route.js";

const app: Application = express();

app.use(express.json());

app.use("/health", healthRouter);
app.use("/auth", authRouter);

export default app;
