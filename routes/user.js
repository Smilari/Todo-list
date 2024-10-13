import Router from "express";
import { UserController } from "../controllers/UserController.js";
import { validateJWT } from "../middlewares/validations.js";

export const userRouter = Router();

userRouter.disable("x-powered-by"); // Desactiva el header 'express'

userRouter.get("/", validateJWT, UserController.getAll);
userRouter.get("/:id", validateJWT, UserController.getById);
userRouter.post("/", validateJWT, UserController.create);
userRouter.delete("/:id", validateJWT, UserController.delete);
userRouter.patch("/:id", validateJWT, UserController.update);