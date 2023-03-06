import { AppDataSource } from "../../data-source";
import { Schedule } from "../../entities";
import { Repository } from "typeorm";

import { IReturnSchedule, ISchedule } from "../../interfaces/scheduleInterface";

export const newScheduleService = async (
  scheduleData: ISchedule,
  userId: number
): Promise<IReturnSchedule> => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const newSchedule = {
    date: scheduleData.date,
    hour: scheduleData.hour,
    user: userId,
    realEstate: scheduleData.realEstateId,
  };

  const createdSchedule: Schedule = scheduleRepository.create(newSchedule);

  await scheduleRepository.save(createdSchedule);

  const returnSchedule: IReturnSchedule = {
    id: createdSchedule.id,
    userId: createdSchedule.user.id,
    realEstateId: createdSchedule.realEstate.id,
    date: createdSchedule.date,
    hour: createdSchedule.hour,
  };

  return returnSchedule;
};
