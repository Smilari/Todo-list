import Router from "express";
import { TasksController } from "../controllers/TasksController.js";
import { validateTaskIsFromUser } from "../middlewares/validations.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

export const userTasksRouter = Router();

userTasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

userTasksRouter.get("/", asyncHandler(TasksController.getByLoggedUser));
userTasksRouter.get("/:id", [validateTaskIsFromUser], asyncHandler(TasksController.getById));
userTasksRouter.post("/", asyncHandler(TasksController.createByLoggedUser));
userTasksRouter.patch("/:id", [validateTaskIsFromUser], asyncHandler(TasksController.update));
userTasksRouter.delete("/:id", [validateTaskIsFromUser], asyncHandler(TasksController.delete));