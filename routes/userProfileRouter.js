import Router from "express";
import { UserController } from "../controllers/UserController.js";

export const userProfileRouter = Router();

userProfileRouter.disable("x-powered-by"); // Desactiva el header 'express'

userProfileRouter.get("/", UserController.getByLoggedUser);
userProfileRouter.patch("/", UserController.updateByLoggedUser);
