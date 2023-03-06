import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { Repository } from "typeorm";
import { IAllCategories } from "../../interfaces/categorieInterface";

export const getCategoriesService = async (): Promise<IAllCategories> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const allCategories = await categoryRepository.find();

  return allCategories;
};
