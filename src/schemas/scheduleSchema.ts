import { z } from "zod";

export const scheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export const returnScheduleSchema = scheduleSchema
  .omit({ realEstateId: true })
  .extend({
    id: z.number(),
    userId: z.number(),
    realEstateId: z.number(),
  });
