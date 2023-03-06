import { AppDataSource } from "../../data-source";
import { RealEstate, Category } from "../../entities";
import { Repository } from "typeorm";
import { iReturnRealEstateCategory } from "../../interfaces/categorieInterface";

export const getRealEstatesCategoryService = async (
  categoryId: number
): Promise<iReturnRealEstateCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
  });
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateQueryBuilder =
    realEstateRepository.createQueryBuilder("realEstate");

  const allRealEstate = await realEstateQueryBuilder
    .where("realEstate.categoryId = :categoryId", { categoryId })
    .getMany();

  const newResponse = {
    ...findCategory,
    realEstate: allRealEstate,
  };

  return newResponse;
};
