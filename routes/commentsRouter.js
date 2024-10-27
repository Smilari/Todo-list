import Router from "express";
import { CommentsController } from "../controllers/CommentsController.js";
import { verifyTaskComment } from "../middlewares/validations.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const commentsController = new CommentsController();
export const commentsRouter = Router();

commentsRouter.disable("x-powered-by"); // Desactiva el header 'express'

commentsRouter.use("/:id", [verifyTaskComment]);

commentsRouter.route("/").
  get(asyncHandler(commentsController.getByTask)).
  post(asyncHandler(commentsController.create));

commentsRouter.route("/:id").
  get(asyncHandler(commentsController.getById)).
  delete(asyncHandler(commentsController.delete)).
  patch(asyncHandler(commentsController.update));
