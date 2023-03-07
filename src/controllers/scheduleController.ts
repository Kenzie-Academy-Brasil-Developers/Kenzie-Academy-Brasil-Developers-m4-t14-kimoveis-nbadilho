import { Request, Response } from "express";
import { getAllSchedulesService } from "../services/schedules/getAllSchedules";
import { newScheduleService } from "../services/schedules/newSchedule";

export const createScheduleController = async (req: Request, res: Response) => {
  const userId = req.userInfo.id;

  await newScheduleService(req.body, userId);

  return res.status(201).json({
    message: "Schedule created",
  });
};

export const getAllSchedulesController = async (
  req: Request,
  res: Response
) => {
  const realEstateId = Number(req.params.id);

  const allSchedules = await getAllSchedulesService(realEstateId);

  return res.status(200).json(allSchedules);
};
