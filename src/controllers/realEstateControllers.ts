import { Request, Response } from "express";
import { IPatchUser } from "../interfaces/userInterfaces";
import { newRealEstate } from "../services/realEstate/newRealEstate";
import { patchUserService } from "../services/users/patchUserService";

export const createRealEstateController = async (
  req: Request,
  res: Response
) => {
  const adminUser = req.userInfo.admin;

  const newRealEstateCreated = await newRealEstate(req.body, adminUser);

  return res.status(201).json(newRealEstateCreated);
};
