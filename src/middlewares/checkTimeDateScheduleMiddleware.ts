import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Schedule, User, RealEstate } from "../entities";
import { AppError } from "../errors";

export const checkTimeDateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const date = req.body.date;
  const hour = req.body.hour;
  const realEstateId = req.body.realEstateId;
  const userId = req.userInfo.id;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate = await realEstateRepository.find({
    where: {
      id: realEstateId,
    },
  });

  if (!findRealEstate) {
    throw new AppError("Real estate not found", 404);
  }

  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const scheduleQueryBuilder =
    scheduleRepository.createQueryBuilder("schedule");

  const repeatedSchedule = await scheduleQueryBuilder
    .where("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .andWhere("schedule.realEstateId = :realEstateId", { realEstateId })
    .getOne();

  const repeatedScheduleUser = await scheduleQueryBuilder
    .where("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .andWhere("schedule.realEstateId = :realEstateId", { realEstateId })
    .andWhere("schedule.userId = :userId", { userId })
    .getOne();

  if (repeatedSchedule || repeatedScheduleUser) {
    throw new AppError("Schedule already exists for that time and date.", 409);
  }

  const verifyHour = hour.split(":")[0];
  if (verifyHour < 8 && verifyHour > 18) {
    throw new AppError("Hour invalid.", 409);
  }

  const newDate = new Date(req.body.date);
  const getDayDate = newDate.getDay();
  if (getDayDate == 0 || getDayDate == 6) {
    throw new AppError("Date invalid.", 409);
  }

  return next();
};
