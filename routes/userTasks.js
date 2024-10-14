import Router from "express";
import { UserTasksController } from "../controllers/UserTasksController.js";

export const userTasksRouter = Router();

userTasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

// userTasksRouter.get("/", UserTasksController.getTasks);
// userTasksRouter.post("/", UserTasksController.createTask);
// userTasksRouter.delete("/:id", UserTasksController.deleteTask);