import Router from "express";
import { TasksController } from "../controllers/TasksController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { validateProject, verifyUserTask } from "../middlewares/validations.js";

const tasksController = new TasksController();
export const adminTasksRouter = Router();

adminTasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

adminTasksRouter.route("/").
  get(asyncHandler(tasksController.getByLoggedUser)).
  post([validateProject], asyncHandler(tasksController.create));

adminTasksRouter.route("/:id").
  get([verifyUserTask], asyncHandler(tasksController.getById)).
  delete([verifyUserTask], asyncHandler(tasksController.delete)).
  patch([verifyUserTask, validateProject], asyncHandler(tasksController.update));