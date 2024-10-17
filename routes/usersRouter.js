import Router from "express";
import { UserController } from "../controllers/UserController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

export const usersRouter = Router();

usersRouter.disable("x-powered-by"); // Desactiva el header 'express'

usersRouter.get("/", asyncHandler(UserController.getAll));
usersRouter.get("/:id", asyncHandler(UserController.getById));
usersRouter.post("/", asyncHandler(UserController.create));
usersRouter.delete("/:id", asyncHandler(UserController.delete));
usersRouter.patch("/:id", asyncHandler(UserController.update));
