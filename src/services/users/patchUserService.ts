import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { INewUser, IPatchUser } from "../../interfaces/userInterfaces";
import { returnUserSchemaNoPassword } from "../../schemas/usersSchema";

export const patchUserService = async (
  userData: IPatchUser,
  idUser: number
): Promise<INewUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: idUser,
  });

  const newUser = userRepository.create({
    ...oldUserData,
    ...userData,
  });

  await userRepository.save(newUser);

  const patchedUser = returnUserSchemaNoPassword.parse(newUser);

  return patchedUser;
};
