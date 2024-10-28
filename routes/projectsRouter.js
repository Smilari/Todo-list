import Router from "express";
import { ProjectsController } from "../controllers/ProjectsController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { verifyUserProject } from "../middlewares/validations.js";

const projectsController = new ProjectsController();
export const projectsRouter = Router();

projectsRouter.disable("x-powered-by"); // Desactiva el header 'express'

projectsRouter.use("/:id", [verifyUserProject]);

projectsRouter.route("/").
  get(asyncHandler(projectsController.getByLoggedUser)).
  post(asyncHandler(projectsController.create));

projectsRouter.route("/:id").
  get(asyncHandler(projectsController.getById)).
  delete(asyncHandler(projectsController.delete)).
  patch(asyncHandler(projectsController.update));