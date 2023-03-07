import { z } from "zod";
import {
  returnScheduleSchema,
  scheduleSchema,
} from "../schemas/scheduleSchema";
import { Schedule, Address, Category } from "../entities";

export type ISchedule = z.infer<typeof scheduleSchema>;
export type IReturnSchedule = z.infer<typeof returnScheduleSchema>;
export interface iReturnSchedules {
  schedules: Schedule[];
  id: number;
  sold: boolean;
  value: string | number;
  size: number;
  createdAt: string;
  updatedAt: string;
  address: Address;
  category: Category;
}
