import Router from "express";
import { TasksController } from "../controllers/TasksController.js";
import { validateTaskIsFromUser } from "../middlewares/validations.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const tasksController = new TasksController();
export const userTasksRouter = Router();

userTasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

userTasksRouter.get("/", asyncHandler(tasksController.getByLoggedUser));
userTasksRouter.get("/:id", [validateTaskIsFromUser], asyncHandler(tasksController.getById));
userTasksRouter.post("/", asyncHandler(tasksController.createByLoggedUser));
userTasksRouter.patch("/:id", [validateTaskIsFromUser], asyncHandler(tasksController.update));
userTasksRouter.delete("/:id", [validateTaskIsFromUser], asyncHandler(tasksController.delete));