import Router from "express";
import { AdminController } from "../controllers/AdminController.js";
import { validateAdmin, validateJWT } from "../middlewares/validations.js";

export const adminRouter = Router();

adminRouter.disable("x-powered-by"); // Desactiva el header 'express'

adminRouter.get("/", [validateJWT, validateAdmin], AdminController.getAll);
adminRouter.get("/:id", [validateJWT, validateAdmin], AdminController.getById);
adminRouter.post("/", [validateJWT, validateAdmin], AdminController.create);
adminRouter.delete("/:id", [validateJWT, validateAdmin], AdminController.delete);
adminRouter.patch("/:id", [validateJWT, validateAdmin], AdminController.update);
