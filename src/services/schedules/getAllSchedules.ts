import { AppDataSource } from "../../data-source";
import { Schedule, RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import { IAllRealEstate } from "../../interfaces/realEstate.interface";

export const getAllSchedulesService = async (
  realEstateId: number
): Promise<any> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate = await realEstateRepository.findOne({
    where: { id: realEstateId },
    relations: {
      address: true,
      category: true,
    },
  });
  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const findSchedules = await scheduleRepository
    .createQueryBuilder("schedule")
    .leftJoinAndSelect("schedule.user", "user")
    .where("schedule.realEstate = :realEstateId", { realEstateId })
    .getMany();

  const returnSchedules = {
    ...realEstate,
    schedules: findSchedules,
  };

  return returnSchedules;
};
