import { Request, Response } from "express";
import { ICategory } from "../interfaces/categorieInterface";
import { getCategoriesService } from "../services/category/getCategories";
import { newCategoryService } from "../services/category/newCategory";

export const postNewCategorieController = async (
  req: Request,
  res: Response
) => {
  const categoryData: ICategory = req.body;
  const admin = req.userInfo.admin;

  const newCategory = await newCategoryService(categoryData, admin);

  return res.status(201).json(newCategory);
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  const allCategories = await getCategoriesService();

  return res.status(200).json(allCategories);
};
