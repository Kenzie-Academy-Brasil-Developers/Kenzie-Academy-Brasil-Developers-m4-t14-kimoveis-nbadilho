import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { ILoginUser } from "../../interfaces/loginInterfaces";
import "dotenv/config";
import { Repository } from "typeorm";

export const loginUserService = async (
  loginData: ILoginUser
): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user || user.deletedAt !== null) {
    throw new AppError("Invalid credentials", 401);
  }

  const comparedPassword = await compare(loginData.password, user.password);

  if (!comparedPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const newToken: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  return newToken;
};
