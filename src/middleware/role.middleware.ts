import { NextFunction, Request, Response } from "express";
import { UserRole } from "../generated/prisma/client/enums.js";
import { ApiError } from "../utils/ApiError.js";

export const authorizeRoles =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden: insufficient permissions");
    }

    next();
  };
