import Router from "express";
import { ProjectsController } from "../controllers/ProjectsController.js";
import { validateProjectIsFromUser } from "../middlewares/validations.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const projectsController = new ProjectsController();
export const userProjectsRouter = Router();

userProjectsRouter.disable("x-powered-by"); // Desactiva el header 'express'

userProjectsRouter.get("/",
  asyncHandler(projectsController.getByLoggedUser.bind(projectsController)));

userProjectsRouter.get("/:id", [validateProjectIsFromUser],
  asyncHandler(projectsController.getById.bind(projectsController)));

userProjectsRouter.post("/",
  asyncHandler(projectsController.createByLoggedUser.bind(projectsController)));

userProjectsRouter.patch("/:id", [validateProjectIsFromUser],
  asyncHandler(projectsController.update.bind(projectsController)));

userProjectsRouter.delete("/:id", [validateProjectIsFromUser],
  asyncHandler(projectsController.delete.bind(projectsController)));
