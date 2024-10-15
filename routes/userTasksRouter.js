import Router from "express";
import { TasksController } from "../controllers/TasksController.js";
import { validateTaskIsFromUser } from "../middlewares/validations.js";

export const userTasksRouter = Router();

userTasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

userTasksRouter.get("/", TasksController.getByLoggedUser);
userTasksRouter.get("/:id", [validateTaskIsFromUser], TasksController.getById);
userTasksRouter.post("/", TasksController.createByLoggedUser);
userTasksRouter.patch("/:id", [validateTaskIsFromUser], TasksController.update);
userTasksRouter.delete("/:id", [validateTaskIsFromUser], TasksController.delete);