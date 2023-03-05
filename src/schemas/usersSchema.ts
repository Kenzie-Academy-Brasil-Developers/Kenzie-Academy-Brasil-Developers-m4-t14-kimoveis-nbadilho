import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2).max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().default(false),
});

export const returnUserSchemaNoPassword = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({
    password: true,
  });

export const updateUserSchema = userSchema.omit({ admin: true }).partial();
