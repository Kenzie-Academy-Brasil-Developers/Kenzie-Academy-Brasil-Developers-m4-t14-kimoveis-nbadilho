import { INewUser, IUser } from "../../interfaces/userInterfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { returnUserSchemaNoPassword } from "../../schemas/usersSchema";

export const newUserService = async (userData: IUser): Promise<INewUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = returnUserSchemaNoPassword.parse(user);

  return newUser;
};
