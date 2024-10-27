import Router from "express";
import { UsersController } from "../controllers/UsersController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const usersController = new UsersController();
export const profileRouter = Router();

profileRouter.disable("x-powered-by"); // Desactiva el header 'express'

profileRouter.route("/").
  get(asyncHandler(usersController.getByLoggedUser)).
  patch(asyncHandler(usersController.updateByLoggedUser));