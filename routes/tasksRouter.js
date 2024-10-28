import Router from "express";
import { TasksController } from "../controllers/TasksController.js";
import { verifyUserTask, validateProject } from "../middlewares/validations.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const tasksController = new TasksController();
export const tasksRouter = Router();

tasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

tasksRouter.use("/:id", [verifyUserTask]);

tasksRouter.route("/").
  get(asyncHandler(tasksController.getByLoggedUser)).
  post([validateProject], asyncHandler(tasksController.create));

tasksRouter.route("/:id").
  get(asyncHandler(tasksController.getById)).
  delete(asyncHandler(tasksController.delete)).
  patch([validateProject], asyncHandler(tasksController.update));