import Router from "express";
import { UserTasksController } from "../controllers/UserTasksController.js";
import { validateTaskIsFromUser } from "../middlewares/validations.js";

export const userTasksRouter = Router();

userTasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

userTasksRouter.get("/", UserTasksController.getAll);
userTasksRouter.get("/:id", [validateTaskIsFromUser], UserTasksController.getById);
userTasksRouter.post("/", UserTasksController.create);
userTasksRouter.patch("/:id", [validateTaskIsFromUser], UserTasksController.update);
userTasksRouter.delete("/:id", [validateTaskIsFromUser], UserTasksController.delete);