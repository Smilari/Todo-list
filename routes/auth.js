import Router from "express";
import { AuthController } from "../controllers/AuthController.js";
import { validateAdmin, validateJWT } from "../middlewares/validations.js";

export const authRouter = Router();

authRouter.disable("x-powered-by"); // Desactiva el header 'express'

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.get("/getAll", [validateJWT, validateAdmin], AuthController.getAll);
// authRouter.post('/logout', AuthController.logout);
