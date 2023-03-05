import { z } from "zod";
import {
  realEstateSchema,
  returnRealEstateSchema,
} from "../schemas/realEstate";

export type IRealEstate = z.infer<typeof realEstateSchema>;
export type IReturnRealEstate = z.infer<typeof returnRealEstateSchema>;
