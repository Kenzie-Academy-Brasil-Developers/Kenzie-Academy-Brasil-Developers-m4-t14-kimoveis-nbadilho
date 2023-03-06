import { Request, Response } from "express";
import { newScheduleService } from "../services/schedules/newSchedule";

export const createScheduleController = async (req: Request, res: Response) => {
  const userId = req.userInfo.id;

  const newScheduleCreated = await newScheduleService(req.body, userId);

  return res.status(201).json(newScheduleCreated);
};
