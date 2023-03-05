import { z } from "zod";
import { returnCategorieSchema } from "./categorieSchema";

export const addressSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(6).optional(),
  city: z.string().max(20),
  state: z.string().max(2),
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
    createdAt: z.date(),
    updatedAt: z.date(),
    address: returnAddressSchema,
    category: returnCategorieSchema || null,
  });
