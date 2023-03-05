import {
  ICategory,
  IReturnCategory,
} from "../../interfaces/categorieInterface";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

export const newCategoryService = async (
  categoryData: ICategory,
  admin: boolean
): Promise<IReturnCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category = categoryRepository.create(categoryData);

  await categoryRepository.save(category);

  return category;
};
