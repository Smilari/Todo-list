import Router from "express";
import { ProjectController } from "../controllers/ProjectController.js";
import { validateProjectIsFromUser } from "../middlewares/validations.js";

export const projectRouter = Router();

projectRouter.disable("x-powered-by"); // Desactiva el header 'express'

// projectRouter.get("/all", ProjectController.getByLoggedUser);
// projectRouter.get("/:id", [validateProjectIsFromUser], ProjectController.getById);
// projectRouter.post("/", ProjectController.createByLoggedUser);
// projectRouter.patch("/:id", [validateProjectIsFromUser], ProjectController.update);
// projectRouter.delete("/:id", [validateProjectIsFromUser], ProjectController.delete);

