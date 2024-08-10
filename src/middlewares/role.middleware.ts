import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";

export const isSuperAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "superadmin") {
    return res
      .status(403)
      .json({ message: "Access denied: Requires superadmin role" });
  }
  next();
};

export const isUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "user") {
    return res
      .status(403)
      .json({ message: "Access denied: Requires user role" });
  }
  next();
};
