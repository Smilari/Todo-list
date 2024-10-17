import Router from "express";
import { TasksController } from "../controllers/TasksController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const tasksController = new TasksController();
export const tasksRouter = Router();

tasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

tasksRouter.get("/", asyncHandler(tasksController.getAll));
tasksRouter.get("/:id", asyncHandler(tasksController.getById));
tasksRouter.post("/", asyncHandler(tasksController.create));
tasksRouter.delete("/:id", asyncHandler(tasksController.delete));
tasksRouter.patch("/:id", asyncHandler(tasksController.update));
