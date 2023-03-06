import { Router } from "express";
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";
import { checkValidDataMiddleware } from "../middlewares/checkDataMiddleware";
import { categorieSchema } from "../schemas/categorieSchema";
import { checkNewCategoryExistsMiddleware } from "../middlewares/checkNewCategoryMiddleware";
import {
  getAllCategoriesController,
  getAllRealEstateCategoryController,
  postNewCategorieController,
} from "../controllers/categorieController";
import { checkAdminMiddleware } from "../middlewares/checkAdminMiddleware";
import { checkCategoryGetExistsMiddleware } from "../middlewares/checkCategoryGetMiddleware";

export const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  checkTokenMiddleware,
  checkAdminMiddleware,
  checkValidDataMiddleware(categorieSchema),
  checkNewCategoryExistsMiddleware,
  postNewCategorieController
);

categoriesRoutes.get("", getAllCategoriesController);

categoriesRoutes.get(
  "/:id/realEstate",
  checkCategoryGetExistsMiddleware,
  getAllRealEstateCategoryController
);
