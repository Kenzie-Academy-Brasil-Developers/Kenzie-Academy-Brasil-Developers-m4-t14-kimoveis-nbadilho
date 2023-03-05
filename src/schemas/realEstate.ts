import { z } from "zod";
import { returnCategorieSchema } from "./categorieSchema";

export const addressSchema = z.object({
  street: z.string().min(1).max(45),
  zipCode: z.string().min(1).max(8),
  number: z.string().min(1).max(6).optional().nullable(),
  city: z.string().min(1).max(20),
  state: z.string().min(2).max(2),
});

export const returnAddressSchema = addressSchema.extend({ id: z.number() });

export const realEstateSchema = z.object({
  value: z.union([z.string(), z.number()]),
  size: z.number().min(1, "Number must be greater than 0"),
  categoryId: z.number().optional(),
  address: addressSchema,
});

export const returnRealEstateSchema = realEstateSchema
  .omit({ address: true, categoryId: true })
  .extend({
    id: z.number(),
    sold: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: returnAddressSchema,
    category: returnCategorieSchema.nullish(),
  });
