import Router from "express";
import { TaskController } from "../controllers/TaskController.js";

export const tasksRouter = Router();

tasksRouter.disable("x-powered-by"); // Desactiva el header 'express'

tasksRouter.get("/getAll", TaskController.getAll);
tasksRouter.get("/getById/:id", TaskController.getById);
tasksRouter.post("/create", TaskController.create);
tasksRouter.delete("/delete/:id", TaskController.delete);
tasksRouter.patch("/update/:id", TaskController.update);
