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

  const findRealEstate = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
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

  const repeatedScheduleQueryBuilder =
    scheduleRepository.createQueryBuilder("schedule_user");
  const repeatedScheduleUser = await repeatedScheduleQueryBuilder
    .where("schedule_user.date = :date", { date })
    .andWhere("schedule_user.hour = :hour", { hour })
    .andWhere("schedule_user.userId = :userId", { userId })
    .getOne();

  if (repeatedSchedule) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  if (repeatedScheduleUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const verifyHour = hour.split(":")[0];
  if (verifyHour < 8 || verifyHour > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const newDate = new Date(req.body.date);
  const getDayDate = newDate.getDay();
  if (getDayDate == 0 || getDayDate == 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  return next();
};
