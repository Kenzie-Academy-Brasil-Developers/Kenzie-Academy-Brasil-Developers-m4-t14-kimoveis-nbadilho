import { z } from "zod";

export const categorieSchema = z.object({
  name: z.string().min(1).max(45),
});


export const returnCategorieSchema=categorieSchema.extend({id:z.number()})