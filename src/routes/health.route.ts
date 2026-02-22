import { Request, Response, Router } from "express";
import { env } from "../config/env.js";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    environment: env.NODE_ENV,
  });
});

export default router;
