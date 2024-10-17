import Router from "express";
import { TasksController } from "../controllers/TasksController.js";
import { validateTaskIsFromUser } from "../middlewares/validations.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const tasksController = new TasksController();
export const userTasksRouter = Router();

userTasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

userTasksRouter.get("/", asyncHandler(tasksController.getByLoggedUser.bind(tasksController)));

userTasksRouter.get("/:id", [validateTaskIsFromUser],
  asyncHandler(tasksController.getById.bind(tasksController)));

userTasksRouter.post("/", asyncHandler(tasksController.createByLoggedUser.bind(tasksController)));

userTasksRouter.patch("/:id", [validateTaskIsFromUser],
  asyncHandler(tasksController.update.bind(tasksController)));

userTasksRouter.delete("/:id", [validateTaskIsFromUser],
  asyncHandler(tasksController.delete.bind(tasksController)));