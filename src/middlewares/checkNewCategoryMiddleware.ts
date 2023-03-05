import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";

import { AppError } from "../errors";

export const checkNewCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const findCategory = await categoryRepository.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (findCategory) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};
