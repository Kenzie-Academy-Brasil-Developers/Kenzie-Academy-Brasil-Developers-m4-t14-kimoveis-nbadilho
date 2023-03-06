import { z } from "zod";

export const scheduleSchema = z.object({
  date: z.date(),
  hour: z.string(),
  propertieId: z.number(),
});

export const returnScheduleSchema = scheduleSchema
  .omit({ propertieId: true })
  .extend({
    id: z.number(),
    userId: z.number(),
    realEstateId: z.number(),
  });
