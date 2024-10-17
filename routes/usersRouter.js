import Router from "express";
import { UsersController } from "../controllers/UsersController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const usersController = new UsersController();
export const usersRouter = Router();

usersRouter.disable("x-powered-by"); // Desactiva el header 'express'

usersRouter.get("/", asyncHandler(usersController.getAll));
usersRouter.get("/:id", asyncHandler(usersController.getById));
usersRouter.post("/", asyncHandler(usersController.create));
usersRouter.delete("/:id", asyncHandler(usersController.delete));
usersRouter.patch("/:id", asyncHandler(usersController.update));
