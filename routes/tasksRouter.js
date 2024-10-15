import Router from "express";
import { TasksController } from "../controllers/TasksController.js";

export const tasksRouter = Router();

tasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

tasksRouter.get("/", TasksController.getAll);
tasksRouter.get("/:id", TasksController.getById);
tasksRouter.post("/", TasksController.create);
tasksRouter.delete("/:id", TasksController.delete);
tasksRouter.patch("/:id", TasksController.update);
