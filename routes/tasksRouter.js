import Router from "express";
import { TasksController } from "../controllers/TasksController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const tasksController = new TasksController();
export const tasksRouter = Router();

tasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

tasksRouter.get("/", asyncHandler(tasksController.getAll.bind(tasksController)));
tasksRouter.get("/:id", asyncHandler(tasksController.getById.bind(tasksController)));
tasksRouter.post("/", asyncHandler(tasksController.create.bind(tasksController)));
tasksRouter.delete("/:id", asyncHandler(tasksController.delete.bind(tasksController)));
tasksRouter.patch("/:id", asyncHandler(tasksController.update.bind(tasksController)));
