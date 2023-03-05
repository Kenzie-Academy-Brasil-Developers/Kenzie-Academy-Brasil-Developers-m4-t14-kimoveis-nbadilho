import { Router } from "express";
import { createRealEstateController } from "../controllers/realEstateControllers";
import { checkAdminMiddleware } from "../middlewares/checkAdminMiddleware";
import { checkAdressExistsMiddleware } from "../middlewares/checkAdressMiddleware";
import { checkCategoryExistsMiddleware } from "../middlewares/checkCategoryMiddleware";
import { checkCategoryRealEstateMiddleware } from "../middlewares/checkCategoryRealEstate";
import { checkValidDataMiddleware } from "../middlewares/checkDataMiddleware";
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";
import { realEstateSchema } from "../schemas/realEstate";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  checkTokenMiddleware,
  checkAdminMiddleware,
  checkValidDataMiddleware(realEstateSchema),
  checkAdressExistsMiddleware,
  checkCategoryRealEstateMiddleware,
  createRealEstateController
);
