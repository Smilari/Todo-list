import Router from "express";
import { UserController } from "../controllers/UserController.js";
import { validateAdmin, validateJWT } from "../middlewares/validations.js";

export const userRouter = Router();

userRouter.disable("x-powered-by"); // Desactiva el header 'express'

userRouter.get("/getAll", [validateJWT, validateAdmin], UserController.getAll);
userRouter.get("/getById/:id", [validateJWT, validateAdmin], UserController.getById);