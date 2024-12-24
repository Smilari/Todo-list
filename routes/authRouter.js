import Router from "express";
import { UsersController } from "../controllers/UsersController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { authenticateJWT } from "../middlewares/validations.js";

const usersController = new UsersController();
export const authRouter = Router();

authRouter.disable("x-powered-by"); // Desactiva el header 'express'

authRouter.post("/login", asyncHandler(usersController.login));
authRouter.post("/register", asyncHandler(usersController.register));
authRouter.post("/refreshAccessToken", asyncHandler(usersController.refreshAccessToken));
authRouter.post("/validateAccessToken",[authenticateJWT], asyncHandler(usersController.validateAccessToken));
authRouter.post("/logout", [authenticateJWT], asyncHandler(usersController.logout));
