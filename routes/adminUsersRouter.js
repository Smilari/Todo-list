import Router from "express";
import { UsersController } from "../controllers/UsersController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const usersController = new UsersController();
export const adminUsersRouter = Router();

adminUsersRouter.disable("x-powered-by"); // Desactiva el header 'express'

adminUsersRouter.route("/").
  get(asyncHandler(usersController.getAll)).
  post(asyncHandler(usersController.create));

adminUsersRouter.route("/:id").
  get(asyncHandler(usersController.getById)).
  delete(asyncHandler(usersController.delete)).
  patch(asyncHandler(usersController.update));


