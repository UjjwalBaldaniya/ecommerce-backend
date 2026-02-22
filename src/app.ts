import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { authLimiter } from "./middleware/rateLimit.middleware.js";
import authRouter from "./routes/auth.routes.js";
import healthRouter from "./routes/health.route.js";

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/health", healthRouter);
app.use("/auth", authLimiter, authRouter);

export default app;
