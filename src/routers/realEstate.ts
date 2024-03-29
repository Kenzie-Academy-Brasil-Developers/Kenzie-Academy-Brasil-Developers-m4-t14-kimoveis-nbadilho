import { Router } from "express";
import {
  createRealEstateController,
  getAllRealEstateController,
} from "../controllers/realEstateControllers";
import { checkAdminMiddleware } from "../middlewares/checkAdminMiddleware";
import { checkNewRealEstateMiddleware } from "../middlewares/checkNewRealEstateMiddleware";
import { checkValidDataMiddleware } from "../middlewares/checkDataMiddleware";
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";
import { realEstateSchema } from "../schemas/realEstate";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  checkTokenMiddleware,
  checkAdminMiddleware,
  checkValidDataMiddleware(realEstateSchema),
  checkNewRealEstateMiddleware,
  createRealEstateController
);

realEstateRoutes.get("", getAllRealEstateController);
