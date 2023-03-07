import { Router } from "express";
import { createScheduleController, getAllSchedulesController } from "../controllers/scheduleController";
import { checkAdminMiddleware } from "../middlewares/checkAdminMiddleware";
import { checkValidDataMiddleware } from "../middlewares/checkDataMiddleware";
import { checkTimeDateMiddleware } from "../middlewares/checkTimeDateScheduleMiddleware";
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";
import { scheduleSchema } from "../schemas/scheduleSchema";

export const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  checkTokenMiddleware,
  checkValidDataMiddleware(scheduleSchema),
  checkTimeDateMiddleware,
  createScheduleController
);
scheduleRoutes.get(
  "/realEstate/:id",
  checkTokenMiddleware,
  checkAdminMiddleware,
  getAllSchedulesController
);
