import { IAllUsers } from "../../interfaces/userInterfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { returnUserSchemaNoPassword } from "../../schemas/usersSchema";

export const getUsersService = async (): Promise<IAllUsers> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const findUsers = await userRepository.find();
  const filterUsers = findUsers.map((item: User) => {
    return returnUserSchemaNoPassword.parse(item);
  });
  return filterUsers;
};
