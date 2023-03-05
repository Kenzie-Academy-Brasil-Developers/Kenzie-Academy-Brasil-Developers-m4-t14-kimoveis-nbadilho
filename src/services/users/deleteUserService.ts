import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

export const deleteUserService = async (
  id: number,
  userAdmin: boolean
): Promise<void> => {
  if (userAdmin == false) {
    throw new AppError("Insufficient permission", 403);
  }

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const deletedUser = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (deletedUser?.deletedAt !== null) {
    throw new AppError("User already deleted", 400);
  }

  await userRepository.softRemove(deletedUser!);
};
