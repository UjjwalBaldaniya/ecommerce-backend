import { UserRole } from "../generated/prisma/client/enums.ts";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: UserRole;
      };
    }
  }
}
