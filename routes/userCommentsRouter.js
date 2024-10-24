import Router from "express";
import { CommentsController } from "../controllers/CommentsController.js";
import { validateCommentIsFromTask } from "../middlewares/validations.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const commentsController = new CommentsController();
export const userCommentsRouter = Router();

userCommentsRouter.disable("x-powered-by"); // Desactiva el header 'express'

userCommentsRouter.get("/", asyncHandler(commentsController.getByTask));

userCommentsRouter.get("/:id", [validateCommentIsFromTask],
  asyncHandler(commentsController.getById));

userCommentsRouter.post("/", asyncHandler(commentsController.createByTask));

userCommentsRouter.patch("/:id", [validateCommentIsFromTask],
  asyncHandler(commentsController.update));

userCommentsRouter.delete("/:id", [validateCommentIsFromTask],
  asyncHandler(commentsController.delete));