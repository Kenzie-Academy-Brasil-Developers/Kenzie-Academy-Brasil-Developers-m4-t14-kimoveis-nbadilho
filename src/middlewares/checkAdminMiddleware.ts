import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export const checkAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const admin = req.userInfo.admin;


  if (admin == false) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
