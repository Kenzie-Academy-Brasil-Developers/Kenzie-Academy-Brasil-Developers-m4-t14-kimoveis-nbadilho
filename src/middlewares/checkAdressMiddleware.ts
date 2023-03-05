import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities";

import { AppError } from "../errors";

export const checkAdressExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userAdress = req.body.address;

  const adressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const findAdress = await adressRepository.findOne({
    where: {
      zipCode: userAdress?.zipCode,
      street: userAdress?.street,
    },
  });

  if (findAdress) {
    throw new AppError("Address already exists", 409);
  }

  return next();
};
