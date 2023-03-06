import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { IAllRealEstate } from "../../interfaces/realEstate.interface";

export const getAllRealEstateService = async (): Promise<IAllRealEstate> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateQueryBuilder =
    realEstateRepository.createQueryBuilder("realEstate");

  const findRealEstates = await realEstateQueryBuilder
    .innerJoinAndSelect("realEstate.address", "address")
    .getMany();
  console.log(findRealEstates);
  return findRealEstates;
};
