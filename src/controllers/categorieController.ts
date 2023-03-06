import { Request, Response } from "express";
import { ICategory } from "../interfaces/categorieInterface";
import { getRealEstatesCategoryService } from "../services/category/getAllRealEstateCategory";
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

export const getAllRealEstateCategoryController = async (
  req: Request,
  res: Response
) => {
  const categoryId = parseInt(req.params.id);
  const allRealEstate = await getRealEstatesCategoryService(categoryId);

  return res.status(200).json(allRealEstate);
};
