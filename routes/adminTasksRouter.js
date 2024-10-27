import Router from "express";
import { TasksController } from "../controllers/TasksController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const tasksController = new TasksController();
export const adminTasksRouter = Router();

adminTasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

adminTasksRouter.route("/").
  get(asyncHandler(tasksController.getAll)).
  post(asyncHandler(tasksController.create));

adminTasksRouter.route("/:id").
  get(asyncHandler(tasksController.getById)).
  delete(asyncHandler(tasksController.delete)).
  patch(asyncHandler(tasksController.update));