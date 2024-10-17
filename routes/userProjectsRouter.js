import Router from "express";
import { ProjectController } from "../controllers/ProjectController.js";
import { validateProjectIsFromUser } from "../middlewares/validations.js";

export const userProjectsRouter = Router();

userProjectsRouter.disable("x-powered-by"); // Desactiva el header 'express'

userProjectsRouter.get("/", ProjectController.getByLoggedUser);
userProjectsRouter.get("/:id", [validateProjectIsFromUser], ProjectController.getById);
userProjectsRouter.post("/", ProjectController.createByLoggedUser);
userProjectsRouter.patch("/:id", [validateProjectIsFromUser], ProjectController.update);
userProjectsRouter.delete("/:id", [validateProjectIsFromUser], ProjectController.delete);

