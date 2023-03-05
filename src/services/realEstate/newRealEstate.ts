import { AppDataSource } from "../../data-source";
import { Address, RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import {
  IRealEstate,
  IReturnRealEstate,
} from "../../interfaces/realEstate.interface";
import { returnRealEstateSchema } from "../../schemas/realEstate";
import { Category } from "../../entities";

export const newRealEstate = async (
  realEstate: IRealEstate,
  admin: boolean
): Promise<IReturnRealEstate> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const address: Address = addressRepository.create(realEstate.address);

  await addressRepository.save(address);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const newRealEstate: RealEstate = realEstateRepository.create(realEstate);

  await realEstateRepository.save(newRealEstate);

  newRealEstate.address = address;

  // if (realEstate.categoryId!==null) {
  //   const categoryRepository: Repository<Category> =
  //     AppDataSource.getRepository(Category);

  //   const findCategory = await categoryRepository.findOne({
  //     where: {
  //       id: realEstate.categoryId,
  //     },
  //   });

  //   newRealEstate.category = findCategory;
  // }

  // newRealEstate.category=null

  const returnRealEstate = returnRealEstateSchema.parse(newRealEstate);
  console.log(newRealEstate);
  return returnRealEstate;
};
