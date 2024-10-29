import Router from "express";
import { CommentsController } from "../controllers/CommentsController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { verifyTaskComment } from "../middlewares/validations.js";

const commentsController = new CommentsController();
export const adminCommentsRouter = Router();

adminCommentsRouter.disable("x-powered-by"); // Desactiva el header 'express'

adminCommentsRouter.use("/:id", [verifyTaskComment]);

adminCommentsRouter.route("/").
  get(asyncHandler(commentsController.getByLoggedUser)).
  post(asyncHandler(commentsController.create));

adminCommentsRouter.route("/:id").
  get(asyncHandler(commentsController.getById)).
  delete(asyncHandler(commentsController.delete)).
  patch(asyncHandler(commentsController.update));