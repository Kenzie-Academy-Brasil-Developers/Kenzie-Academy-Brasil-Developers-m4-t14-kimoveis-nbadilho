import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { userRoutes } from "./routers/userRoutes";
import { loginRoutes } from "./routers/loginRoutes";
import { categoriesRoutes } from "./routers/categoriesRouters";
import { realEstateRoutes } from "./routers/realEstate";

const app: Application = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/realEstate", realEstateRoutes);
app.use(handleErrors);
export default app;
