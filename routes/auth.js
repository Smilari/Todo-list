import Router from "express";
import { AuthController } from "../controllers/AuthController.js";

export const authRouter = Router();

authRouter.disable("x-powered-by"); // Desactiva el header 'express'

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
