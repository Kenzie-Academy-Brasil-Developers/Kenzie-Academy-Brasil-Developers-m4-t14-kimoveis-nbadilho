import { Router } from "express";
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";

export const scheduleRoutes: Router = Router();

scheduleRoutes.post("", checkTokenMiddleware);
