import Router from "express";
import { UserController } from "../controllers/UserController.js";
import { validateAdmin, validateJWT } from "../middlewares/validations.js";

export const userRouter = Router();

userRouter.disable("x-powered-by"); // Desactiva el header 'express'

//Admin Routes
userRouter.get("/getAll", [validateJWT, validateAdmin], UserController.getAll);
userRouter.get("/getById/:id", [validateJWT, validateAdmin], UserController.getById);
userRouter.post("/create", [validateJWT, validateAdmin], UserController.create);
userRouter.delete("/delete/:id", [validateJWT, validateAdmin], UserController.delete);
userRouter.patch("/update/:id", [validateJWT, validateAdmin], UserController.update);