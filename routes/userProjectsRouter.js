import Router from "express";
import { ProjectsController } from "../controllers/ProjectsController.js";
import { validateProjectIsFromUser } from "../middlewares/validations.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

export const userProjectsRouter = Router();

userProjectsRouter.disable("x-powered-by"); // Desactiva el header 'express'

userProjectsRouter.get("/", asyncHandler(ProjectsController.getByLoggedUser));
userProjectsRouter.get("/:id", [validateProjectIsFromUser],
  asyncHandler(ProjectsController.getById));

userProjectsRouter.post("/", asyncHandler(ProjectsController.createByLoggedUser));
userProjectsRouter.patch("/:id", [validateProjectIsFromUser],
  asyncHandler(ProjectsController.update));

userProjectsRouter.delete("/:id", [validateProjectIsFromUser],
  asyncHandler(ProjectsController.delete));
