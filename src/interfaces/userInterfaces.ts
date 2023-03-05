import { userSchema, returnUserSchemaNoPassword } from "../schemas/usersSchema";
import { z } from "zod";
import { DeepPartial } from "typeorm";

export type IUser = z.infer<typeof userSchema>;
export type INewUser = z.infer<typeof returnUserSchemaNoPassword>;
export type IPatchUser = DeepPartial<IUser>;
