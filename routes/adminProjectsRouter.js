import Router from "express";
import { ProjectsController } from "../controllers/ProjectsController.js";
import { verifyUserProject } from "../middlewares/validations.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const projectsController = new ProjectsController();
export const adminProjectsRouter = Router();

adminProjectsRouter.disable("x-powered-by"); // Desactiva el header 'express'

adminProjectsRouter.route("/").
  get(asyncHandler(projectsController.getAll)).
  post(asyncHandler(projectsController.create));

adminProjectsRouter.route("/:id").
  get(asyncHandler(projectsController.getById)).
  delete(asyncHandler(projectsController.delete)).
  patch(asyncHandler(projectsController.update));