import Router from "express";
import { AuthController } from "../controllers/AuthController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

export const authRouter = Router();

authRouter.disable("x-powered-by"); // Desactiva el header 'express'

authRouter.post("/login", asyncHandler(AuthController.login));
authRouter.post("/register", asyncHandler(AuthController.register));
