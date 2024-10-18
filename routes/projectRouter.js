import Router from "express";
import { ProjectsController } from "../controllers/ProjectsController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const projectsController = new ProjectsController();
export const projectRouter = Router();

projectRouter.disable("x-powered-by"); // Desactiva el header 'express'

projectRouter.get("/", asyncHandler(projectsController.getAll));
projectRouter.get("/:id", asyncHandler(projectsController.getById));
projectRouter.post("/", asyncHandler(projectsController.create));
projectRouter.delete("/:id", asyncHandler(projectsController.delete));
projectRouter.patch("/:id", asyncHandler(projectsController.update));