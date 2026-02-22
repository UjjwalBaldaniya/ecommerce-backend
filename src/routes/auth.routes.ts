import { Router } from "express";
import {
  login,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/refresh", asyncHandler(refreshToken));

export default router;
