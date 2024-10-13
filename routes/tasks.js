import Router from "express";
import { TaskController } from "../controllers/TaskController.js";

export const tasksRouter = Router();

tasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

tasksRouter.get("/", TaskController.getAll);
tasksRouter.get("/:id", TaskController.getById);
tasksRouter.post("/", TaskController.create);
tasksRouter.delete("/:id", TaskController.delete);
tasksRouter.patch("/:id", TaskController.update);
