import { Request, Response } from "express";
import { IPatchUser, IUser } from "../interfaces/userInterfaces";
import { deleteUserService } from "../services/users/deleteUserService";
import { newUserService } from "../services/users/newUserService";
import { patchUserService } from "../services/users/patchUserService";

export const postNewUserController = async (req: Request, res: Response) => {
  const userData: IUser = req.body;

  const newUser = await newUserService(userData);

  return res.status(201).json(newUser);
};

export const patchUserController = async (req: Request, res: Response) => {
  const userData: IPatchUser = req.body;
  const idUser = parseInt(req.params.id);

  const newUser = await patchUserService(userData, idUser);

  return res.status(200).json(newUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const adminUser = req.userInfo.admin;

  await deleteUserService(id,adminUser);

  return res.status(204).send();
};
