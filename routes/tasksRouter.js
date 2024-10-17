import Router from "express";
import { TasksController } from "../controllers/TasksController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

export const tasksRouter = Router();

tasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

tasksRouter.get("/", asyncHandler(TasksController.getAll));
tasksRouter.get("/:id", asyncHandler(TasksController.getById));
tasksRouter.post("/", asyncHandler(TasksController.create));
tasksRouter.delete("/:id", asyncHandler(TasksController.delete));
tasksRouter.patch("/:id", asyncHandler(TasksController.update));
