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

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  if (realEstate.categoryId) {
    const findCategory = await categoryRepository.findOne({
      where: {
        id: realEstate.categoryId,
      },
    });
    const createRealEstate = {
      value: realEstate.value,
      size: realEstate.size,
      address: address,
      category: findCategory,
    };

    const newRealEstate: RealEstate =
      realEstateRepository.create(createRealEstate);
    await realEstateRepository.save(newRealEstate);

    const updatedRealEstate = {
      ...newRealEstate,
      category: {
        id: findCategory?.id,
        name: findCategory?.name,
      },
    };
    const returnRealEstate = returnRealEstateSchema.parse(updatedRealEstate);

    return returnRealEstate;
  }

  const createRealEstate = {
    value: realEstate.value,
    size: realEstate.size,
    address: address,
    category: null,
  };

  const newRealEstate: RealEstate =
    realEstateRepository.create(createRealEstate);
  await realEstateRepository.save(newRealEstate);

  const updatedRealEstate = {
    ...newRealEstate,
    category: null,
  };
  const returnRealEstate = returnRealEstateSchema.parse(updatedRealEstate);

  return returnRealEstate;
};
