import Router from "express";
import { UsersController } from "../controllers/UsersController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const usersController = new UsersController();
export const userProfileRouter = Router();

userProfileRouter.disable("x-powered-by"); // Desactiva el header 'express'

userProfileRouter.get("/", asyncHandler(usersController.getByLoggedUser.bind(usersController)));
userProfileRouter.patch("/",
  asyncHandler(usersController.updateByLoggedUser.bind(usersController)));
