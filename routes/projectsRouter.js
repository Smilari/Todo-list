import Router from "express";
import { ProjectsController } from "../controllers/ProjectsController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const projectsController = new ProjectsController();
export const projectsRouter = Router();

projectsRouter.disable("x-powered-by"); // Desactiva el header 'express'

projectsRouter.get("/", asyncHandler(projectsController.getAll));
projectsRouter.get("/:id", asyncHandler(projectsController.getById));
projectsRouter.post("/", asyncHandler(projectsController.create));
projectsRouter.delete("/:id", asyncHandler(projectsController.delete));
projectsRouter.patch("/:id", asyncHandler(projectsController.update));