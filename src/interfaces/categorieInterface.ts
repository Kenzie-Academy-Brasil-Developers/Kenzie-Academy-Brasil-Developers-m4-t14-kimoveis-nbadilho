import { z } from "zod";
import {
  categorieSchema,
  returnCategorieSchema,
} from "../schemas/categorieSchema";
import { IReturnRealEstate } from "./realEstate.interface";

export type ICategory = z.infer<typeof categorieSchema>;
export type IReturnCategory = z.infer<typeof returnCategorieSchema>;
export type IAllCategories = Array<IReturnCategory>;

export interface iReturnRealEstateCategory {
  id?: number;
  name?: string;
  realEstate: Array<IReturnRealEstate>;
}
