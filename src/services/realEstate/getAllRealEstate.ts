import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { IAllRealEstate } from "../../interfaces/realEstate.interface";

export const getAllRealEstateService = async (): Promise<IAllRealEstate> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstates = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  return findRealEstates;
};
