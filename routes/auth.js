import Router from "express";
import { AuthController } from "../controllers/AuthController.js";
import { validarJwt } from "../middlewares/validations.js";

export const authRouter = Router();

authRouter.disable("x-powered-by"); // Desactiva el header 'express'

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.get("/getAll", validarJwt, AuthController.getAll);
// authRouter.post('/logout', AuthController.logout);
