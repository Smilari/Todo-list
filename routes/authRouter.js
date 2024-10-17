import Router from "express";
import { UsersController } from "../controllers/UsersController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const usersController = new UsersController();
export const authRouter = Router();

authRouter.disable("x-powered-by"); // Desactiva el header 'express'

authRouter.post("/login", asyncHandler(usersController.login));
authRouter.post("/register", asyncHandler(usersController.register));
