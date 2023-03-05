import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(10).max(45),
  password: z.string().max(120),
});
