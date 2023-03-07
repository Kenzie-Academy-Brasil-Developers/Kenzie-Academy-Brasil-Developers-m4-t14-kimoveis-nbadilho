import { z } from "zod";
import {
  realEstateSchema,
  returnRealEstateScheduleSchema,
  returnRealEstateSchema,
} from "./realEstate";
import { returnUserSchemaNoPassword } from "./usersSchema";

export const scheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export const returnScheduleSchema = scheduleSchema
  .omit({ realEstateId: true })
  .extend({
    id: z.number(),
    user: returnUserSchemaNoPassword,
    realEstate: returnRealEstateScheduleSchema,
  });
