import Router from "express";
import { UsersController } from "../controllers/UsersController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const usersController = new UsersController();
export const usersRouter = Router();

usersRouter.disable("x-powered-by"); // Desactiva el header 'express'

usersRouter.get("/", asyncHandler(usersController.getAll.bind(usersController)));
usersRouter.get("/:id", asyncHandler(usersController.getById.bind(usersController)));
usersRouter.post("/", asyncHandler(usersController.create.bind(usersController)));
usersRouter.delete("/:id", asyncHandler(usersController.delete.bind(usersController)));
usersRouter.patch("/:id", asyncHandler(usersController.update.bind(usersController)));
