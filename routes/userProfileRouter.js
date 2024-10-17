import Router from "express";
import { UserController } from "../controllers/UserController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

export const userProfileRouter = Router();

userProfileRouter.disable("x-powered-by"); // Desactiva el header 'express'

userProfileRouter.get("/", asyncHandler(UserController.getByLoggedUser));
userProfileRouter.patch("/", asyncHandler(UserController.updateByLoggedUser));
