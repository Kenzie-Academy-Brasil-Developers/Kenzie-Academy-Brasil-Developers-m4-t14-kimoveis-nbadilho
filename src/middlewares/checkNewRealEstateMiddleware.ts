import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category,Address } from "../entities";

import { AppError } from "../errors";

export const checkNewRealEstateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.findOne({
    where: {
      id: req.body.categoryId,
    },
  });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }
  const userAdress = req.body.address;

  const adressNumber =
    userAdress.number == undefined ? null : userAdress.number;
  const adressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const findAdress = await adressRepository.findOne({
    where: {
      zipCode: userAdress.zipCode,
      street: userAdress.street,
      city: userAdress.city,
      state: userAdress.state,
      number: adressNumber,
    },
  });

  if (findAdress) {
    throw new AppError("Address already exists", 409);
  }


  return next();
};
