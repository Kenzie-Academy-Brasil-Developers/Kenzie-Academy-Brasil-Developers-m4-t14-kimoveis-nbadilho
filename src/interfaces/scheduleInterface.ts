import { z } from "zod";
import {
  returnScheduleSchema,
  scheduleSchema,
} from "../schemas/scheduleSchema";

export type ISchedule = z.infer<typeof scheduleSchema>;
export type IReturnSchedule = z.infer<typeof returnScheduleSchema>;
