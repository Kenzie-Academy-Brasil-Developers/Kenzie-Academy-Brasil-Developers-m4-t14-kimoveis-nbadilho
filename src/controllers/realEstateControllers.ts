import { Request, Response } from "express";
import { getAllRealEstateService } from "../services/realEstate/getAllRealEstate";
import { newRealEstate } from "../services/realEstate/newRealEstate";

export const createRealEstateController = async (
  req: Request,
  res: Response
) => {
  const newRealEstateCreated = await newRealEstate(req.body);

  return res.status(201).json(newRealEstateCreated);
};

export const getAllRealEstateController = async (
  req: Request,
  res: Response
) => {
  const allRealEstates = await getAllRealEstateService();

  return res.status(200).json(allRealEstates);
};
