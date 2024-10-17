import Router from "express";
import { ProjectsController } from "../controllers/ProjectsController.js";
import { validateProjectIsFromUser } from "../middlewares/validations.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const projectsController = new ProjectsController();
export const userProjectsRouter = Router();

userProjectsRouter.disable("x-powered-by"); // Desactiva el header 'express'

userProjectsRouter.get("/", asyncHandler(projectsController.getByLoggedUser));

userProjectsRouter.get("/:id", [validateProjectIsFromUser],
  asyncHandler(projectsController.getById));

userProjectsRouter.post("/", asyncHandler(projectsController.createByLoggedUser));

userProjectsRouter.patch("/:id", [validateProjectIsFromUser],
  asyncHandler(projectsController.update));

userProjectsRouter.delete("/:id", [validateProjectIsFromUser],
  asyncHandler(projectsController.delete));
