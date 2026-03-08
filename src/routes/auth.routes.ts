import { Router } from "express";
import {
  login,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/refresh", asyncHandler(refreshToken));

router.get(
  "/me",
  authenticate,
  asyncHandler(async (req, res) => {
    return res.status(200).json(
      new ApiResponse("Current user fetched", {
        userId: req.user?.userId,
        role: req.user?.role,
      })
    );
  })
);

router.get("/admin-test", authenticate, authorizeRoles("ADMIN"), (_, res) => {
  res.json({ message: "Welcome admin" });
});

export default router;
