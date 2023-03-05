import { type } from "os";
import { z } from "zod";
import { categorieSchema, returnCategorieSchema } from "../schemas/categorieSchema";

export type ICategory = z.infer<typeof categorieSchema>;
export type IReturnCategory=z.infer<typeof  returnCategorieSchema>