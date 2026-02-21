import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface JwtData extends JwtPayload {
  userId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtData;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

    req.user = decoded as JwtData;

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
