import { AppDataSource } from "../../data-source";
import { Schedule, RealEstate, User } from "../../entities";
import { Repository } from "typeorm";
import { ISchedule } from "../../interfaces/scheduleInterface";

export const newScheduleService = async (
  scheduleData: ISchedule,
  userId: number
): Promise<Schedule> => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate = await realEstateRepository.findOne({
    where: {
      id: Number(scheduleData.realEstateId),
    },
  });

  const newSchedule = {
    date: scheduleData.date,
    hour: scheduleData.hour,
    user: findUser!,
    realEstate: findRealEstate!,
  };

  const createdSchedule: Schedule = scheduleRepository.create(newSchedule);

  await scheduleRepository.save(createdSchedule);

  return createdSchedule;
};
