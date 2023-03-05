import { Router } from "express";
import {
  deleteUserController,
  postNewUserController,
} from "../controllers/usersControllers";
import { checkValidDataMiddleware } from "../middlewares/checkDataMiddleware";
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";
import { checkValidIdMiddleware } from "../middlewares/checkUserExistsMiddleware";
import { checkUserExistsMiddleware } from "../middlewares/checkValidEmailMiddleware";
import { checkValidPermissionMiddleware } from "../middlewares/checkValidPermissionMiddleware";
import { updateUserSchema, userSchema } from "../schemas/usersSchema";
import { patchUserController } from "../controllers/usersControllers";
import { checkPatchEmailMiddleware } from "../middlewares/checkPatchEmailMiddleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  checkValidDataMiddleware(userSchema),
  checkUserExistsMiddleware,
  postNewUserController
);

userRoutes.patch(
  "/:id",
  checkValidDataMiddleware(updateUserSchema),
  checkPatchEmailMiddleware,
  checkValidIdMiddleware,
  checkTokenMiddleware,
  checkValidPermissionMiddleware,
  patchUserController
);

userRoutes.delete(
  "/:id",
  checkTokenMiddleware,
  checkValidIdMiddleware,
  deleteUserController
);
