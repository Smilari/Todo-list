import Router from "express";
import { CommentsController } from "../controllers/CommentsController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const commentsController = new CommentsController();
export const adminCommentsRouter = Router();

adminCommentsRouter.disable("x-powered-by"); // Desactiva el header 'express'

adminCommentsRouter.route("/").
  get(asyncHandler(commentsController.getAll)).
  post(asyncHandler(commentsController.create));

adminCommentsRouter.route("/:id").
  get(asyncHandler(commentsController.getById)).
  delete(asyncHandler(commentsController.delete)).
  patch(asyncHandler(commentsController.update));