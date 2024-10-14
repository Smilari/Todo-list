import Router from "express";
import { AdminController } from "../controllers/AdminController.js";

export const adminRouter = Router();

adminRouter.disable("x-powered-by"); // Desactiva el header 'express'

adminRouter.get("/", AdminController.getAll);
adminRouter.get("/:id", AdminController.getById);
adminRouter.post("/", AdminController.create);
adminRouter.delete("/:id", AdminController.delete);
adminRouter.patch("/:id", AdminController.update);
