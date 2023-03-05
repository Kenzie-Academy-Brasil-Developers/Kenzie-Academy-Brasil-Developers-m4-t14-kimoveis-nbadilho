import { Request, Response } from "express";
import { ILoginUser } from "../interfaces/loginInterfaces";
import { loginUserService } from "../services/login/loginUserService";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: ILoginUser = req.body;

  const token = await loginUserService(loginData);

  return res.json({
    token: token,
  });
};
