import { Router } from "express";
import { createScheduleController } from "../controllers/scheduleController";
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
