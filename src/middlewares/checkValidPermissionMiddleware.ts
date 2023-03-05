import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export const checkValidPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const admin = req.userInfo.admin;
  const id = req.userInfo.id;
  const idUser = parseInt(req.params.id);

  if (admin == false && id !== idUser) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
